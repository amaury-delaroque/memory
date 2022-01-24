const game = {
  init: () => {
    /* on ouvre la modale à l'ouverture de la page et on affiche les scores */
    modals.addScoresFromApiToTable(modals.modalHome);
    modals.open(modals.modalHome);
    const modalBtn = modals.modalHome.querySelector("#modal__home__btn");
    game.createThemesList();
    modalBtn.addEventListener("click", () => {
      modals.close(modals.modalHome);
      game.initCards();
      game.setTimer();
      game.isInit = true;
    });
  },
  themes: [],
  theme: {},
  isInit: false,
  pair: [],
  checkingCardPair: false,
  pairFind: [],
  maxTime: 60000, // 1m en ms pour le temps d'une partie
  timer: 0,
  pseudo: "",
  score: 0,
  isGameWon: false,
  /**
   * Fonction qui choisit 7 aléatoire aléatoirement
   * on crée le tableau de paires en copiant 2 fois les cartes choisit, puis on remélange et on crée notre tapis de jeu
   */
  initCards: () => {
    const cards = [...game.theme.cards];
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
  /**
   *
   * @param {array} cards le jeu de cartes mélangées dans la fonction initCard()
   * @param {obj} theme le thème séléctionné par l'utilisateur ou le thème par défaut
   */
  createCards: (cards, theme) => {
    const board = document.querySelector(".board");
    //on vide le tapis de jeu
    board.textContent = "";
    cards.map(({ name, id }, index) => {
      // On crée les faces avants et arrières de chaque cartes
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
      //au chargement de la sprite, on se postionne sur la partie de l'image qui correspond à la carte associée
      img.onload = () => {
        game.trimImage(
          img,
          id * (img.height / game.theme.cards.length) -
            img.height / game.theme.cards.length,
          img.width,
          img.height / game.theme.cards.length
        );
      };
      cardElem.addEventListener("click", game.onClickCard);
      return board.appendChild(cardElem);
    });
  },
  /**
   * Fonction pour rogner une sprite afin d'obtenir une image
   * @param {elem} img l'élement image que l'on crée et qui contient la sprite
   * @param {integer} posY la postion Y de l'image dans le sprite correspond à l'id de la carte multiplié par la hauteur du sprite divisé par le nombre d'image
   * @param {integer} recWidth
   * @param {integer} recHeight
   */
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
  /**
   *
   * @param {event} e
   */
  onClickCard: (e) => {
    if (!game.checkingCardPair) {
      /* Si on est pas en train de vérifier une paire de cartes, on retourne la carte séléctionné (si elle ne l'est pas déjà)*/
      const card = e.target.closest(".board__cards");
      if (!card.classList.contains("board__cards--reveal")) {
        card.classList.add("board__cards--reveal");
        game.pair.push(card.dataset);
      }
      /* Si on a retourné 2 cartes on les compare */
      if (game.pair.length === 2) {
        /* Si nos on carte on le même id mais un index différent on gagne une paire */
        if (
          game.pair[0].id === game.pair[1].id &&
          game.pair[0].index !== game.pair[1].index
        ) {
          //remove listenner sur les 2 cartes
          const cards = document.querySelectorAll(".board__cards");
          for (let i = 0; i < cards.length; i++) {
            if (cards[i].dataset.id === game.pair[0].id)
              cards[i].removeEventListener("click", game.onClickCard);
          }
          game.pairFind.push(game.pair[0].id);
          //on vérifie si on a gagné et on vide notre paire de cartes
          game.checkVictory();
          game.pair = [];
        } else {
          //on empêche l'utilisateur de cliquer pendantla vérification des cartes
          game.checkingCardPair = true;
          const pair = [...game.pair];
          game.pair = [];
          // on enlève la classe reveal sur les deux cartes après 0.8s;
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
            //on redonne la possibilité de cliquer sur les cartes
            game.checkingCardPair = false;
          }, 800);
        }
      }
    }
  },
  /*On vérifie si on a gagné , pour ça on regarde si on a stocké l'index de chacunes des 7 paires dans notre tableau pairFind */
  checkVictory: () => {
    if (game.pairFind.length === 7) {
      /* SI c'est ok, on a gagné, on redirige vers la fenêtre des scores */
      game.isGameWon = true;
      setTimeout(() => {
        game.recordScore();
      }, 1000);
    }
  },
  setTimer: () => {
    const timerElem = document.querySelector(".timer__elapsed");
    /* On affiche notre temps écoulé en fonction du temps restant et du temps total du timer */
    const timerInterval = setInterval(() => {
      game.timer -= 10;
      timerElem.style.width = `${100 - (game.timer * 100) / game.maxTime}%`;
      // Si on gagne ou si TimeOut on détruit l'intervalle.
      if (game.isGameWon) clearInterval(timerInterval);
      if (game.timer <= 0 && game.isInit && !game.isGameWon) {
        clearInterval(timerInterval);
        game.endGame("Perdu!");
      }
    }, 10);
  },
  recordScore: () => {
    // Le score = le temps restant moins le temps total, puis on reset le timer
    game.score = game.maxTime - game.timer;
    game.timer = 0;
    modals.open(modals.modalRecord);
    const modalForm = modals.modalRecord.querySelector("#modal__record__form");
    const inputPseudo = modalForm.querySelector("#pseudo");
    //on crée un champs contrôlé pour l'input de notre formulaire d'enregistrement de pseudo
    inputPseudo.value = game.pseudo;
    inputPseudo.focus();
    inputPseudo.addEventListener("change", (e) => {
      game.pseudo = e.target.value;
    });
    modalForm.addEventListener("submit", game.handleCreateScore);
  },
  endGame: (message) => {
    //Modale de fin de parti, affiche enregistrement effectué ou perdu en fonction du résultat de la partie
    const modalBtn = modals.modalReplay.querySelector("#modal__replay__btn");
    const modalText = modals.modalReplay.querySelector("#modal__replay__text");
    const modalTitle = modals.modalReplay.querySelector(
      ".modal__header__title"
    );
    modalText.textContent = "Bravo, tu viens d'entrer dans notre classement.";
    if (message === "Perdu!") {
      modalText.textContent =
        "Retente ta chance pour entrer dans le classement.";
    }
    modalTitle.textContent = message;
    modalBtn.addEventListener("click", game.replayGame);
    modals.open(modals.modalReplay);
    modals.addScoresFromApiToTable(modals.modalReplay);
  },
  replayGame: () => {
    // Fonction pour lancer une nouvelle partie. On réinitialise nos paramètres, on bats les cartes et on enclenche le minuteur
    modals.close(modals.modalReplay);
    game.score = 0;
    game.isGameWon = false;
    game.pair = [];
    game.checkingCardPair = false;
    game.pairFind = [];
    game.initCards();
    game.setTimer();
  },
  handleCreateScore: async (event) => {
    //On soumet le formulaire de score on agit en fonction de la reception d'un succés ou erreur API
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
  createThemesList: async () => {
    // on  crée le menu des thèmes, on appelle les thèmes de la bdd
    const themes = await api.getAllThemes();
    game.themes = themes;
    //par défaut theme 1
    game.theme = game.themes[0];
    const themeButton = document.querySelector(".header__themes__button");
    const themeContainer = document.querySelector(".header__themes__container");
    themeButton.addEventListener("click", () =>
      themeContainer.classList.toggle("header__themes__container--open")
    );
    themes?.map((theme) => {
      const themeElem = document.createElement("li");
      const title = document.createElement("h3");
      title.textContent = theme.name;
      themeElem.appendChild(title);
      themeElem.dataset.id = theme.id;
      themeElem.classList.add("header__themes__container__li");
      themeElem.addEventListener("click", () => {
        //on cherche le thème sélectionné
        const foundTheme = game.themes.find((gameTheme) => {
          return gameTheme.id === +themeElem.dataset.id;
        });
        if (foundTheme) {
          game.theme = foundTheme;
          game.isGameWon = true;
          game.timer = 0;
          themeContainer.classList.toggle("header__themes__container--open");
          // on applique les couleurs de la palette au document au travers des variables css puis on relance la partie
          setTimeout(() => {
            document.documentElement.style.setProperty(
              "--primaryColor",
              game.theme.primary_color
            );
            document.documentElement.style.setProperty(
              "--secondColor",
              game.theme.second_color
            );
            document.documentElement.style.setProperty(
              "--lightColor",
              game.theme.light_color
            );
            document.documentElement.style.setProperty(
              "--darkColor",
              game.theme.dark_color
            );
            game.replayGame();
          }, 500);
        }
      });
      themeElem.style.color = theme.primary_color;
      themeContainer.appendChild(themeElem);
    });
  },
};
// Quand tous éléments du DOM sont chargés on lance notre notre fonction game.init()
window.addEventListener("DOMContentLoaded", game.init);
