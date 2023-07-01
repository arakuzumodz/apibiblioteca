module.exports = app => {
const livros = require("../controladores/livro.controlador.js");

var router = require("express").Router();
require("dotenv-safe").config();
var jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
router.use(bodyParser.json());



//cria um novo livro
router.post("/", livros.create);

//recupera todos os livros
router.get("/", livros.findAll);

//recupera todos os livros emprestados
router.get("/emprestado", livros.findAllEmprestado);

//recupera um livro com ID
router.get("/:id", livros.findOne);

//atualiza um livro com a ID
router.put("/:id", livros.update);

//deleta um livro com a ID
router.delete("/:id", livros.delete);

//deleta todos os livros
router.delete("/", livros.deleteAll);

//testa a API de teste => 
router.get("/teste", livros.testaAPI);

app.use('/api/livros', router);

app.post('/api/login', (req, res, next) => {
    //esse teste abaixo deve ser feito no seu banco de dados
    if(req.body.user === 'sw' && req.body.password === '123'){
      //auth ok
      const id = 1; //esse id viria do banco de dados
      const token = jwt.sign({ id }, process.env.SECRET, {
        expiresIn: 3000 // expires in 5min
        //expiresIn: 300 // expires in 5min
      });
      return res.json({ auth: true, token: token });
    }
    
    res.status(500).json({message: 'Login inválido!'});
})

app.post('/api/logout', function(req, res) {
    res.json({ auth: false, token: null });
})

app.get('/api/clientes', verifyJWT, (req, res) => { 
    console.log("Retornou todos clientes!");
    res.json([{id:1,nome:'teste'}]);
})

function verifyJWT(req, res, next){
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
      
      // se tudo estiver ok, salva no request para uso posterior
      req.userId = decoded.id;
      next();
    });



}



};