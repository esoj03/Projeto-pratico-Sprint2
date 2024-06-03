// controllers/pagamentoController.js

const Pagamento = require('../models/pagamentoModel');

// Create
exports.createPagamento = async (req, res) => {
    try {
        const pagamento = await Pagamento.create(req.body);
        res.status(201).json(pagamento);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Read
exports.getPagamentos = async (req, res) => {
    try {
        const pagamentos = await Pagamento.findAll();
        res.json(pagamentos);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Update
exports.updatePagamento = async (req, res) => {
    const { id } = req.params;
    try {
        const [updated] = await Pagamento.update(req.body, {
            where: { id }
        });
        if (updated) {
            const updatedPagamento = await Pagamento.findOne({ where: { id } });
            return res.json({ pagamento: updatedPagamento });
        }
        throw new Error('Pagamento not found');
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

// Delete
exports.deletePagamentoporId = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Pagamento.destroy({
            where: { id }
        });
        if (deleted) {
            return res.json({ message: 'Pagamento deleted' });
        }
        throw new Error('Pagamento not found');
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

// Delete by Nome
exports.deletePagamentoporNome = async (req, res) => {
    const { nome } = req.params;
    try {
        const deleted = await Pagamento.destroy({
            where: { nome }
        });
        if (deleted) {
            return res.json({ message: 'Pagamento deleted' });
        }
        throw new Error('Pagamento not found');
    } catch (error) {
        return res.status(500).send(error.message);
    }
};