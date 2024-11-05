import { Router } from 'express'
import controller from '../controllers/transacao.js'

const router = Router()

router.post('/', controller.create);

export default router;