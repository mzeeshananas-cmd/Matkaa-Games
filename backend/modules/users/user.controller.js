import { getUserById, updateUserById } from './user.services.js';

function sendError(response, error) {
  const statusCode = error.statusCode || 500;

  if (statusCode === 500) {
    console.error(error);
  }

  return response.status(statusCode).json({
    message: statusCode === 500 ? 'Something went wrong.' : error.message,
  });
}

export async function getMe(request, response) {
  try {
    const user = await getUserById(request.user.id);

    return response.status(200).json({ user });
  } catch (error) {
    return sendError(response, error);
  }
}

export async function updateMe(request, response) {
  try {
    const user = await updateUserById(request.user.id, request.body);

    return response.status(200).json({
      message: 'Profile updated.',
      user,
    });
  } catch (error) {
    return sendError(response, error);
  }
}