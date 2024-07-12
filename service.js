const express = require("express"); // Importa o módulo Express para criar um servidor web.
const app = express(); // Cria uma instância do aplicativo Express.
const hbs = require("express-handlebars"); // Importa o módulo express-handlebars para usar templates Handlebars.
const bodyParser = require("body-parser"); // Importa o módulo body-parser para fazer o parsing de corpos de requisições HTTP.
const session = require("express-session"); // Importa o módulo express-session para gerenciar sessões do usuário.
const PORT = process.env.PORT || 3000; // Define a porta do servidor, usando a porta do ambiente ou 3000 como padrão.

// CONFIGURAÇÃO DO HANDLEBARS

app.engine(
  "hbs",
  hbs.engine({
    extname: "hbs",
    defaultLayout: "main",
  })
);
app.set("view engine", "hbs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

// IMPORTAR MODEL USUARIOS DO BD
const Usuario = require("./models/Usuario");
const { where } = require("sequelize");

// CON FIGURAÇÃO DA SESSION
app.use(
  session({
    secret: "ChaveSecreta41195480",
    resave: false,
    saveUninitialized: true,
  })
);

//METODO GET//

app.get("/", (req, res) => {
  if (req.session.errors) {
    var arrayErros = req.session.errors;
    req.session.errors = "";
    return res.render("index", { navActiveCad: true, error: arrayErros });
  }

  if (req.session.success) {
    req.session.success = false;
    return res.render("index", { navActiveCad: true, MsgSuccess: true });
  }
  res.render("index", { navActiveCad: true });
});

app.get("/users", (req, res) => {
  // findAll() - ele busca todos os dados de uma tabela do banco,
  Usuario.findAll()
    .then((values) => {
      // utilizei o map pra mapear cada valor deixando uma array dentro de array pra ficar mais organizado
      // console.log(values.map(values => values.toJSON()));
      if (values.length > 0) {
        res.render("users", {
          navActiveUsers: true,
          table: true,
          usuarios: values.map((values) => values.toJSON()),
        });
      } else {
        res.render("users", { navActiveUsers: true, table: false });
      }
    })
    .catch((err) => {
      console.log("Houve um erro na tabela" + err);
    });
});

// METODO POST//

app.post("/card", (req, res) => {
  // VALORES VINDO DO FORMILARIO
  var nome = req.body.nome;
  var email = req.body.email;
  //Essa rota post serve pra validar os valores que vinherão do formulario
  //tratar esses valores
  // enviar esses valores para o banco de dados

  // ARRAY QUE VAI CONTER TODDOS OS ERROS
  const erros = [];

  // REMOVER OS ESPAÇOS EM BRANCO ANTES E DEPOIS

  nome = nome.trim();
  email = email.trim();

  // LIMPAR O NOME DE CARACTERES ESPECIAIS (APENAS LETRAS)
  nome = nome.replace(/[^A-zÀ-Ú\s]/gi, "");

  // VERICAR SE O NOME VALIDO (APENAS LETRAS)

  if (!/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ\s']+$/.test(nome)) {
    // detalhe: push significa enviar para array de erros
    erros.push({ mensagem: "Nome Inválido!" });
  }

  // VERICAR SE O EMAIL É VALIDO (APENAS LETRAS)

  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    erros.push({ mensagem: "Campo email inválido!" });
  }

  // VERIFICAR SE ESTAR VAZIO OU NÃO O CAMPO
  if (nome == "" || typeof nome == undefined || nome == null) {
    erros.push({ mensagem: "Campo nome não pode ser vazio!" });
  }
  if (email == "" || typeof email == undefined || email == null) {
    erros.push({ mensagem: "Campo email não pode ser vazio!" });
  }

  // SE TIVER ALGUM ERRO ELE VAI RETORNAR

  if (erros.length > 0) {
    console.log(erros);
    req.session.errors = erros;
    req.session.success = false;
    return res.redirect("/");
  }

  // SUCESSSO, NENHUM ERRO
  // SALVAR NO BANCO DE DADOS

  // inseri o resgistro no banco de dados
  // nome da model - Usuario e o metodo -  create() pra criar a coluna e valor com objeto
  Usuario.create({
    //coluna: valor
    nome: nome,
    email: email.toLowerCase(), // toLowerCase() é pra não ocorrer o risco do usuario colocar um email com letras maiusculas.
  })
    .then(() => {
      console.log("Cadastrado com sucesso!");
      req.session.success = true;
      return res.redirect("/");
    })
    .catch((err) => {
      console.log("Falha ao Cadastrar! " + err);
      // se o erro for igual a o erro Sequelize, ele vai adicionar que se refere a (push)
      //para array de erros como objeto informando a mensagem.
      if (err.name === "SequelizeUniqueConstraintError") {
        erros.push({ mensagem: "Esse e-mail informado já está registrado!" });
      } else {
        erros.push({
          mensagem: "Erro ao tentar cadastrar o usuário. Tente novamente.",
        });
      }

      req.session.errors = erros;
      req.session.success = false;
      return res.redirect("/");
    });

  console.log("Validação realizada com sucesso!");
});

