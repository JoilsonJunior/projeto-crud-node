const db = require("./db");

const Usuario = db.sequelize.define("usuario", {
  id: {
    type: db.Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  nome: {
    type: db.Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: db.Sequelize.STRING,
    allowNull: false,
    unique: true, // pra manter o email unico e não acontecer de registrar o mesmo email no banco
  },
});

Usuario.sync({ alter: true }); // alter: true juntamente com unique: true - Verifica diferenças

module.exports = Usuario;
