import { catchAsync } from "../middlewares"
import { validate } from "../helpers/validators/joi"
import { User, HttpError } from "../models"
import { verifyEmailSchema, resendEmailSchema } from "../helpers/validators/parameters"
import { markAsVerified } from "../auth"
import { sendMail } from "../helpers/mail"

export const verify = catchAsync(async (req, res) => {
  await validate(verifyEmailSchema, req.query)

  const { id } = req.query

  const user = await User.findById(id).select('verifiedAt')

  if (!user || !User.hasValidVerificationUrl(req.originalUrl, req.query)) {
    throw new HttpError(
      400,
      'INVALID_ACTIVATION_LINK',
      'Invalid activation link'
    )
  }

  if (user.verifiedAt) {
    throw new HttpError(
      400,
      'ALREADY_VERIFIED',
      'User already verified'
    )
  }

  await markAsVerified(user)

  res.json({ message: 'OK' })
})

export const resend = catchAsync(async (req, res) => {
  await validate(resendEmailSchema, req.body)

  const { email } = req.body

  const user = await User.findOne({ email }).select('email verifiedAt')

  if (user && !user.verifiedAt) {
    const link = user.verificationUrl()

    await sendMail({
      to: email,
      subject: 'Verify your email address',
      text: link
    })
  }

  res.json({
    message: 'If your email address needs to be verified, you will receive an email with the activation link'
  })
})