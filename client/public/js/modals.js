const modals = {
  /**
   * Ouverture de modale
   * @param {elem} modal  modale à fermer
   */
  close: (modal) => {
    document.querySelector(".header__themes__button").disabled = false;
    modal.classList.add("modal__close");
  },
  /**
   *
   * @param {elem} modal modale à ouvrir
   */
  open: (modal) => {
    /* On empêche l'utilisateur de changer de thème hors des parties */
    document.querySelector(".header__themes__button").disabled = true;
    modal.classList.remove("modal__close");
  },
  /* Nos 3 modals séléctionnées par l'ID */
  modalReplay: document.querySelector("#modal__replay"),
  modalHome: document.querySelector("#modal__home"),
  modalRecord: document.querySelector("#modal__record"),
  /**
   *
   * @param {elem} modal modale qui va recevoir le tableau de scores
   */
  addScoresFromApiToTable: async (modal) => {
    //on récupère les scores de la BDD
    const scores = await api.getAllScores();
    const modalScore = modal.querySelector(".modal__body__score");
    const table = document.querySelector("#score-table");
    const tableClone = table.content.cloneNode(true);
    //on construit chaque ligne de notre tableau avec les infos d'un score
    scores &&
      scores.map((score, index) => {
        const tableRow = document.createElement("tr");
        const position = document.createElement("td");
        position.textContent = index + 1;
        tableRow.appendChild(position);
        const date = document.createElement("td");
        //On récupere juste la date du format ISO
        date.textContent = score.createdAt.split("T")[0];
        tableRow.appendChild(date);
        const pseudo = document.createElement("td");
        // Si le pseudo est trop long on le coupe à 12 caractères.
        pseudo.textContent =
          score.pseudo.length > 12
            ? `${score.pseudo.slice(0, 12)} ...`
            : score.pseudo;
        tableRow.appendChild(pseudo);
        const temps = document.createElement("td");
        // le temps enregistré est en millisecondes, on le divise par 1000 our avoir notre score en secondes
        temps.textContent = `${score.score / 1000}s`;
        tableRow.appendChild(temps);
        tableRow.classList.add("score__table__body__row");
        const tableBody = tableClone.querySelector(".score__table__body");
        //on accroche la ligne au tableau cloné
        tableBody.appendChild(tableRow);
        // On recherche le score  que l'on vient d'enregistrer et on lui rajoute une classe pour le rendre identifiable
        if (
          score !== 0 &&
          game.pseudo === score.pseudo &&
          game.score === score.score
        ) {
          tableRow.classList.add("my-score");
        }
      });
    // On vide le contenu du tableau de la modale et on le remplace par le clone
    modalScore.textContent = "";
    modalScore.appendChild(tableClone);
    const myScore = modalScore.querySelector(".my-score");
    // Si on trouve notre dernier score, on scroll dans le tableau pour le mettre en évidence
    myScore?.scrollIntoView({
      block: "center",
    });
  },
};
