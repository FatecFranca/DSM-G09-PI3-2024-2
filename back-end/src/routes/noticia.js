import { Router } from 'express'
import controller from '../controllers/noticia.js'

const router = Router()

router.get('/:id', controller.retrieveOne);
router.get('/', controller.retrieveAll);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

export default router;