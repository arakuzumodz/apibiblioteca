const express = require("express"); //express para criação da API Rest
const cors = require("cors");       //Middleware para o express

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"

};

app.use(cors(corsOptions));

//parsenode das requests do tipo JSON
app.use(express.json());    //express.json parser das informações vindas de uma requisição POST

app.use(express.urlencoded({//express.urlencoded parser das informações vindas no body da request
    extended: true //true: utiliza biblioteca QS, false: utiliza querystring,
                   //QS possibilita aninhamento de objetos (nested objects), formato que o JSON trabalha
}));

//rota home
app.get("/", (req, res) => {
    res.json({
        message: "Página inicial do projeto."
    });
});

require("./app/rotas/livro.rotas.js")(app);

//definição da porta e começando o listen das requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server rodando na porta ${PORT}`);

});