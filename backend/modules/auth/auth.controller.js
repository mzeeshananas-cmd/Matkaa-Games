import { forgotPassword as sendPasswordReset, loginUser, registerPartner, resetPassword as updatePassword } from './auth.services.js';

function sendError(response, error) {
  if (error.code === 11000) {
    return response.status(409).json({
      message: 'An account with this email already exists.',
    });
  }

  const statusCode = error.statusCode || 500;

  if (statusCode === 500) {
    console.error(error);
  }

  return response.status(statusCode).json({
    message: statusCode === 500 ? 'Something went wrong.' : error.message,
  });
}

export async function register(request, response) {
  try {
    const result = await registerPartner(request.body);
    return response.status(201).json(result);
  } catch (error) {
    return sendError(response, error);
  }
}

export async function login(request, response) {
  try {
    const result = await loginUser(request.body);
    return response.status(200).json(result);
  } catch (error) {
    return sendError(response, error);
  }
}
export async function forgotPassword(request, response) {
  try { return response.status(200).json(await sendPasswordReset(request.body.email)); }
  catch (error) { return sendError(response, error); }
}

export async function resetPassword(request, response) {
  try { return response.status(200).json(await updatePassword(request.body)); }
  catch (error) { return sendError(response, error); }
}
