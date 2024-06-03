// routes/membros.js

const express = require('express');
const router = express.Router();
const membroController = require('../controllers/membroController');

// Rotas para CRUD de membros
router.post('/', membroController.createMembro);
router.get('/', membroController.getMembros);
router.put('/:id', membroController.updateMembro);
router.delete('/:id', membroController.deleteMembroporId);
router.delete('/nome/:nome', membroController.deleteMembroporNome);

module.exports = router;

