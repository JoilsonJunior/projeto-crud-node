// COMINICAÇÃO DO BANCO COM O RENDER
const Sequelize = require("sequelize");

// Verificar se a senha é 'none' e substituir por uma string vazia
const dbPassword = process.env.DB_PASSWORD === 'none' ? '' : process.env.DB_PASSWORD;

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  dbPassword,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    define: {
      charsets: "utf8",
      collate: "utf8_unicode_ci",
      timeStamp: true,
    },
    logging: false,
  }
);

// Testando a conexão com o banco
sequelize.authenticate().then(() => {
  console.log("Conexão com o banco realizada com sucesso");
}).catch((err) => {
  console.log("Falha na conexão: " + err);
});

module.exports = { Sequelize, sequelize };




// EXECUÇÃO DO BANCO LOCAL VIA XAMPP

// const Sequelize = require("sequelize");
// const sequelize = new Sequelize("fomulario_crud", "root", "", {
//   host: "127.0.0.1",
//   dialect: "mysql",
//   define: {
//     charsets: "utf8",
//     collate: "utf8_unicode_ci",
//     timeStamp: true,
//   },
//   logging: false,
// });

// // TESTANDO A CONECÃO COM O BANCO

// // // .then - significa se deu certo
// // sequelize.authenticate().then(() => {
// // console.log("Conexão com o banco realizada com sucesso");

// // // .catch - significa se não de certo
// // }).catch((err) => {
// //     console.log("Falha na conexão" + err);
// // });

// module.exports = { Sequelize, sequelize }; 