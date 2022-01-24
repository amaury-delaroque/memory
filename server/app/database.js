// Importation du module Sequelize

const { Sequelize } = require("sequelize");

// Création de l'instance de sequelize
//On se connecte à PG_URL (BDD locale) en dev et à DATABASE_URL (BDD production) en production
const sequelize = new Sequelize(process.env.PG_URL, {
  dialect: "postgres",
  logging: true,
  define: {
    timestamps: false,
  },
  dialectOptions: {
    /* On commente cette propriété en développement. On la réactive pour la mise en production
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
    */
  },
});

module.exports = sequelize;
