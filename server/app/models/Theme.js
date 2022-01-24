const Sequelize = require("sequelize");

const sequelize = require("../database");

class Theme extends Sequelize.Model {}

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
      include: ["cards"],
    },
    sequelize,
    tableName: "theme",
  }
);

module.exports = Theme;
