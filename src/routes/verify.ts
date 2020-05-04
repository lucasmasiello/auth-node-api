import { Router } from 'express'
import { verify, resend } from '../actions/verify'

const router = Router()

router.get('/verify-user', verify)

router.post('/verify-user/resend', resend)

export default router
