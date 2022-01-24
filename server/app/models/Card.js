const Sequelize = require("sequelize");

const sequelize = require("../database");

class Card extends Sequelize.Model {}

Card.init(
  {
    name: {
      type: Sequelize.TEXT,
      defaultValue: "",
    },
    id: {
      type: Sequelize.INTEGER,
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
      order: [["id", "ASC"]],
    },
    sequelize,
    tableName: "card",
  }
);

module.exports = Card;
