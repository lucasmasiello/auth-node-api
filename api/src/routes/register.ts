import { Router } from 'express'
import { registerSchema } from '../models/parameters'
import { User } from '../models/schemas'
import { logIn } from '../auth'
import { guest } from '../middlewares'

const router = Router()

router.post('/register', guest, async (req, res) => {
    await registerSchema.validateAsync(req.body, { abortEarly: false })
    const { email, name, password } = req.body

    const found = await User.exists({email})

    if(found) {
        throw new Error('Invalid Email')
    }

    const user = await User.create({
        email, name, password
    })

    logIn(req, user.id)

    res.json({ user })
})

export default router;
