// routes/aulas.js

const express = require('express');
const router = express.Router();
const aulaController = require('../controllers/aulaController');

// Rotas para CRUD de aulas
router.post('/', aulaController.createAula);
router.get('/', aulaController.getAulas);
router.get('/:id', aulaController.getAulaporId);
router.put('/:id', aulaController.updateAula);
router.delete('/:id', aulaController.deleteAulaporId);
router.delete('/nome/:nome', aulaController.deleteAulaporNome);

module.exports = router;
