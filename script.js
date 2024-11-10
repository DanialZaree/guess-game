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
let highScore = 0;
let hasWon = false;

// Function to generate a random number between 1 and 20
let randomNumber = Math.trunc(Math.random() * 20) + 1;

// Function to display a message to the user
const showMessage = function (showMessage) {
  message.textContent = showMessage;
};

// Function to handle the guessing logic
const checkGuess = function () {
  if (hasWon) {
    return;
  }
  const guessedNumber = Number(guess.value);

  // When there is no input
  if (!guessedNumber) {
    showMessage("Enter your number ):");

    // When player guesses correctly
  } else if (guessedNumber === randomNumber) {
    showMessage("You are right (:");
    showNumber.textContent = randomNumber;
    body.style.backgroundColor = "#60b347"; // Green background for win
    showNumber.style.width = "30rem";
    check.disabled = true; // This sets the disabled property of the check element to true.
    hasWon = true;
    if (score > highScore) {
      highScore = score; // Update high score
      showHighScore.textContent = highScore;
      return;
    }

    // When guess is wrong
  } else if (guessedNumber !== randomNumber) {
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

// Event listener for the 'Check' button
check.addEventListener("click", checkGuess);

// Event listener for 'Enter' key in the input field
guess.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    checkGuess(); // Call the check function on Enter key press
  }
});

// Reset game when 'Again' button is clicked
function resetGame() {
  score = 10;
  showScore.textContent = score;
  randomNumber = Math.trunc(Math.random() * 20) + 1; // Generate a new number
  showNumber.textContent = "?"; // Reset the displayed number
  showNumber.style.width = "15rem";
  showMessage("Start guessing...");
  body.style.backgroundColor = "#222"; // Reset background color
  check.disabled = false; // This sets the disabled property of the check element to true.
  guess.value = ""; // Clear the input field
  hasWon = false;
}

// Event listener for the reset button
reset.addEventListener("click", resetGame);

// Event listener for the Escape key
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    resetGame();
  }
});
guess.focus();
