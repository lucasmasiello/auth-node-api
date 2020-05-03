import { catchAsync } from "../middlewares";
import { validate } from "../helpers/validators/joi";
import { loginSchema } from "../helpers/validators/parameters";
import { User, Unauthorized } from "../models";
import { logIn, logOut } from "../auth";

export const login = catchAsync(async (req, res) => {
  await validate(loginSchema, req.body)

  const { email, password } = req.body;
  const user = await User.findOne({ email })

  if (!user || !(await user.matchesPassword(password))) {
    throw new Unauthorized(
      'INCORRECT_EMAIL_OR_PASSWORD',
      'Incorrect email or password'
    )
  }

  logIn(req, user.id)

  res.json({ message: 'OK' })
})

export const logout = catchAsync(async (req, res) => {
  await logOut(req, res)

  res.json({message: 'OK'})
})