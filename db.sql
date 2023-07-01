CREATE TABLE IF NOT EXISTS `livros` (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  titulo varchar(255) NOT NULL,
  descricao varchar(255),
  autor varchar(255) NOT NULL,
  emprestado BOOLEAN DEFAULT false
) ENGINE=InnoDB DEFAULT CHARSET=utf8;