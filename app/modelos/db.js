const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");

//criação da conexão com as informações do arquivo db.config.js
const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});

//abre a conexão MySQL
connection.connect(error => {
    if (error) throw error;
    console.log("Conexão com o banco de dados realizada com sucesso!");
});

module.exports = connection;