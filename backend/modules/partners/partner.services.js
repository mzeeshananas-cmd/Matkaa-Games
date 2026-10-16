import Partner from './partner.model.js';

function createError(message, statusCode) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

export async function getPartnerByUserId(userId) {
  const partner = await Partner.findOne({ user: userId }).select('-user');
  if (!partner) throw createError('Partner profile not found.', 404);
  return partner;
}

export async function updatePartnerByUserId(userId, updates) {
  const allowedFields = ['phone', 'country', 'messengerUsername', 'messenger', 'language'];
  const safeUpdates = {};

  for (const field of allowedFields) {
    if (updates[field] !== undefined) {
      const value = updates[field].trim();
      safeUpdates[field] = ['country', 'language'].includes(field) ? value.toUpperCase() : value;
    }
  }

  if (!Object.keys(safeUpdates).length) {
    throw createError('No valid partner fields provided to update.', 400);
  }

  const partner = await Partner.findOneAndUpdate(
    { user: userId },
    { $set: safeUpdates },
    { new: true, runValidators: true },
  ).select('-user');

  if (!partner) throw createError('Partner profile not found.', 404);
  return partner;
}
