const { Theme } = require("../models");
const themeController = {
  getAllThemes: async (_, res) => {
    try {
      const themes = await Theme.findAll();
      res.json(themes);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getOneTheme: async (req, res) => {
    const themeId = req.params.id;
    try {
      const theme = Theme.findByPk(themeId);
      res.json(theme);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = themeController;
