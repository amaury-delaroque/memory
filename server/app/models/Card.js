const Sequelize = require("sequelize");
const sequelize = require("../database");

// On crée un modèle de notre table de BDD card en héritant de toutes les propriétés et méthodes de la class Sequelize
class Card extends Sequelize.Model {}

// On initialise les columnes, champs, types et contraintes de notre Modèle
Card.init(
  {
    name: {
      type: Sequelize.TEXT,
      defaultValue: "",
    },
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    theme_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Theme",
        key: "id",
      },
    },
  },
  {
    defaultScope: {
      // Par défaut, on veut toujours récupérer nos cartes par id dans l'ordre croissant, l'id correspond à la position de la carte sur la sprite.
      order: [["id", "ASC"]],
    },
    // on connecte notre modèle à la base de données via l'instance sequelize
    sequelize,
    tableName: "card",
  }
);
//on exporte le Modèle pour l'utiliser dans les controllers
module.exports = Card;
