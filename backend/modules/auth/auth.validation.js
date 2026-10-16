import { z } from 'zod';
import { isValidPhoneNumber, parsePhoneNumberFromString } from 'libphonenumber-js';

const strongPasswordSchema = z.string()
  .min(8, 'Password must be at least 8 characters.')
  .max(128, 'Password must be 128 characters or fewer.')
  .regex(/[A-Z]/, 'Password must include an uppercase letter.')
  .regex(/[^A-Za-z0-9]/, 'Password must include a special character.');

const registerFieldsSchema = z.object({
  fullName: z.string().trim().min(1).max(100),
  lastName: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(254),
  password: strongPasswordSchema,
  phone: z.string().trim().max(30).optional().default(''),
  country: z.string().trim().length(2),
  messengerUsername: z.string().trim().min(1).max(100),
  messenger: z.enum(['Telegram', 'WhatsApp']),
  language: z.string().trim().max(5).optional().default('EN'),
});

export const registerSchema = registerFieldsSchema.superRefine((data, context) => {
  if (!data.phone) return;
  const parsedPhone = parsePhoneNumberFromString(data.phone);
  const expectedCountry = data.country === 'UK' ? 'GB' : data.country;
  if (!isValidPhoneNumber(data.phone) || parsedPhone?.country !== expectedCountry) {
    context.addIssue({ code: 'custom', path: ['phone'], message: 'Enter a valid phone number for the selected country.' });
  }
});

export const loginSchema = z.object({
  email: z.string().trim().email().max(254),
  password: z.string().min(1).max(128),
});

export function validateBody(schema) {
  return (request, response, next) => {
    const result = schema.safeParse(request.body);

    if (!result.success) {
      return response.status(400).json({
        message: 'Please check the submitted fields.',
        errors: result.error.issues.map(issue => ({
          field: issue.path.join('.'),
          message: issue.message,
        })),
      });
    }

    request.body = result.data;
    next();
  };
}

export const forgotPasswordSchema = z.object({ email: z.string().trim().email().max(254) });
export const resetPasswordSchema = z.object({ token: z.string().min(32).max(256), password: strongPasswordSchema });