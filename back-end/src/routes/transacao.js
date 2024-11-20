import { Router } from 'express'
import controller from '../controllers/transacao.js'

const router = Router()

router.post('/', controller.create);
router.get('/', controller.retrieveAll);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);
router.post('/receitas', controller.getReceitasByMonths);
router.get('/receita/:userId', controller.getReceitasByMonth)
router.post('/despesas', controller.getDespesaByMonths);

export default router;