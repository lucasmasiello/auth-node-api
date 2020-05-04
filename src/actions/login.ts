import { catchAsync } from "../middlewares";
import { validate } from "../helpers/validators/joi";
import { loginSchema } from "../helpers/validators/parameters";
import { User, Unauthorized } from "../models";
import { createToken } from "../auth";

export const login = catchAsync(async (req, res) => {
  await validate(loginSchema, req.body)

  const { logger } = req.context

  const { email, password } = req.body;
  const user = await User.findOne({ email })

  logger.info({message: 'info message'})

  if (!user || !(await user.matchesPassword(password))) {
    throw new Unauthorized(
      401,
      'INCORRECT_EMAIL_OR_PASSWORD',
      'Incorrect email or password'
    )
  }

  if (!user.verifiedAt) {
    throw new Unauthorized(
      401,
      'USER_NOT_VERIFIED',
      'The user is not verified'
    )
  }

  const token = createToken(user.id)

  res.json({ token })
})