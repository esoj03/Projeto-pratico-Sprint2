// controllers/usuarioController.js

const Usuario = require('../models/userModel');
const bcrypt = require('bcrypt');

exports.criarUsuario = async (req, res) => {
    try {
        const { nome, email, password } = req.body;

        const usuarioExistente = await Usuario.findOne({ where: { email } });
        if (usuarioExistente) {
            return res.status(400).json({ message: 'E-mail já cadastrado.' });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const novoUsuario = await Usuario.create({
            nome,
            email,
            password: hashPassword,
        });

        res.status(201).json({
            message: 'Usuário cadastrado com sucesso.',
            usuario: {
                id: novoUsuario.id,
                nome: novoUsuario.nome,
                email: novoUsuario.email,
            },
        });
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        res.status(500).json({ message: 'Erro ao cadastrar usuário.' });
    }
};

// Função de login
exports.loginUsuario = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Buscar usuário pelo e-mail
        const usuario = await Usuario.findOne({ where: { email } });
        if (!usuario) {
            return res.status(401).json({ message: 'E-mail ou senha incorretos.' });
        }

        // Verificar a senha
        const senhaValida = await bcrypt.compare(password, usuario.password);
        if (!senhaValida) {
            return res.status(401).json({ message: 'E-mail ou senha incorretos.' });
        }

        // Armazenar ID do usuário na sessão
        req.session.userId = usuario.id;

        res.status(200).json({ message: 'Login bem-sucedido.' });
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(500).json({ message: 'Erro ao fazer login.' });
    }
};

// Função de logout
exports.logoutUsuario = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao sair.' });
        }
        res.status(200).json({ message: 'Logout bem-sucedido.' });
    });
};
