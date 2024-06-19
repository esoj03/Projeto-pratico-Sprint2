const mongoose = require("mongoose");

const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;

const connect = () => {
    mongoose.connect(`mongodb+srv://${dbUser}:${dbPass}@cluster0.kwcpo9b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)

    const connection = mongoose.connection;
    connection.on("error", () => {
        console.error("Erro ao conectar ao mongodb. ")
    })

    connection.on("open", () => {
        console.log("Conectado ao mongodb com sucesso. ")
    })
}

connect();

module.exports = mongoose;
