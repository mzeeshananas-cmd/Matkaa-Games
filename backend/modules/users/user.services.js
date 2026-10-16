import User from './user.models.js';

function createError(message, statusCode) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

export async function getUserById(userId) {
  const user = await User.findById(userId).select('-passwordHash');

  if (!user) {
    throw createError('User not found.', 404);
  }

  return user;
}

export async function updateUserById(userId, updates) {
  const allowedFields = ['fullName', 'lastName', 'email'];
  const safeUpdates = {};

  for (const field of allowedFields) {
    if (updates[field] !== undefined) {
      safeUpdates[field] =
        field === 'email' ? updates[field].trim().toLowerCase() : updates[field].trim();
    }
  }

  if (Object.keys(safeUpdates).length === 0) {
    throw createError('No valid fields provided to update.', 400);
  }

  const user = await User.findByIdAndUpdate(userId, safeUpdates, {
    new: true,
    runValidators: true,
  }).select('-passwordHash');

  if (!user) {
    throw createError('User not found.', 404);
  }

  return user;
}