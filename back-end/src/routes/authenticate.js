import { Router } from 'express'
import controller from '../controllers/login.js'

const router = Router()

router.post('/login', controller.login);
router.post('/register', controller.create)

export default router;