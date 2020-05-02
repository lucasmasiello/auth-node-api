import { Router } from "express";
import { User } from "../models";
import { catchAsync, auth } from "../middlewares";

const router = Router()

router.get('/home', auth, catchAsync(async (req, res) => {
  const user = await User.findById(req.session!.userId)
  return res.json(user)
}))


export default router