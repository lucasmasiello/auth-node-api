import { Router } from "express";
import { auth } from "../middlewares";
import { home } from "../actions/home";

const router = Router()

router.get('/home', auth, home)

export default router