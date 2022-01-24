const modals = {
  close: (modal) => {
    document.querySelector(".header__themes__button").disabled = false;
    modal.classList.add("modal__close");
  },
  open: (modal) => {
    document.querySelector(".header__themes__button").disabled = true;
    modal.classList.remove("modal__close");
  },
  modalReplay: document.querySelector("#modal__replay"),
  modalHome: document.querySelector("#modal__home"),
  modalRecord: document.querySelector("#modal__record"),

  addScoresFromApiToTable: async (modal) => {
    const scores = await api.getAllScores();
    const modalScore = modal.querySelector(".modal__body__score");
    const table = document.querySelector("#score-table");
    const tableClone = table.content.cloneNode(true);
    scores &&
      scores.map((score, index) => {
        const tableRow = document.createElement("tr");
        const position = document.createElement("td");
        position.textContent = index + 1;
        tableRow.appendChild(position);
        const date = document.createElement("td");
        date.textContent = score.createdAt.split("T")[0];
        tableRow.appendChild(date);
        const pseudo = document.createElement("td");
        pseudo.textContent =
          score.pseudo.length > 12
            ? `${score.pseudo.slice(0, 12)} ...`
            : score.pseudo;
        tableRow.appendChild(pseudo);
        const temps = document.createElement("td");
        temps.textContent = `${score.score / 1000}s`;
        tableRow.appendChild(temps);
        tableRow.classList.add("score__table__body__row");
        const tableBody = tableClone.querySelector(".score__table__body");
        tableBody.appendChild(tableRow);
        if (
          score !== 0 &&
          game.pseudo === score.pseudo &&
          game.score === score.score
        ) {
          tableRow.classList.add("my-score");
        }
      });

    modalScore.textContent = "";
    modalScore.appendChild(tableClone);
    const myScore = modalScore.querySelector(".my-score");
    myScore?.scrollIntoView({
      block: "center",
    });
  },
};
