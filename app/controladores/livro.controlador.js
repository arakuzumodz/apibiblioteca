const Livro = require("../modelos/livro.modelo.js");

//cria e salva um novo livro
exports.create = (req, res) => {
    //valida a request
    if (!req.body) {
        res.status(400).send({  //400 Bad Request
            message: "Conteúdo não pode ser vazio!"
        });
    }

    //cria o livro
    const livro = new Livro({
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        autor: req.body.autor,
        emprestado: req.body.emprestado || false //começa como false caso não seja especificado
    });

    //salva o livro na db
    Livro.create(livro, (err, data) => {
        if (err)
            res.status(500).send({ //500 Internal Server Error
                message:
                    err.message || "Um erro aconteceu enquanto criava o livro"
            });
        else res.status(201).send(data); //201 Created
    });
};

//pega todos livros da db
exports.findAll = (req, res) => {
    const titulo = req.query.titulo;

    Livro.getAll(titulo, (err, data) => {
        if (err)
            res.status(500).send({ //500 Internal Server Error
                message:
                    err.message || "Um erro aconteceu enquanto recuperava os livros"
            });
        else res.status(200).send(data); //200 OK (GET)
    });
};

//encontra um único livro pela ID
exports.findOne = (req, res) => {
    Livro.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({ //404 Not Found
                    message: "Erro recuperando o livro pela ID " + req.params.id
                });
            } else {
                res.status(500).send({//500 Internal Server Error
                    message: "Erro recuperando o livro pela ID " + req.params.id
                });
            }
        } else res.status(200).send(data); //200 OK
    });
};

//encontra todos livros emprestados
exports.findAllEmprestado = (req, res) => {
    Livro.getAllEmprestado((err, data) => {
        if (err)
            res.status(500).send({ //500 Internal Server Error
                message:
                    err.message || "Um erro aconteceu enquanto recuperava os livros"
            });
        else res.status(200).send(data); //200 OK
    });
};

//faz update em um livro identificado pela ID na request
exports.update = (req, res) => {
    //valida a request
    if (!req.body) {
        res.status(400).send({ //400 Bad Request
            message: "Conteúdo não pode ser vazio!"
        });
    }

    console.log(req.body);

    Livro.updateById(
        req.params.id,
        new Livro(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({ //404 Not Found
                        message: `Não encontrou livro com id ${req.params.id}`
                    });
                } else {
                    res.status(500).send({ //500 Internal Server Error
                        message: "Erro atualizando livro com id " + req.params.id
                    });
                }
            } else res.status(201).send(data); //201 Created (PUT/POST)
        }
    );
};

//deleta um livro com a id especificada na request
exports.delete = (req, res) => {
    Livro.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({ //404 Not Found
                    message: `Não encontrou livro com id ${req.params.id}`
                });
            } else {
                res.status(500).send({ //500 Internal Server Error
                    message: "Não conseguiu deletar o livro com id " + req.params.id
                });
            }
        } else res.status(200).send({ message: `Livro deletado com sucesso!` }); //como tem retorno, status 200,
                                                                                 //caso nao retornasse nada, 204.
    });
};

exports.testaAPI = () => {
    Livro.teste();
};

//deleta todos livros da db
exports.deleteAll = (req, res) => {
    Livro.removeAll((err, data) => {
        if(err)
            res.status(500).send({ //500 Internal Server Error
                message:
                err.message || "Um erro ocorreu ao remover todos os livros"
            });
            else res.status(200).send({ message: `Todos os livros foram removidos com sucesso!`}); //200, possui retorno (message)
    });
};