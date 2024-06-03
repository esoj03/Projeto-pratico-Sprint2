// models/funcionarioModel.js

const  {DataTypes}  = require('sequelize');
const sequelize = require('../util/database');

const Funcionario = sequelize.define('Funcionario', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cargo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    salario: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    // Outros campos do modelo de funcionário...
});

module.exports = Funcionario;
