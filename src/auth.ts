import { sign, verify } from 'jsonwebtoken'
import { JWT_SIGN_KEY, JWT_EXPIRATION } from './config';
import { UserDocument, HttpError, User } from './models';
import { IJwtToken } from './models/interfases';

export const createToken = (userId: string) => {
  const token = sign({ id: userId }, JWT_SIGN_KEY, {
    expiresIn: JWT_EXPIRATION //86400 // expires in 24 hours
  })

  return token
}

export const validateToken = async (token: string) : Promise<any> => {
  return verify(token, JWT_SIGN_KEY, async (err, decoded) => {
    if (err)
      throw new HttpError(500, 'CANNOT_VALIDATE_TOKEN', 'Cannot validate token');
    const result = decoded as IJwtToken;

    return await User.findById(result.id, (err, user: UserDocument): UserDocument => {
      if (err)
        throw new HttpError(500, 'DATABASE_ERROR', 'Problem finding the user');
      if (!user)
        throw new HttpError(404, 'USER_NOT_FOUND', 'User not found');
      return user;
    });
  })
}

export const markAsVerified = async (user: UserDocument) => {
  user.verifiedAt = new Date()
  await user.save()
}

export const resetPassword = async (user: UserDocument, password: string) => {
  user.password = password
  await user.save()
}