import { catchAsync } from "../middlewares"
import { validate } from "../helpers/validators/joi"
import { registerSchema } from "../helpers/validators/parameters"
import { User, BadRequest } from "../models"
import { logIn } from "../auth"
import { sendMail } from "../helpers/mail"

export const register = catchAsync(async (req, res) => {
  await validate(registerSchema, req.body)

  const { email, name, password } = req.body

  const found = await User.exists({ email })

  if (found) {
    throw new BadRequest('Invalid email')
  }

  const user = await User.create({
    email, name, password
  })

  logIn(req, user.id)

  const link = user.verificationUrl()

  const response = await sendMail({
    to: email,
    subject: 'Verify your email address',
    text: link
  })

  res.json({ message: response })
})