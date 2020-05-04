import { Router } from 'express'
import { login } from '../actions'

const router = Router()

router.post('/login', login)

export default router