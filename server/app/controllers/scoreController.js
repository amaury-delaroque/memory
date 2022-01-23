const { Score } = require("../models");
const sanitizer = require("sanitizer");

const scoreController = {
  getAllScores: async (_, res) => {
    try {
      const scores = await Score.findAll();
      res.json(scores);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  createScore: async (req, res) => {
    try {
      const sanitizedString = sanitizer.sanitize(req.body.pseudo.trim(""));
      req.body.pseudo = sanitizedString;
      await Score.create(req.body);
      res.json({ success: "Score enregistré" });
    } catch (err) {
      res
        .status(500)
        .json({ error: "Une erreur est survenue lors de l'enregistrement" });
    }
  },
};

module.exports = scoreController;
