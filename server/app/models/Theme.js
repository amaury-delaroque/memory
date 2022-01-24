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
    "primary-color": {
      type: Sequelize.TEXT,
      defaultValue: "",
    },
    "second-color": {
      type: Sequelize.TEXT,
      defaultValue: "",
    },
    "light-color": {
      type: Sequelize.TEXT,
      defaultValue: "",
    },
    "dark-color": {
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
