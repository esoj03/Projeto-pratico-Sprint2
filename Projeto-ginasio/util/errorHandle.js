// middleware/errorHandler.js

// Middleware para lidar com erros de forma centralizada
const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Log do erro

    // Verifica se é um erro de validação
    if (err.name === 'ValidationError') {
        return res.status(400).json({ error: err.message });
    }

    // Outros tipos de erros
    res.status(500).json({ error: 'Internal Server Error' });
};

module.exports = errorHandler;
