const Card = require("./Card");
const Theme = require("./Theme");
const Score = require("./Score");

// Nos associations
Card.belongsTo(Theme, {
  as: "theme",
  foreignKey: {
    name: "theme_id",
    allowNull: false,
  },
});

Theme.hasMany(Card, {
  as: "cards",
  foreignKey: "theme_id",
});

module.exports = {
  Card,
  Theme,
  Score,
};
