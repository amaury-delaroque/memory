# A'memory

## Présentation. 

Le grand classique jeu du Memory revisité en HTML / SCSS / JS Vanilla.  
  
Retrouvez les 7 paires de cartes avant la fin du timer.  
Si vous gagnez, enregistrez votre score et votre pseudo :goat: :goat: :goat:  
Si vous perdez, retentez votre chance :smiling_imp: :smiling_imp: 

[Application déployer sur Netlify](https://amemory.netlify.app) 

[Serveur déployé sur Heroku](https://amaury-memory-back.herokuapp.com/)

## Technologies
<h3 align="center">
 Front-end
</h3>
<div align="center">
<br>
        <img src="https://img.shields.io/badge/HTML-20232A?style=for-the-badge&logo=html&logoColor=61DAFB" />
        <img src="https://img.shields.io/badge/JS-593D88?style=for-the-badge&logo=JS&logoColor=white" />
        <img src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white" />
        <img src="https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white" />

</div>
<br>
<h3 align="center">
 Back-end
</h3>
<div align="center">
<br>
        <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
        <img src="https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white" />
        <img src="https://img.shields.io/badge/Express-F8F8FF?style=for-the-badge&logo=express&logoColor=61DAFB" />
        <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" />
        <img src="https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white" />
</div>
<br>

## Installation
 ###Création de la base de donnée PostgreSQL via le terminal de commande. 
```bash
$ psql postgres
postgres=> CREATE ROLE <role> WITH LOGIN PASSWORD '<password>';
postgres=> CREATE DATABASE <database> OWNER <role>;
postgres=> \q

$ psql <database>
<database>=>\i ./server/data/import.sql;
<database>=>\i ./server/data/seeding.sql;
```
###Création d'un fichier .env conformément au fichier .env.example pour ajouter les variables d'environnement.   
```bash
$ cp .env.example .env
$ nano .env
```
###Lancer le serveur
```bash
$ npm i -y
$ npm start
```
###Lancer le client
```bash
$ cd client
$ open index.html
```
###Editer le style depuis le préprocesseur SASS
```bash
$ sass --watch ./client/public/css/style.scss ./client/public/css/index.css
```
