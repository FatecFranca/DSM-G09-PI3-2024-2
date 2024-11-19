import { Router } from 'express'
import controller from '../controllers/transacao.js'

const router = Router()

router.post('/', controller.create);
router.get('/', controller.retrieveAll);
router.get('/:id', controller.retrieveOne);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);
router.post('/receitas', controller.getReceitasByMonths);
router.post('/despesas', controller.getDespesaByMonths);

export default router;