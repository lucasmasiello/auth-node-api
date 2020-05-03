import { Router } from 'express'
import { guest } from '../middlewares'
import { register } from '../actions'

const router = Router()

router.post('/register', guest, register)

export default router;