app.post("/editar", (req, res) => {
  var id = req.body.id;
  // findByPk - ele procura a chave primaria que no caso seria o id
  Usuario.findByPk(id)
    .then((dados) => {
      return res.render("editar", {
        error: false,
        id: dados.id,
        nome: dados.nome,
        email: dados.email,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.render("editar", {
        error: true,
        problema: "Não é possivel editar esse registro",
      });
    });
});

app.post("/update", (req, res) => {
  // VALORES VINDO DO FORMILARIO
  var nome = req.body.nome;
  var email = req.body.email;
  //Essa rota post serve pra validar os valores que vinherão do formulario
  //tratar esses valores
  // enviar esses valores para o banco de dados

  // ARRAY QUE VAI CONTER TODDOS OS ERROS
  const erros = [];

  // REMOVER OS ESPAÇOS EM BRANCO ANTES E DEPOIS

  nome = nome.trim();
  email = email.trim();

  // LIMPAR O NOME DE CARACTERES ESPECIAIS (APENAS LETRAS)
  nome = nome.replace(/[^A-zÀ-Ú\s]/gi, "");

  // VERICAR SE O NOME VALIDO (APENAS LETRAS)

  if (!/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ\s']+$/.test(nome)) {
    // detalhe: push significa enviar para array de erros
    erros.push({ mensagem: "Nome Inválido!" });
  }

  // VERICAR SE O EMAIL É VALIDO (APENAS LETRAS)

  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    erros.push({ mensagem: "Campo email inválido!" });
  }

  // VERIFICAR SE ESTAR VAZIO OU NÃO O CAMPO
  if (nome == "" || typeof nome == undefined || nome == null) {
    erros.push({ mensagem: "Campo nome não pode ser vazio!" });
  }
  if (email == "" || typeof email == undefined || email == null) {
    erros.push({ mensagem: "Campo email não pode ser vazio!" });
  }

  // SE TIVER ALGUM ERRO ELE VAI RETORNAR

  if (erros.length > 0) {
    console.log(erros);
    res.status(400).send({ status: 400, erros: erros });
  }

  // SUCESSSO, NENHUM ERRO
  // SALVAR NO BANCO DE DADOS

  // update() - atualiza os valores do banco
  Usuario.update(
    {
      nome: nome,
      email: email.toLowerCase(),
    },
    {
      where: {
        id: req.body.id,
      },
    }
  )
    .then((resultato) => {
      console.log(resultato);
      return res.redirect("/users");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/del", (req, res) => {
  // destroy() - remover um registro do banco de dados
  Usuario.destroy({
    where: {
      id: req.body.id,
    },
  })
    .then((retorno) => {
      return res.redirect("/users");
    })
    .catch((err) => {
      console.error(err);
    });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando : http://localhost:${PORT}`);
});
