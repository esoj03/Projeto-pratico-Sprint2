// controllers/aulaController.js

const Aula = require('../models/aulaModel');

// Create
exports.createAula = async (req, res) => {
    try {
        const aula = await Aula.create(req.body);
        res.status(201).json(aula);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Read
exports.getAulas = async (req, res) => {
    try {
        const aulas = await Aula.findAll();
        res.json(aulas);
        
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getAulaporId = async (req, res) => {
    const { id } = req.params;
    try {
        const aula = await Aula.findByPk(id);
        if (aula) {
            res.json(aula);
        } else {
            res.status(404).json({ message: 'Aula not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateAula = async (req, res) => {
    const { id } = req.params;
    try {
        const [updated] = await Aula.update(req.body, {
            where: { id }
        });
        if (updated) {
            const updatedAula = await Aula.findOne({ where: { id } });
            return res.json({ aula: updatedAula });
        }
        throw new Error('Aula not found');
    } catch (error) {
        return res.status(500).send(error.message);
    }
};
// Delete
exports.deleteAulaporId = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Aula.destroy({
            where: { id }
        });
        if (deleted) {
            return res.json({ message: 'Aula deleted' });
        }
        throw new Error('Aula not found');
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.deleteAulaporNome = async (req, res) => {
    const { nome } = req.params;
    try {
        const deleted = await Aula.destroy({
            where: { nome }
        });
        if (deleted) {
            return res.json({ message: 'Aula deleted' });
        }
        throw new Error('Aula not found');
    } catch (error) {
        return res.status(500).send(error.message);
    }
};