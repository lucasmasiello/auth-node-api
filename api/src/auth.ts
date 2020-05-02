import { Request, Response } from 'express'
import { SESSION_NAME } from './config';

export const isLoggedIn = (req: Request) => !!req.session!.userId

export const logIn = (req: Request, userId: string) => {
  req.session!.userId = userId
  req.session!.createdAt = Date.now()
}

export const logOut = (req: Request, res: Response) => {
  return new Promise((resolve, reject) => {
    // Delete sesion from redis
    req.session!.destroy((err: Error) => {
      if (err) reject(err)

      // Delete cookie
      res.clearCookie(SESSION_NAME)

      resolve()
    })
  })
}