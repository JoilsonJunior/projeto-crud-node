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


// BANCO LOCAL XAMMP

// const db = require("./db");

// const Usuario = db.sequelize.define("usuario", {
//   id: {
//     type: db.Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true,
//   },

//   nome: {
//     type: db.Sequelize.STRING,
//     allowNull: false,
//   },
//   email: {
//     type: db.Sequelize.STRING,
//     allowNull: false,
//     // unique: true, // pra manter o email unico e não acontecer de registrar o mesmo email no banco
//   },
// });

// Usuario.sync({ alter: true }); // alter: true juntamente com unique: true - Verifica diferenças

// module.exports = Usuario;