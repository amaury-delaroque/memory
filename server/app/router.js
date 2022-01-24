const express = require("express");
const router = express.Router();
const scoreController = require("./controllers/scoreController");
const themeController = require("./controllers/themeController");

//route / on envoie le fichier index.html
router.get("/", (req, res) => res.render("index"));
//on redirige les requêtes en fonction du path et de la méthode associés vers le controlleur à utilisé.
// on récupere tous les scores en GET, on enregistre un score en POST
router
  .route("/api/v1/scores")
  .get(scoreController.getAllScores)
  .post(scoreController.createScore);

// on récupère tous les thèmes stockés en base de données.
router.route("/api/v1/themes").get(themeController.getAllThemes);
router.route("/api/v1/themes/:id").get(themeController.getOneTheme);

// on exporte le routeur pour l'utiliser dans le fichier index.js
module.exports = router;
