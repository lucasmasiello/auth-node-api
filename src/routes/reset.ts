import { Router } from 'express'
import { emailReset, reset } from '../actions/reset'

const router = Router()

router.post('/password/email', emailReset)

router.post('/password/reset', reset)

export default router
