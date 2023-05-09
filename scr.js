//start section
const gameBody = document.querySelector(".wrapper");
const startBody = document.querySelector(".container");

document.getElementById("playBtn").addEventListener("click", () => {
  startBody.style.display = "none";
  gameBody.style.display = "block";
});

//
const cards = document.querySelectorAll(".card");

  //reset button
  const buttonReset = document.getElementById("btn-reset");
  buttonReset.addEventListener("click", () => {

    cards.forEach((card) => {
      card.classList.remove("flip"); //will make all cards turn back down
    });
    //cards.classList.remove("flip");
    //cardTwo.classList.remove("flip");

    shuffleCard();
    startTimer();
  });

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

//timer function
function startTimer() {
  let seconds = 00;
  let tens = 00;
  const outputSeconds = document.getElementById("second");
  const outputTens = document.getElementById("tens");
  tens++;
  if (tens <= 9) {
    outputTens.innerHTML = "0" + tens;
  }

  if (tens > 9) {
    outputTens.innerHTML = tens;
  }

  if (tens > 99) {
    seconds++;
    outputSeconds.innerHTML = "0" + seconds;
    tens = 0;
    outputTens.innerHTML = "0" + 0;
  }

  if (seconds > 9) {
    outputSeconds.innerHTML = seconds;
  }
}

startTimer();
