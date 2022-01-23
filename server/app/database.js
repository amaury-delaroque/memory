// Importation du module Sequelize

const { Sequelize } = require("sequelize");

// 2. Créer une instance de sequelize
const sequelize = new Sequelize(process.env.PG_URL, {
  dialect: "postgres",
  define: {
    timestamps: false,
  },
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

module.exports = sequelize;
