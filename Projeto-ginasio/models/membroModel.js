// models/membro.js

const { DataTypes } = require('sequelize');
const conexaoDB = require('../util/database');

const Membro = conexaoDB.define('membro', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sobrenome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    // Outros campos do modelo de membro...
});

module.exports = Membro;
