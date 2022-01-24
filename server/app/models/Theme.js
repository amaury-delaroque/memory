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
    primaryColor: {
      type: Sequelize.TEXT,
      defaultValue: "",
    },
    secondColor: {
      type: Sequelize.TEXT,
      defaultValue: "",
    },
    lightColor: {
      type: Sequelize.TEXT,
      defaultValue: "",
    },
    darkColor: {
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
