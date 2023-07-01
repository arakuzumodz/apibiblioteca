const sql = require("./db.js");

//construtor
const Livro = function (livro) {
    this.titulo = livro.titulo;
    this.descricao = livro.descricao;
    this.autor = livro.autor;
    this.emprestado = livro.emprestado;
};

Livro.create = (newLivro, result) => {
    sql.query("INSERT INTO livros SET ?", newLivro, (err, res) => {
        if (err) {
            console.log("erro: ", err);
            result(err, null);
            return;
        }

        console.log("criou livro: ", { id: res.insertId, ...newLivro });
        result(null, { id: res.insertId, ...newLivro });
    });
};

Livro.findById = (id, result) => {
    sql.query(`SELECT * FROM livros WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("erro: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("encontrou livro: ", res[0]);
            result(null, res[0]);
            return;
        }

        //não encontrou
        result({ kind: "not_found" }, null);
    });
};

Livro.getAll = (titulo, result) => {
    let query = "SELECT * FROM livros";

    if (titulo) {
        query += ` WHERE titulo LIKE '%${titulo}%'`;
    }

    sql.query(query, (err, res) => {
        if (err) {
            console.log("erro: ", err);
            result(null, err);
            return;
        }

        console.log("livros: ", res);
        result(null, res);
    });
};

Livro.getAllEmprestado = result => {
    sql.query("SELECT * FROM livros WHERE emprestado=true", (err, res) => {
        if (err) {
            console.log("erro: ", err);
            result(null, err);
            return;
        }

        console.log("livros: ", res);
        result(null, res);
    });
};

Livro.updateById = (id, livro, result) => {
    sql.query(
        "UPDATE livros SET titulo = ?, descricao = ?, emprestado = ? where id = ?",
        [livro.titulo, livro.descricao, livro.emprestado, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                //não encontrou livro com a ID
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("atualizou livro: ", { id: id, ...livro });
            result(null, { id: id, ...livro });
        }
    );
};

Livro.remove = (id, result) => {
    sql.query("DELETE FROM livros WHERE id = ?", id, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if(res.affectedRows == 0) {
            //não encontrou livro com a ID
            result({kind: "not_found"}, null);
            return;
        }

        console.log("deletou o livro com ID: ", id);
        result(null, res);
    });
};

Livro.teste = (id, result) => {
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(json => console.log(json))
};

Livro.removeAll = result => {
    sql.query("DELETE FROM livros", (err, res) => {
        if(err) {
            console.log("erro: ", err);
            result(null, err);
            return;
        }

        console.log(`deletou ${res.affectedRows} livros`);
        result(null, res);
    });
};

module.exports = Livro;