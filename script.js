//start section
const gameBody = document.querySelector(".wrapper");
const startBody = document.querySelector(".container");

let interval = null;

document.getElementById("playBtn").addEventListener("click", () => {
  startBody.style.display = "none";
  gameBody.style.display = "block";

  interval = setInterval(startTimer, 1000);
});

const cards = document.querySelectorAll(".card");

//reset button
const buttonReset = document.getElementById("resetBtn");
buttonReset.addEventListener("click", () => {
  cards.forEach((card) => {
    card.classList.remove("flip"); //will make all cards turn back down
  });
  //restart moves
  move = 0;
  moves.innerHTML = `Moves: 0`;

  //shuffle cards
  shuffleCard();

  //reset timer
  seconds = 0;
  mins = 0;
  timer.innerHTML = `Time: ${minValue}:${secValue}`;
  interval = setInterval(startTimer, 1000);
});

const timer = document.getElementById("timer");
const moves = document.getElementById("moves");

let seconds = 0;
let mins = 0;

let move = 0;

//timer function
function startTimer() {
  seconds++; //not working

  if (seconds >= 60) {
    mins++;
    seconds = 0;
  }

  let secValue = seconds < 10 ? `0${seconds}` : seconds;
  let minValue = mins < 10 ? `0${mins}` : mins;
  timer.innerHTML = `Time: ${minValue}:${secValue}`;
}

const movesCount = () => {
  move++;
  moves.innerHTML = `Moves: ${move}`;
};

let matched = 0;
let cardOne, cardTwo;
let disableDeck = false;

function flipCard(e) {
  let clickedCard = e.target;

  if (cardOne !== clickedCard && !disableDeck) {
    clickedCard.classList.add("flip");

    if (!cardOne) {
      return (cardOne = clickedCard);
    }

    cardTwo = clickedCard;
    disableDeck = true;
    let cardOneImg = cardOne.querySelector(".back-view img").src,
      cardTwoImg = cardTwo.querySelector(".back-view img").src;
    matchCards(cardOneImg, cardTwoImg);
  }
  movesCount(); //calling to increase moves count
}

function matchCards(img1, img2) {
  if (img1 === img2) {
    matched++;
    if (matched == 8) {
      setTimeout(() => {
        return shuffleCard();
      }, 200);
    }
    cardOne.removeEventListener("click", flipCard);
    cardTwo.removeEventListener("click", flipCard);
    cardOne = cardTwo = "";
    return (disableDeck = false);
  }
  setTimeout(() => {
    cardOne.classList.add("shake");
    cardTwo.classList.add("shake");
  }, 200);

  setTimeout(() => {
    cardOne.classList.remove("shake", "flip");
    cardTwo.classList.remove("shake", "flip");
    cardOne = cardTwo = "";
    disableDeck = false;
  }, 600); //time to flip cards
}

function shuffleCard() {
  matched = 0;
  disableDeck = false;
  cardOne = cardTwo = "";
  let arr = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6];
  arr.sort(() => (Math.random() > 0.5 ? 1 : -1));
  cards.forEach((card, i) => {
    card.classList.remove("flip");
    let imgTag = card.querySelector(".back-view img");
    imgTag.src = `images/img-${arr[i]}.png`;
    card.addEventListener("click", flipCard);
  });
}

shuffleCard();

cards.forEach((card) => {
  card.addEventListener("click", flipCard);
});

//startTimer();
