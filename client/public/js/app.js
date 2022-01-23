const game = {
  init: () => {
    modals.open(modals.modalHome);
    modals.addScoresFromApiToTable(modals.modalHome);
    const modalBtn = modals.modalHome.querySelector("#modal__home__btn");
    modalBtn.addEventListener("click", () => {
      modals.close(modals.modalHome);
      game.initCards();
      game.setTimer();
      game.isInit = true;
    });
  },
  cardsGame: [
    { name: "red apple", id: 1 },
    { name: "banana", id: 2 },
    { name: "orange", id: 3 },
    { name: "lime", id: 4 },
    { name: "pomegranate", id: 5 },
    { name: "apricot", id: 6 },
    { name: "lemon", id: 7 },
    { name: "strawberry", id: 8 },
    { name: "green apple", id: 9 },
    { name: "peach", id: 10 },
    { name: "grape", id: 11 },
    { name: "watermelon", id: 12 },
    { name: "plum", id: 13 },
    { name: "pear", id: 14 },
    { name: "red cherry", id: 15 },
    { name: "raspberry", id: 16 },
    { name: "mango", id: 17 },
    { name: "yellow cherry", id: 18 },
  ],
  theme: {
    name: "fruit",
    id: 1,
    sprite: "cards.png",
  },
  isInit: false,
  pair: [],
  checkingCardPair: false,
  pairFind: [],
  maxTime: 60000, // 1m en ms pour le temps d'une partie
  timer: 0,
  pseudo: "",
  score: 0,
  isGameWon: false,
  initCards: () => {
    const cards = [...game.cardsGame];
    const randomizedAndSliceCards = cards
      .sort(() => Math.random() - 0.5)
      .slice(0, 7);
    const randomCardsGame = [
      ...randomizedAndSliceCards,
      ...randomizedAndSliceCards,
    ].sort(() => Math.random() - 0.5);
    game.timer = game.maxTime;
    game.createCards(randomCardsGame, game.theme);
  },
  createCards: (cards, theme) => {
    const board = document.querySelector(".board");
    board.textContent = "";
    cards.map(({ name, id }, index) => {
      const cardElem = document.createElement("div");
      cardElem.classList.add("board__cards");
      const img = document.createElement("img");
      const frontCard = document.createElement("div");
      frontCard.classList.add("board__cards--front");
      const backCard = document.createElement("div");
      backCard.classList.add("board__cards--back");
      img.src = `./public/images/${theme.sprite}`;
      img.alt = name;
      frontCard.appendChild(img);
      cardElem.appendChild(backCard);
      cardElem.appendChild(frontCard);
      board.appendChild(cardElem);
      cardElem.dataset.id = id;
      cardElem.dataset.index = index;
      img.onload = () => {
        game.trimImage(
          img,
          id * 100 - 100,
          img.width,
          img.height / game.cardsGame.length
        );
      };
      cardElem.addEventListener("click", game.onClickCard);
      return board.appendChild(cardElem);
    });
  },
  // Fonction pour rogner un sprite pour obtenir une image l'image
  trimImage: (img, posY, recWidth, recHeight) => {
    const canvas = document.createElement("canvas");
    canvas.width = recWidth;
    canvas.height = recHeight;
    const context = canvas.getContext("2d");
    context.drawImage(img, 0, -posY);
    const newImg = document.createElement("img");
    newImg.src = canvas.toDataURL();
    newImg.classList.add("board__cards__images");
    img.parentNode.replaceChild(newImg, img);
  },
  onClickCard: (e) => {
    if (!game.checkingCardPair) {
      const card = e.target.closest(".board__cards");
      if (!card.classList.contains("board__cards--reveal")) {
        card.classList.add("board__cards--reveal");
        game.pair.push(card.dataset);
      }
      if (game.pair.length === 2) {
        if (
          game.pair[0].id === game.pair[1].id &&
          game.pair[0].index !== game.pair[1].index
        ) {
          game.score++;
          //remove listenner sur les 2 cartes
          const cards = document.querySelectorAll(".board__cards");
          for (let i = 0; i < cards.length; i++) {
            if (cards[i].dataset.id === game.pair[0].id)
              cards[i].removeEventListener("click", game.onClickCard);
          }
          game.pairFind.push(game.pair[0].id);
          game.checkVictory();
          game.pair = [];
        } else {
          // on enlève la classe reveal sur les deux cartes après 1,5s;
          //on empêche l'utilisateur de cliquer pendantla vérification des cartes
          game.checkingCardPair = true;
          const pair = [...game.pair];
          game.pair = [];
          setTimeout(() => {
            const cards = document.querySelectorAll(".board__cards");
            for (let i = 0; i < cards.length; i++) {
              if (
                cards[i].dataset.index === pair[0].index ||
                cards[i].dataset.index === pair[1].index
              ) {
                cards[i].classList.remove("board__cards--reveal");
              }
            }
            game.checkingCardPair = false;
          }, 800);
        }
      }
    }
  },
  checkVictory: () => {
    if (game.pairFind.length === 7) {
      game.isGameWon = true;
      setTimeout(() => {
        game.recordScore();
      }, 1000);
    }
  },
  setTimer: () => {
    //revoir le compteur en comparant les timestampz, de date pour être plus précis
    const timerElem = document.querySelector(".timer__elapsed");
    const timerInterval = setInterval(() => {
      game.timer -= 10;
      timerElem.style.width = `${100 - (game.timer * 100) / game.maxTime}%`;
      if (game.isGameWon) clearInterval(timerInterval);
      if (game.timer <= 0 && game.isInit && !game.isGameWon) {
        clearInterval(timerInterval);
        game.endGame("Perdu!");
      }
    }, 10);
  },
  recordScore: () => {
    game.score = game.maxTime - game.timer;
    game.timer = 0;
    modals.open(modals.modalRecord);
    const modalForm = modals.modalRecord.querySelector("#modal__record__form");
    const inputPseudo = modalForm.querySelector("#pseudo");
    inputPseudo.value = game.pseudo;
    inputPseudo.focus();
    inputPseudo.addEventListener("change", (e) => {
      game.pseudo = e.target.value;
    });
    modalForm.addEventListener("submit", game.handleCreateScore);
  },
  endGame: (message) => {
    document.documentElement.style.setProperty(
      "--primaryColor",
      `#${Math.floor(Math.random() * 16777215).toString(16)}`
    );
    const modalBtn = modals.modalReplay.querySelector("#modal__replay__btn");
    const modalText = modals.modalReplay.querySelector("#modal__replay__text");
    const modalTitle = modals.modalReplay.querySelector(
      ".modal__header__title"
    );
    modalText.textContent = "Bravo, vous être entrer dans notre classement.";
    if (message === "Perdu!") {
      modalText.textContent =
        "Retentez votre chance pour entrer dans le classement.";
    }
    // Faire switch case pour afficher
    modalTitle.textContent = message;
    modalBtn.addEventListener("click", game.replayGame);
    modals.open(modals.modalReplay);
    modals.addScoresFromApiToTable(modals.modalReplay);
  },
  replayGame: () => {
    modals.close(modals.modalReplay);
    game.score = 0;
    game.pair = [];
    game.checkingCardPair = false;
    game.isGameWon = false;
    game.pairFind = [];
    game.initCards();
    game.setTimer();
  },
  handleCreateScore: async (event) => {
    event.preventDefault();
    const record = await api.storeScore(game.score, game.pseudo);
    if (record.success) {
      const errorElem = modals.modalRecord.querySelector(".error");
      errorElem.textContent = "";
      modals.close(modals.modalRecord);
      game.endGame(record.success);
    } else {
      const errorElem = modals.modalRecord.querySelector(".error");
      errorElem.textContent = record.error;
    }
  },
};

window.addEventListener("DOMContentLoaded", game.init);
