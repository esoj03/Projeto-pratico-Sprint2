// routes/usuarioRoutes.js

const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/userController');

// Rota para criar um novo usuário
router.post('/cadastro', usuarioController.criarUsuario);

router.post('/login', usuarioController.loginUsuario);
router.post('/logout', usuarioController.logoutUsuario);

module.exports = router;
