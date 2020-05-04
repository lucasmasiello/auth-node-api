import { Router } from 'express'
import { verify, resend } from '../actions/verify'

const router = Router()

router.get('/email/verify', verify)

router.post('/email/resend', resend)

export default router
