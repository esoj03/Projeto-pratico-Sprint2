'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Membros', [
      {
        nome: 'João',
        email: 'joao@example.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Maria',
        email: 'maria@example.com',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Membros', null, {});
  }
};
