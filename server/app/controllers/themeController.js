const { Theme } = require("../models");

const themeController = {
  /**
   * Récuperer tous les thèmes
   * @param {req} _ requête inutilisé
   * @param {res} res objet reponse pour répondre à la requête
   */
  getAllThemes: async (_, res) => {
    try {
      // Les modèles étendent de la class Sequelize qui nous met à disposition une méthode findAll pour récupérer tous les thèmes
      const themes = await Theme.findAll();
      // on répond à la requête avec un objet json contenant le tableau des thémes et de leurs cartes associées par défaut (cf. Theme.js)
      res.json(themes);
    } catch (err) {
      //En cas d'erreur on envoie un status 500 et l'erreur associé
      res.status(500).json(err);
    }
  },

  /**
   * Récupérer un thème
   * @param {req} req objet requête a une propriété param avec l'id du thème requêté
   * @param {res} res objet reponse pour répondre à la requête
   */
  getOneTheme: async (req, res) => {
    //on récupere l'id du thème stocké dans les params
    const themeId = req.params.id;
    try {
      //On appelle la méthode findByPk étendue de la classe Sequelize
      const theme = Theme.findByPk(themeId);
      // On répond à la requête avec un objet JSON contenant le thème trouvé
      res.json(theme);
    } catch (err) {
      //En cas d'erreur on envoie un status 500 et l'erreur associé
      res.status(500).json(err);
    }
  },
};

module.exports = themeController;
