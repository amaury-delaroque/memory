const modals = {
  close: (modal) => {
    modal.classList.add("modal__close");
  },
  open: (modal) => {
    modal.classList.remove("modal__close");
    modals.getScores(modal, fakeScore);
  },
  modalReplay: document.querySelector("#modal__replay"),
  modalHome: document.querySelector("#modal__home"),
  getScores: (modal, scores) => {
    const modalScore = modal.querySelector(".modal__body__score");
    const table = document.querySelector("#score-table");
    const tableClone = table.content.cloneNode(true);
    scores.map((score) => {
      const tableRow = document.createElement("tr");
      for (const property in score) {
        const cell = document.createElement("td");
        cell.textContent = score[property];
        cell.classList.add("score__table__body__cell");
        tableRow.appendChild(cell);
      }
      tableRow.classList.add("score__table__body__row");
      const tableBody = tableClone.querySelector(".score__table__body");
      tableBody.appendChild(tableRow);
    });
    modalScore.textContent = "";
    modalScore.appendChild(tableClone);
  },
};
const fakeScore = [
  {
    position: 1,
    date: 1345677323,
    pseudo: "aaa",
    temps: 4565456776,
  },
  {
    position: 2,
    date: 1345677323,
    pseudo: "bbb",
    temps: 4565456776,
  },
  {
    position: 3,
    date: 1345677323,
    pseudo: "edfr",
    temps: 4565456776,
  },
  {
    position: 4,
    date: 1345677323,
    pseudo: "sdfgh",
    temps: 4565456776,
  },
  {
    position: 5,
    date: 1345677323,
    pseudo: "scvfgh",
    temps: 4565456776,
  },
  {
    position: 6,
    date: 1345677323,
    pseudo: "qdfvfgtr",
    temps: 4565456776,
  },
  {
    position: 7,
    date: 1345677323,
    pseudo: "vfdbd",
    temps: 4565456776,
  },
  {
    position: 8,
    date: "12/02/2012",
    pseudo: "dbgthgrf",
    temps: "30,00s",
  },
  {
    position: 9,
    date: 1345677323,
    pseudo: "efdf",
    temps: 4565456776,
  },
];
