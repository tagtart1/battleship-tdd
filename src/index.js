// Setup a new game by creating players and gameboards

// Gameboards should be created then populate their coordinates

// DOMHelper methods to render the gamebaords and take input for attacks

// Only use other objects methods do not create any new methods here

// Create a method that handles gameover (appropriate here)
import Player from "./player";
import Gameboard from "./gameboard";
import "./battleshipStyles.css";
import {
  generateGrid,
  renderPlayerBoard,
  generateComputerGrid,
  hitSquareElement,
  missSquareElement,
  renderMissedShots,
  gameOverScreen,
} from "./DOMHelper";

const player1 = Player("Player1");
const computer = Player("Computer");
const playerGameboard = Gameboard();
const computerGameboard = Gameboard();
let canAttack = true;

playerGameboard.placeShip([2, 8], 3, "y");
playerGameboard.placeShip([5, 6], 4, "y");
playerGameboard.placeShip([8, 1], 5, "y");
playerGameboard.placeShip([8, 7], 2, "y");
playerGameboard.placeShip([8, 10], 3, "x");

computerGameboard.placeShip([2, 7], 3, "x");
computerGameboard.placeShip([1, 2], 4, "y");
computerGameboard.placeShip([8, 1], 5, "y");
computerGameboard.placeShip([8, 7], 2, "y");
computerGameboard.placeShip([8, 10], 3, "x");

function gameOver(winner) {
  gameOverScreen(winner);
}

function handlePlayerTurn(coordinate) {
  if (computerGameboard.validCoordAttack(coordinate) === true && canAttack) {
    const successfulAttack = player1.launchAttack(
      coordinate,
      computerGameboard
    );
    if (successfulAttack) {
      hitSquareElement(coordinate, document.querySelector(".computer-board"));
      renderMissedShots(computerGameboard);
    } else {
      missSquareElement(coordinate, document.querySelector(".computer-board"));
    }
    canAttack = false;
    if (computerGameboard.allShipsSunk()) {
      gameOver(player1);
      return;
    }
  } else return;

  setTimeout(() => {
    const successfulComputerAttack = computer.launchAIAttack(playerGameboard);
    if (successfulComputerAttack) {
      hitSquareElement(
        computer.lastAttackCoordinate,
        document.querySelector(".player-board")
      );
    } else {
      missSquareElement(
        computer.lastAttackCoordinate,
        document.querySelector(".player-board")
      );
    }

    if (playerGameboard.allShipsSunk()) {
      gameOver(computer);
      return;
    }
    canAttack = true;
  }, 1000);
}

generateGrid(100, document.querySelector(".player-board"));
generateComputerGrid(
  100,
  document.querySelector(".computer-board"),
  handlePlayerTurn
);
renderPlayerBoard(playerGameboard);
