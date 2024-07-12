// COMINICAÇÃO DO BANCO COM O RENDER
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT, // A porta do MySQL
    dialect: "mysql",
    define: {
      charsets: "utf8",
      collate: "utf8_unicode_ci",
      timeStamp: true,
    },
    logging: false,
  }
);

// TESTANDO A CONEXÃO COM O BANCO
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