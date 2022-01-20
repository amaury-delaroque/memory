// Game Data
const cardsGame = [
  { fruit: "red apple", id: 1 },
  { fruit: "banana", id: 2 },
  { fruit: "orange", id: 3 },
  { fruit: "lime", id: 4 },
  { fruit: "pomegranate", id: 5 },
  { fruit: "apricot", id: 6 },
  { fruit: "lemon", id: 7 },
  { fruit: "strawberry", id: 8 },
  { fruit: "green apple", id: 9 },
  { fruit: "peach", id: 10 },
  { fruit: "grape", id: 11 },
  { fruit: "watermelon", id: 12 },
  { fruit: "plum", id: 13 },
  { fruit: "pear", id: 14 },
  { fruit: "red cherry", id: 15 },
  { fruit: "raspberry", id: 16 },
  { fruit: "mango", id: 17 },
  { fruit: "yellow cherry", id: 18 },
];

const createCards = () => {
  const board = document.querySelector(".board");
  cardsGame.map(({ fruit, id }) => {
    const cardElem = document.createElement("div");
    cardElem.classList.add("board__cards", "board__cards--hidden");
    const img = document.createElement("img");
    img.src = "./cards.png";
    cardElem.appendChild(img);
    img.onload = () => {
      trimImage(img, id * 100 - 100, img.width, img.height / cardsGame.length);
    };
    cardElem.addEventListener("click", () => {
      cardElem.classList.toggle("board__cards--hidden");
    });
    return board.appendChild(cardElem);
  });
};

const trimImage = (img, posY, recWidth, recHeight) => {
  const canvas = document.createElement("canvas");
  canvas.width = recWidth;
  canvas.height = recHeight;
  const context = canvas.getContext("2d");
  context.drawImage(img, 0, -posY);
  const newImg = document.createElement("img");
  newImg.src = canvas.toDataURL();
  newImg.classList.add("board__cards__images");
  img.parentNode.replaceChild(newImg, img);
};

window.addEventListener("DOMContentLoaded", createCards);
