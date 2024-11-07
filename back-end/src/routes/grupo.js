import { Router } from 'express'
import controller from '../controllers/grupo.js'

const router = Router()

router.post('/', controller.create);
router.get('/', controller.retrieveAll);
router.get('/:id', controller.retrieveOne);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

router.post('/:grupoId/usuarios', controller.addUserToGroup);
router.delete('/:grupoId/usuarios', controller.removeUserFromGroup);
router.get('/:grupoId/usuarios', controller.getGroupUsers);
router.get('/:grupoId/usuarios/:id', controller.getUserGroups);

export default router;