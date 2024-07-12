const Sequelize = require("sequelize");
const sequelize = new Sequelize("fomulario_crud", "root", "", {
  host: "127.0.0.1",
  dialect: "mysql",
  define: {
    charsets: "utf8",
    collate: "utf8_unicode_ci",
    timeStamp: true,
  },
  logging: false,
});

// TESTANDO A CONECÃO COM O BANCO

// // .then - significa se deu certo
// sequelize.authenticate().then(() => {
// console.log("Conexão com o banco realizada com sucesso");

// // .catch - significa se não de certo
// }).catch((err) => {
//     console.log("Falha na conexão" + err);
// });

module.exports = { Sequelize, sequelize };
