import jwt from 'jsonwebtoken';

export function requireAuth(request, response, next) {
  const [scheme, token] = (request.headers.authorization || '').split(' ');

  if (scheme !== 'Bearer' || !token) {
    return response.status(401).json({ message: 'Authentication required.' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    if (!payload.sub) {
      return response.status(401).json({ message: 'Invalid or expired token.' });
    }

    request.user = { id: payload.sub };
    return next();
  } catch {
    return response.status(401).json({ message: 'Invalid or expired token.' });
  }
}