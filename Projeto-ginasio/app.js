/*nos midlewares realizar so o back end nao enviar nehuma  resposta ejs ou template
criar o midle para enviar dados no formato json para ver os dados 
*/

const express = require('express');
const sequelize = require('./util/database');
const syncDatabase = require('./util/syncDatabase');
const mongoDB = require('./util/conectionMongo');
const session = require('express-session');
const router = express.Router();
const errorHandler = require('./util/errorHandle');
const Membro = require('./models/membroModel');
const logger = require('morgan');
const membro = require('./routes/membroRoutes');
const usuarioRoutes = require('./routes/userRoutes');
const path = require('path');
const aulaRoutes = require('./routes/aulaRoutes');
const jsonResponse = require('./midlewares/jsonResponse'); 
const funcionarioRoutes = require('./routes/funcionarioRoutes'); 
const pagamentoRoutes = require('./routes/pagamentoRoutes');
const bodyParser = require('body-parser');

router.use(jsonResponse);

router.get('/models', async (req, res) => {
    const membros = await Membro.findAll();
    res.jsonResponse(membros);
});

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.use(session({
    secret: 'seu_segredo_da_sessao',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

app.use(logger('dev'))
app.use('/membros', membro);
app.use('/aulas', aulaRoutes);
app.use('/funcionarios', funcionarioRoutes);
app.use('/pagamentos', pagamentoRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use(errorHandler);

// Middleware para análise do corpo da requisição
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/// Servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Sincronizar o banco de dados
syncDatabase();

// Rotas para login e cadastro
app.use('/api', usuarioRoutes);

// Rotas para as páginas HTML
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'login.html'));
});

app.get('/cadastro', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'cadastro.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'index.html'));
});

// Middleware de autenticação
function requireLogin(req, res, next) {
    if (req.session && req.session.userId) {
        next();
    } else {
        res.redirect('/login');
    }
}

// Proteger a rota da página inicial
app.get('/inicio', requireLogin, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'inicio.html'));
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}`);
});

sequelize.sync({ force: false }).then(() => {
    console.log('Tabelas sincronizadas com sucesso');
}).catch(err => {
    console.error('Erro ao sincronizar tabelas:', err);
});


module.exports = app;
