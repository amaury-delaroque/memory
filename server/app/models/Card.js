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
      include: ["theme"],
      order: [["id", "ASC"]],
    },
    sequelize,
    tableName: "card",
  }
);

module.exports = Card;
