import { Router } from 'express'
import { User } from '../models/schemas'
import { logIn } from '../auth'
import { guest, catchAsync } from '../middlewares'
import { validate } from '../helpers/validators/joi'
import { BadRequest } from '../models'
import { registerSchema } from '../helpers/validators/parameters'

const router = Router()

router.post('/register', guest, catchAsync(async (req, res) => {
  await validate(registerSchema, req.body)

  const { email, name, password } = req.body

  const found = await User.exists({ email })

  if (found) {
    throw new BadRequest(
      'INVALID_EMAIL',
      'Invalid Email'
    )
  }

  const user = await User.create({
    email, name, password
  })

  logIn(req, user.id)

  res.json({ user })
}))

export default router;
