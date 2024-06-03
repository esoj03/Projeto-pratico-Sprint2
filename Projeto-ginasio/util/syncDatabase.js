const Sequelize = require('sequelize');
const sequelize = new Sequelize(require('../config/config.json').development);

async function syncDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // Sincroniza todos os modelos
    await sequelize.sync({ force: true });  // 'force: true' recriará as tabelas a cada execução
    console.log('Database sincronizada com sucesso');


  } catch (error) {
    console.error('Não se consegue conectar:', error);
  } finally {
    await sequelize.close();
  }
}

syncDatabase();
module.exports = syncDatabase;
