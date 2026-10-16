import { getPartnerByUserId, updatePartnerByUserId } from './partner.services.js';

function sendError(response, error) {
  const statusCode = error.statusCode || 500;
  if (statusCode === 500) console.error(error);
  return response.status(statusCode).json({
    message: statusCode === 500 ? 'Something went wrong.' : error.message,
  });
}

export async function getMyPartner(request, response) {
  try {
    const partner = await getPartnerByUserId(request.user.id);
    return response.status(200).json({ partner });
  } catch (error) {
    return sendError(response, error);
  }
}

export async function updateMyPartner(request, response) {
  try {
    const partner = await updatePartnerByUserId(request.user.id, request.body);
    return response.status(200).json({ message: 'Partner profile updated.', partner });
  } catch (error) {
    return sendError(response, error);
  }
}
