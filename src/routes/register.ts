import { Router } from 'express'
import { register } from '../actions'

const router = Router()

router.post('/register', register)

export default router
