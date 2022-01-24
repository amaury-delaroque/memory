require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./app/router");

//On paramètre les cors pour autoriser les connexions depuis notre client local ou hébergé
app.use(cors(process.env.CLIENT_URL || process.env.CLIENT_LOCAL));

//On utilise ces 2 middlewares pour décoder le body des requêtes POST
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//on sert les fichiers statiques depuis le dossier public
app.use(express.static(__dirname + "/public"));
// On envoie les requêtes envoyées au serveur vers le router
app.use(router);

app.listen(process.env.PORT, () => {
  console.log(`server running on http://localhost:${process.env.PORT}/`);
});
