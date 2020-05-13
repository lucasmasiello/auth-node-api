import { catchAsync } from '../middlewares'
import { Request, Response } from 'express'

export const home = catchAsync(async (req: Request, res: Response) => {
  // const user = await User.findById(req.session!.userId)

  return res.json({ user: req.context.user })
})
