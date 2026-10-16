import crypto from 'node:crypto';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../users/user.models.js';
import Partner from '../partners/partner.model.js';

function createError(message, statusCode) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

function createToken(userId) {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('JWT_SECRET is not configured.');
  }

  return jwt.sign({ sub: userId }, secret, { expiresIn: '1d' });
}

export async function registerPartner(data) {
  const email = data.email.toLowerCase();
  const existingUser = await User.exists({ email });

  if (existingUser) {
    throw createError('An account with this email already exists.', 409);
  }

  const passwordHash = await bcrypt.hash(data.password, 12);
  const user = await User.create({
    fullName: data.fullName,
    lastName: data.lastName,
    email,
    passwordHash,
  });

  try {
    await Partner.create({
      user: user._id,
      phone: data.phone,
      country: data.country,
      messengerUsername: data.messengerUsername,
      messenger: data.messenger,
      language: data.language,
    });
  } catch (error) {
    // Avoid leaving an account without its partner profile if profile creation fails.
    await User.deleteOne({ _id: user._id });
    throw error;
  }

  return {
    message: 'Your partner account has been created.',
    user: {
      id: user.id,
      fullName: user.fullName,
      lastName: user.lastName,
      email: user.email,
    },
    token: createToken(user.id),
  };
}

export async function loginUser({ email, password }) {
  const user = await User.findOne({ email: email.toLowerCase() })
    .select('+passwordHash');

  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    throw createError('Invalid email or password.', 401);
  }

  return {
    message: `Welcome back, ${user.fullName}.`,
    user: {
      id: user.id,
      fullName: user.fullName,
      lastName: user.lastName,
      email: user.email,
    },
    token: createToken(user.id),
  };
}
export async function forgotPassword(emailInput) {
  const email = emailInput.toLowerCase();
  const genericResponse = { message: 'If an account exists for that email, a reset link has been sent.' };
  const user = await User.findOne({ email });
  if (!user) return genericResponse;

  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM || smtpUser;
  if (!smtpHost || !smtpUser || !smtpPass || !from) {
    throw new Error('SMTP settings are not configured.');
  }

  const token = crypto.randomBytes(32).toString('hex');
  user.passwordResetTokenHash = crypto.createHash('sha256').update(token).digest('hex');
  user.passwordResetExpiresAt = new Date(Date.now() + 30 * 60 * 1000);
  await user.save();

  const nodemailer = await import('nodemailer');
  const transporter = nodemailer.default.createTransport({
    host: smtpHost,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: { user: smtpUser, pass: smtpPass },
  });
  const clientUrl = (process.env.CLIENT_URL || 'http://localhost:8443').replace(/\/$/, '');
  const resetUrl = `${clientUrl}/reset-password?token=${encodeURIComponent(token)}`;
  try {
    await transporter.sendMail({
      from, to: user.email, subject: 'Reset your MATKAA password',
      text: `Use this link to reset your password. It expires in 30 minutes: ${resetUrl}`,
      html: `<p>We received a request to reset your password.</p><p><a href="${resetUrl}">Reset your password</a></p><p>This link expires in 30 minutes. If you did not request a reset, you can ignore this email.</p>`,
    });
  } catch (error) {
    user.passwordResetTokenHash = undefined;
    user.passwordResetExpiresAt = undefined;
    await user.save();
    throw error;
  }
  return genericResponse;
}

export async function resetPassword({ token, password }) {
  const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
  const user = await User.findOne({
    passwordResetTokenHash: tokenHash,
    passwordResetExpiresAt: { $gt: new Date() },
  }).select('+passwordResetTokenHash +passwordResetExpiresAt');
  if (!user) throw createError('This reset link is invalid or expired. Request a new one.', 400);

  user.passwordHash = await bcrypt.hash(password, 12);
  user.passwordResetTokenHash = undefined;
  user.passwordResetExpiresAt = undefined;
  await user.save();
  return { message: 'Your password has been updated. You can now log in.' };
}