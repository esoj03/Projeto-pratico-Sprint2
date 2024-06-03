// models/aulaModel.js

const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');

const Aula = sequelize.define('Aula', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    data: {
        type: DataTypes.DATE,
        allowNull: false
    },
    // Outros campos do modelo de aula...
});

module.exports = Aula;
