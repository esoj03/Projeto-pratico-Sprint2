
//a.dosreis@telerad.fr
//alessiodosreis@hotmail.com
//ariston reis 

// controllers/membroController.js

const Membro = require('../models/membroModel');

// Create
exports.createMembro = async (req, res) => {
    try {
        const membro = await Membro.create(req.body);
        res.status(201).json(membro);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Read
exports.getMembros = async (req, res) => {
    try {
        const membros = await Membro.findAll();
        res.json(membros);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Update
exports.updateMembro = async (req, res) => {
    const { id } = req.params;
    try {
        const [updated] = await Membro.update(req.body, {
            where: { id }
        });
        if (updated) {
            const updatedMembro = await Membro.findOne({ where: { id } });
            return res.json({ membro: updatedMembro });
        }
        throw new Error('Membro not found');
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

// Delete
exports.deleteMembroporId = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Membro.destroy({
            where: { id }
        });
        if (deleted) {
            return res.json({ message: 'Membro deleted' });
        }
        throw new Error('Membro not found');
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

// Delete by Nome
exports.deleteMembroporNome = async (req, res) => {
    const { nome } = req.params;
    try {
        const deleted = await Membro.destroy({
            where: { nome }
        });
        if (deleted) {
            return res.json({ message: 'Membro deleted' });
        }
        throw new Error('Membro not found');
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

