const express = require('express');
const router = express.Router();
const pagamentoController = require('../controllers/pagamentoController');

router.post('/', pagamentoController.createPagamento);
router.get('/', pagamentoController.getPagamentos);
router.put('/:id', pagamentoController.updatePagamento);
router.delete('/:id', pagamentoController.deletePagamentoporId);
router.delete('/nome/:nome', pagamentoController.deletePagamentoporNome);

module.exports = router;
