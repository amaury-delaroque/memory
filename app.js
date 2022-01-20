const Game = {
  init: () => {
    Game.initCards();
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
    sprite: "./cards.png",
  },
  pair: [],
  checkingCardPair: false,
  pairFind: [],
  initCards: () => {
    const cards = [...Game.cardsGame];
    const randomizedAndSliceCards = cards
      .sort(() => Math.random() - 0.5)
      .slice(cards.length / 2);
    const randomCardsGame = [
      ...randomizedAndSliceCards,
      ...randomizedAndSliceCards,
    ].sort(() => Math.random() - 0.5);
    Game.createCards(randomCardsGame, Game.theme);
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
      img.src = theme.sprite;
      img.alt = name;
      frontCard.appendChild(img);
      cardElem.appendChild(backCard);
      cardElem.appendChild(frontCard);
      board.appendChild(cardElem);
      cardElem.dataset.id = id;
      cardElem.dataset.index = index;
      img.onload = () => {
        Game.trimImage(
          img,
          id * 100 - 100,
          img.width,
          img.height / Game.cardsGame.length
        );
      };
      cardElem.addEventListener("click", Game.onClickCard);
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
    if (!Game.checkingCardPair) {
      const card = e.target.closest(".board__cards");
      Game.pair.push(card.dataset);
      !card.classList.contains("board__cards--reveal") &&
        card.classList.add("board__cards--reveal");
      if (Game.pair.length === 2) {
        if (
          Game.pair[0].id === Game.pair[1].id &&
          Game.pair[0].index !== Game.pair[1].index
        ) {
          //set score +1
          //remove listenner sur les 2 cartes
          const cards = document.querySelectorAll(".board__cards");
          for (let i = 0; i < cards.length; i++) {
            if (cards[i].dataset.id === Game.pair[0].id)
              cards[i].removeEventListener("click", Game.onClickCard);
          }
          Game.pairFind.push(Game.pair[0].id);
          Game.checkVictory();
          Game.pair = [];
        } else {
          // on enlève la classe reveal sur les deux cartes après 1,5s;
          //on empêche l'utilisateur de cliquer pendantla vérification des cartes
          Game.checkingCardPair = true;
          setTimeout(() => {
            const cards = document.querySelectorAll(".board__cards");
            for (let i = 0; i < cards.length; i++) {
              if (
                cards[i].dataset.index === Game.pair[0].index ||
                cards[i].dataset.index === Game.pair[1].index
              ) {
                cards[i].classList.remove("board__cards--reveal");
              }
            }
            Game.pair = [];
            Game.checkingCardPair = false;
          }, 1500);
        }
      }
    }
  },
  checkVictory: () => {
    if (Game.cardsGame.length === Game.pairFind.length * 2)
      setTimeout(() => alert("GAGNÉ"), 1000);
  },
};

window.addEventListener("DOMContentLoaded", Game.init);
