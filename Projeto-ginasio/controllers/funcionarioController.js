// controllers/funcionarioController.js

const Funcionario = require('../models/funcionarioModel');

// Create
exports.createFuncionario = async (req, res) => {
    try {
        const funcionario = await Funcionario.create(req.body);
        res.status(201).json(funcionario);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Read
exports.getFuncionarios = async (req, res) => {
    try {
        const funcionarios = await Funcionario.findAll();
        res.json(funcionarios);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Update
exports.updateFuncionario = async (req, res) => {
    const { id } = req.params;
    try {
        const [updated] = await Funcionario.update(req.body, {
            where: { id }
        });
        if (updated) {
            const updatedFuncionario = await Funcionario.findOne({ where: { id } });
            return res.json({ funcionario: updatedFuncionario });
        }
        throw new Error('Funcionario not found');
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

// Delete
exports.deleteFuncionarioporId = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Funcionario.destroy({
            where: { id }
        });
        if (deleted) {
            return res.json({ message: 'Funcionário deleted' });
        }
        throw new Error('Funcionário not found');
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

// Delete by Nome
exports.deleteFuncionarioporNome = async (req, res) => {
    const { nome } = req.params;
    try {
        const deleted = await Funcionario.destroy({
            where: { nome }
        });
        if (deleted) {
            return res.json({ message: 'Funcionário deleted' });
        }
        throw new Error('Funcionário not found');
    } catch (error) {
        return res.status(500).send(error.message);
    }
};