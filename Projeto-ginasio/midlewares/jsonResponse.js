// middlewares/jsonResponse.js

module.exports = (req, res, next) => {
    res.jsonResponse = (data, statusCode = 200) => {
        res.status(statusCode).json(data);
    };
    next();
};
