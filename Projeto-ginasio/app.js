/*nos midlewares realizar so o back end nao enviar nehuma  resposta ejs ou template
criar o midle para enviar dados no formato json para ver os dados 
*/

const express = require('express');
const sequelize = require('./util/database');
const router = express.Router();
const errorHandler = require('./util/errorHandle');
const Membro = require('./models/membroModel');
const logger = require('morgan');
const membro = require('./routes/membroRoutes')
const Aula = require('./models/aulaModel')
const aulaRoutes = require('./routes/aulaRoutes');
const jsonResponse = require('./midlewares/jsonResponse');
const funcionarioModel = require('./models/funcionarioModel'); 
const funcionarioRoutes = require('./routes/funcionarioRoutes'); 
const pagamentoRoutes = require('./routes/pagamentoRoutes');


router.use(jsonResponse);

router.get('/models', async (req, res) => {
    const membros = await Membro.findAll();
    res.jsonResponse(membros);
});

const app = express();
app.use(express.json());
app.use(logger('dev'))
app.use('/membros', membro);
app.use('/aulas', aulaRoutes);
app.use('/funcionarios', funcionarioRoutes);
app.use('/pagamentos', pagamentoRoutes);
app.use(errorHandler);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}`);
});

sequelize.sync({ force: true }).then(() => {
    console.log('Tabelas sincronizadas com sucesso');
}).catch(err => {
    console.error('Erro ao sincronizar tabelas:', err);
});


module.exports = app;
