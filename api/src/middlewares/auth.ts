import { Response, NextFunction, Request } from "express";
import { validateToken } from "../auth";
import { catchAsync } from "./errors";
import { Unauthorized, UserDocument } from "../models";

export const auth = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['x-access-token'] as string

  if(!token) throw new Unauthorized()

  let user = await validateToken(token) as UserDocument
  // req.context.user = user
  
  console.log(user)
  next()
})
