"use strict";

const diceImg = document.querySelector(".dice");

//Buttons
const rollDice = document.querySelector(".btn--roll");
const hold = document.querySelector(".btn--hold");
const newGame = document.querySelector(".btn--new");

const player1 = document.querySelector(".player--0");
let player1CurrentScore = player1.querySelector("#current--0");
let player1TotalScore = player1.querySelector("#score--0");
const player1Name = player1.querySelector("#name--0");

const player2 = document.querySelector(".player--1");
let player2CurrentScore = player2.querySelector("#current--1");
let player2TotalScore = player2.querySelector("#score--1");
const player2Name = player2.querySelector("#name--1");

//State Variables for Scores
let current1 = 0,
  current2 = 0;
let total1 = 0,
  total2 = 0;

//Generating the Random Number
const randNumberGenerator = () => {
  return Math.round(Math.random() * 5) + 1;
};

//Enabling and DIsabling the Buttons
const BtnCtrl = (b) => {
  rollDice.disabled = b;
  hold.disabled = b;
};

//Activating Players
const activePlayer1 = () => {
    player1.classList.add("player--active");
    player2.classList.remove("player--active");
}

const activePlayer2 = () => {
    player2.classList.add("player--active");
    player1.classList.remove("player--active");
}

//Rolling the Dice
rollDice.addEventListener("click", () => {
    diceImg.classList.remove("hide");
  let rand = randNumberGenerator();
  diceImg.setAttribute("src", `img/dice-${rand}.png`);


  if (player1.classList.contains("player--active")) {
    if (rand === 1) {
      current1 = 0;
      player1CurrentScore.textContent = current1;
        activePlayer2();
    } else {
      current1 += rand;
      player1CurrentScore.textContent = current1;
    }
  } else if (player2.classList.contains("player--active")) {
    if (rand === 1) {
      current2 = 0;
      player2CurrentScore.textContent = current2;
        activePlayer1();
    } else {
      current2 += rand;
      player2CurrentScore.textContent = current2;
    }
  }
});

hold.addEventListener("click", () => {
  if (player1.classList.contains("player--active")) {
    total1 += current1;
    player1TotalScore.textContent = total1;
    current1 = 0;
    player1CurrentScore.textContent = current1;
      activePlayer2();
  } else if (player2.classList.contains("player--active")) {
    total2 += current2;
    player2TotalScore.textContent = total2;
    current2 = 0;
    player2CurrentScore.textContent = current2;
      activePlayer1();
  }

  if (total1 > 99) {
      player1Name.textContent = "Winner";
      player1.classList.add("player--winner");
    BtnCtrl(true);
  } else if (total2 > 99) {
    player2Name.textContent = "Winner";
      BtnCtrl(true);
      player2.classList.add("player--winner");
  }
});

newGame.addEventListener("click", () => {
  player1CurrentScore.textContent = 0;
  player2CurrentScore.textContent = 0;
  player1TotalScore.textContent = 0;
  player2TotalScore.textContent = 0;
  player1Name.textContent = "Player 1";
  player2Name.textContent = "Player 2";
    activePlayer1();
  current1 = 0;
  current2 = 0;
  total1 = 0;
  total2 = 0;
  diceImg.setAttribute("src", "img/dice-1.png");
    BtnCtrl(false);
    diceImg.classList.add("hide");
    player1.classList.remove("player--winner");
     player2.classList.remove("player--winner")
});
