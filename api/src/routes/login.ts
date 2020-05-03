import { Router } from 'express'
import { guest, auth } from '../middlewares'
import { login, logout } from '../actions'

const router = Router()

router.post('/login', guest, login)

router.post('/logout', auth, logout)

export default router