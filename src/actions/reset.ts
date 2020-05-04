import { catchAsync } from "../middlewares"
import { validate } from "../helpers/validators/joi"
import { forgotPasswordSchema, resetPasswordSchema } from "../helpers/validators/parameters"
import { User, BadRequest } from "../models"
import { PasswordReset } from "../models/schemas/reset"
import { sendMail } from "../helpers/mail"
import { resetPassword } from "../auth"

export const emailReset = catchAsync(async (req, res) => {
  await validate(forgotPasswordSchema, req.body)

  const { email } = req.body
  const user = await User.findOne({ email })

  if (user) {
    const token = PasswordReset.plaintextToken()

    const reset = await PasswordReset.create({ userId: user.id, token })

    await sendMail({
      to: email,
      subject: 'Reset your password',
      text: reset.url(token)
    })
  }

  res.json({ message: 'If you have an account with us, you will receive an email with a link to reset your password' })
})

export const reset = catchAsync(async ({ query, body }, res) => {
  await validate(resetPasswordSchema, { query, body })

  const { id, token } = query
  const { password } = body

  const reset = await PasswordReset.findById(id)
  let user

  if (!reset || !reset.isValid(token as string) || !(user = await User.findById(reset.userId))) {
    throw new BadRequest(400, 'INVALID_RESET_TOKEN', 'Invalid password reset token')
  }

  await Promise.all([
    resetPassword(user, password),
    PasswordReset.deleteMany({ userId: reset.userId })
  ])

  await sendMail({
    to: user.email,
    subject: 'Password reset',
    text: 'Your password was successfully reset'
  })

  res.json({ message: 'OK' })
})