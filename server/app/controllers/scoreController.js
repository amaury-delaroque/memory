const { Score } = require("../models");
const sanitizer = require("sanitizer");

const scoreController = {
  /**
   * Récuperer tous les scores
   * @param {req} _ requête inutilisé
   * @param {res} res objet reponse pour répondre à la requête
   */
  getAllScores: async (_, res) => {
    try {
      // Les modèles étendent de la class Sequelize qui nous met à disposition une méthode findAll pour récupérer tous les scores
      const scores = await Score.findAll();
      // on répond à la requête avec un objet json contenant le tableau des scores
      res.json(scores);
    } catch (err) {
      //En cas d'erreur on envoie un status 500 et l'erreur associé
      res.status(500).json(err);
    }
  },

  /**
   * Enregistrer un score
   * @param {req} req objet requête a une propriété body avec les données à enregistrer
   * @param {res} res objet reponse pour répondre à la requête
   */
  createScore: async (req, res) => {
    try {
      //on utilise le module sanitizer pour nettoyer le champ pseudo du body afin d'éviter l'insertion de balise script, img, etc ...
      //C'est une information entrée par l'utilisateur, et par défaut, on ne peut pas lui faire confiance
      const sanitizedString = sanitizer.sanitize(req.body.pseudo.trim(""));
      req.body.pseudo = sanitizedString;
      //On appelle la méthode create étendue de la classe Sequelize
      await Score.create(req.body);
      // On répond à la requête avec un objet JSON contenant un message success
      res.json({ success: "Score enregistré" });
    } catch (err) {
      //En cas d'erreur, On répond à la requête avec un objet JSON contenant le message d'erreur
      res
        .status(500)
        .json({ error: "Une erreur est survenue lors de l'enregistrement" });
    }
  },
};

module.exports = scoreController;
