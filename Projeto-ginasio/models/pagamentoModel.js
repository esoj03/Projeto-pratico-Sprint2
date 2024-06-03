// models/pagamentoModel.js

const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');

const Pagamento = sequelize.define('Pagamento', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    valor: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    data: {
        type: DataTypes.DATE,
        allowNull: false
    },
    // Outros campos do modelo de pagamento...
});

module.exports = Pagamento;
