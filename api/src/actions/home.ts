import { catchAsync } from "../middlewares"
import { User } from "../models"

export const home = catchAsync(async (req, res) => {
  const user = await User.findById(req.session!.userId)
  return res.json(user)
})