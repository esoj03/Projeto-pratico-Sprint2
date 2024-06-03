// routes/funcionarios.js

const express = require('express');
const router = express.Router();
const funcionarioController = require('../controllers/funcionarioController');


router.post('/', funcionarioController.createFuncionario);
router.get('/', funcionarioController.getFuncionarios);
router.put('/:id', funcionarioController.updateFuncionario);
router.delete('/:id', funcionarioController.deleteFuncionarioporId);
router.delete('/nome/:nome', funcionarioController.deleteFuncionarioporNome);

module.exports = router;
