import { Request, Response, NextFunction } from "express";
import { isLoggedIn } from "../auth";
import { BadRequest, Unauthorized } from "../models";
import { runInNewContext } from "vm";
import { catchAsync } from "./errors";
import { createApp } from "../app";

export const guest = (req: Request, res: Response, next: NextFunction) => {
  if (isLoggedIn(req)){
    return(next(new BadRequest('You are already logged in')))
  }

  next()
}

export const auth = (req: Request, res: Response, next: NextFunction) => {
  if(!isLoggedIn(req)){
    return next(new Unauthorized('You must be logged in'))
  }

  next()
}

// export const active = catchAsync(
//   async(req: Request, res: Response, next: NextFunction) => {
//     if(isLoggedIn(req)){
//       const now = Date.now()
//       const {createdAt} = req.session as Express.Session
//       if(now > createdAt + SESSION_ABSOLUTE_TIMEOUT){
//         await logOut(req, res)

//         return next(new Unauthorized('Session expired'))
//       }
//     }
//   }
// )