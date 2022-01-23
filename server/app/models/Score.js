const Sequelize = require("sequelize");

const sequelize = require("../database");

class Score extends Sequelize.Model {}

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
      order: [["score", "ASC"]],
    },
    sequelize,
    tableName: "score",
  }
);

module.exports = Score;
