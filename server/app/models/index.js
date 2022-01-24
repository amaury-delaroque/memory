const Card = require("./Card");
const Theme = require("./Theme");
const Score = require("./Score");

// Nos associations

// Une card appartient à un et un seul thème
Card.belongsTo(Theme, {
  as: "theme",
  foreignKey: {
    name: "theme_id",
    allowNull: false,
  },
});

// Un theme possède plusieurs cartes
Theme.hasMany(Card, {
  as: "cards",
  foreignKey: "theme_id",
});

module.exports = {
  Card,
  Theme,
  Score,
};
