import { Request, Response, NextFunction } from 'express';
import { Role } from '../types/roles';

/**
 * Middleware to authenticate requests.
 * Checks for Bearer token and attaches a mock user to the request.
 */
export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: Missing or invalid token' });
  }

  // Dynamic mock user for testing
  const token = authHeader.split(' ')[1];
  let role = Role.CONTRIBUTOR;

  if (token === 'admin-token') role = Role.ADMIN;
  else if (token === 'editor-token') role = Role.EDITOR;

  req.user = {
    id: `user-${token}`,
    role,
  };

  next();
};

/**
 * Higher-order middleware to authorize requests based on roles.
 * @param roles Roles that are allowed to access the route
 */
export const authorize = (...roles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
    }

    next();
  };
};
