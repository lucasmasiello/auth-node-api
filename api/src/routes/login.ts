import { Router } from 'express'
import { login } from '../actions'

const router = Router()

router.post('/auth', login)

export default router