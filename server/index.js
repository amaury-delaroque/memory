require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./app/router");

// A Modifier pour la sécurité a voir pour la suite
app.use(cors(process.env.CLIENT_URL || process.env.CLIENT_LOCAL));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(express.json());

app.use(router);

app.listen(process.env.PORT, () => {
  console.log(`server running on http://localhost:${process.env.PORT}/`);
});
