"use strict";

// DOM elements
const body = document.querySelector("body");
const showNumber = document.querySelector(".number");
const showScore = document.querySelector(".score");
const showHighScore = document.querySelector(".highscore");
const guess = document.querySelector(".guess");
const message = document.querySelector(".message");
const check = document.querySelector(".check");
const reset = document.querySelector(".again");

// Game state variables
let score = 10;
let highScore = Number(localStorage.getItem("guess_highscore")) || 0;
let hasWon = false;

// Display saved highscore on load
showHighScore.textContent = highScore;

// Function to generate a random number between 1 and 20
let randomNumber = Math.trunc(Math.random() * 20) + 1;

// Function to display a message to the user
const showMessage = function (msg) {
  message.textContent = msg;
};

// Function to handle the guessing logic
const checkGuess = function () {
  if (hasWon) return;

  const inputValue = guess.value.trim();
  const guessedNumber = Number(inputValue);

  // When there is no input
  if (!inputValue || isNaN(guessedNumber)) {
    showMessage("Enter your number ):");
    return;
  }

  // When player guesses correctly
  if (guessedNumber === randomNumber) {
    showMessage("You are right (:");
    showNumber.textContent = randomNumber;
    body.style.backgroundColor = "#60b347"; // Green background for win
    showNumber.style.width = window.innerWidth <= 768 ? "22rem" : "30rem";
    check.disabled = true;
    hasWon = true;

    if (score > highScore) {
      highScore = score;
      localStorage.setItem("guess_highscore", highScore);
      showHighScore.textContent = highScore;
    }

  // When guess is wrong
  } else {
    if (score > 1) {
      guessedNumber < randomNumber
        ? showMessage("Too low! /:")
        : showMessage("Too high! /:");
      score--;
      showScore.textContent = score;
    } else {
      showMessage("You lost! )':");
      body.style.backgroundColor = "#d53f3f"; // Red background for loss
      score = 0;
      showScore.textContent = score;
    }
  }
};

// Reset game when 'Again' button is clicked
function resetGame() {
  score = 10;
  showScore.textContent = score;
  randomNumber = Math.trunc(Math.random() * 20) + 1;
  showNumber.textContent = "?";
  showNumber.style.width = window.innerWidth <= 768 ? "12rem" : "15rem";
  showMessage("Start guessing...");
  body.style.backgroundColor = "#222";
  check.disabled = false;
  guess.value = "";
  hasWon = false;
  guess.focus();
}

// Event listeners
check.addEventListener("click", checkGuess);
reset.addEventListener("click", resetGame);

// Event listener for Enter key in input
guess.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    checkGuess();
  }
});

// Event listener for Escape and Arrow keys
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    resetGame();
  } else if (event.key === "ArrowUp") {
    const val = Number(guess.value) || 0;
    if (val < 20) guess.value = val + 1;
  } else if (event.key === "ArrowDown") {
    const val = Number(guess.value) || 0;
    if (val > 1) guess.value = val - 1;
  }
});

guess.focus();
