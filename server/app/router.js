const express = require("express");
const router = express.Router();
const scoreController = require("./controllers/scoreController");
const themeController = require("./controllers/themeController");

router.get("/", (req, res) => res.render("index"));
router
  .route("/api/v1/scores")
  .get(scoreController.getAllScores)
  .post(scoreController.createScore);

router.route("/api/v1/themes").get(themeController.getAllThemes);
router.route("/api/v1/themes/:id").get(themeController.getOneTheme);

module.exports = router;
