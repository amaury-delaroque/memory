const Sequelize = require("sequelize");
const sequelize = require("../database");

// On crée un modèle de notre table de BDD score en héritant de toutes les propriétés et méthodes de la class Sequelize
class Score extends Sequelize.Model {}

// On initialise les columnes, champs, types et contraintes de notre Modèle
Score.init(
  {
    pseudo: {
      type: Sequelize.TEXT,
    },
    score: {
      type: Sequelize.INTEGER,
      allowNul: false,
    },
    createdAt: {
      type: Sequelize.TIME,
    },
  },
  {
    defaultScope: {
      //Par défaut on récupérer les scores ordonnées en fonction du temps écoulé durant la partie, stocké dans la colonne score
      order: [["score", "ASC"]],
    },
    // on connecte notre modèle à la base de données via l'instance sequelize
    sequelize,
    //on exporte le Modèle pour l'utiliser dans les controllers
    tableName: "score",
  }
);

module.exports = Score;
