const Sequelize = require("sequelize");
const sequelize = require("../database");

// On crée un modèle de notre table de BDD card en héritant de toutes les propriétés et méthodes de la class Sequelize
class Theme extends Sequelize.Model {}

// On initialise les columnes, champs, types et contraintes de notre Modèle
Theme.init(
  {
    name: {
      type: Sequelize.TEXT,
      allowNul: false,
    },
    sprite: {
      type: Sequelize.TEXT,
    },
    primary_color: {
      type: Sequelize.TEXT,
      defaultValue: "",
    },
    second_color: {
      type: Sequelize.TEXT,
      defaultValue: "",
    },
    light_color: {
      type: Sequelize.TEXT,
      defaultValue: "",
    },
    dark_color: {
      type: Sequelize.TEXT,
      defaultValue: "",
    },
  },
  {
    defaultScope: {
      //Par défaut, on inclus toutes les cardes associées aux themes
      include: ["cards"],
    },
    // on connecte notre modèle à la base de données via l'instance sequelize
    sequelize,
    tableName: "theme",
  }
);
//on exporte le Modèle pour l'utiliser dans les controllers
module.exports = Theme;
