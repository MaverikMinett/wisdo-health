
import { Response, NextFunction } from 'express'
import { AuthenticatedRequest } from '../interfaces/AuthenticatedRequest';
import { IUser } from '../interfaces/IUser';
import { getUserByName } from '../repo/user.repo';

export const authMiddleware = async (request: AuthenticatedRequest, response: Response, next: NextFunction) => {
  const user: IUser = await getUserByName('Maverik');
  request.auth = { user }
  next()
}
