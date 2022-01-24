const { Theme } = require("../models");
const themeController = {
  getAllThemes: async (_, res) => {
    console.log("je passe dans le controller");
    try {
      console.log(Theme);
      const themes = await Theme.findAll();
      console.log("themes", themes);

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
