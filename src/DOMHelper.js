/* eslint-disable no-use-before-define */
function addClickListener(element, callback) {
  element.addEventListener("click", () => {
    // Register the input on turn

    callback(element.dataset.coordinate);
  });
}

let isChangingShip = false;
let movingShipInfo = {};
let queueShip = null;
let canPlace = true;
const axisFlipper = document.querySelector(".axis-flip");

axisFlipper.addEventListener("click", () => {
  if (movingShipInfo.axis === "x") {
    movingShipInfo.axis = "y";
  } else {
    movingShipInfo.axis = "x";
  }
});

export function generateGrid(size, parent, gameBoard) {
  for (let i = 1; i <= size / 10; i += 1) {
    const row = document.createElement("div");
    row.classList.add("square-row");
    parent.appendChild(row);
    for (let j = 1; j <= size / 10; j += 1) {
      const square = document.createElement("div");
      square.classList.add("square");
      square.dataset.coordinate = `${j},${i}`;
      row.appendChild(square);

      square.addEventListener("click", () => {
        if (!canPlace) return;
        const node = gameBoard.board[square.dataset.coordinate];
        if (isChangingShip) {
          // Confirm PLacement and wipe previous data
          isChangingShip = false;
          queueShip = null;
          movingShipInfo = {};
        } else if (typeof node === "object" && node !== null) {
          // Start process of moving a ship
          isChangingShip = true;
          movingShipInfo = {
            length: node.length,
            axis: node.axis,
          };
          queueShip = gameBoard.board[square.dataset.coordinate];
          gameBoard.setSurroundingBusyNodesToNull(queueShip);
          console.log(gameBoard.board);
        }
      });

      square.addEventListener("mouseover", () => {
        if (isChangingShip) {
          const tempSplit = square.dataset.coordinate.split(",");
          tempSplit[0] = Number(tempSplit[0]);
          tempSplit[1] = Number(tempSplit[1]);
          if (
            gameBoard.placeShip(
              tempSplit,
              movingShipInfo.length,
              movingShipInfo.axis
            )
          ) {
            console.log("tru");
            canPlace = true;
            queueShip = gameBoard.board[square.dataset.coordinate];
            renderPlayerBoard(gameBoard);
          } else {
            canPlace = false;
            queueShip = null;
          }
        }
      });

      square.addEventListener("mouseleave", () => {
        if (isChangingShip && queueShip != null) {
          for (let k = 0; k < queueShip.neighborCoordinates.length; k += 1) {
            gameBoard.removeShip(queueShip.neighborCoordinates[k]);
          }
          gameBoard.setSurroundingBusyNodesToNull(queueShip);
          clearBoardVisual(gameBoard);
        }
      });
    }
  }
}

export function gameOverScreen(winner) {
  const header = document.querySelector("header");
  header.textContent = `Game over! ${winner.name} won!`;
}

export function hitSquareElement(coordinate, boardElem) {
  const square = boardElem.querySelector(`[data-coordinate="${coordinate}"`);
  square.classList.add("square-hit");
  square.textContent = "✖";
}

export function missSquareElement(coordinate, boardElem) {
  console.log(coordinate);
  const square = boardElem.querySelector(`[data-coordinate="${coordinate}"`);
  square.classList.add("square-miss");
  square.textContent = "・";
}

export function generateComputerGrid(size, parent, callback) {
  for (let i = 1; i <= size / 10; i += 1) {
    const row = document.createElement("div");
    row.classList.add("square-row");
    parent.appendChild(row);
    for (let j = 1; j <= size / 10; j += 1) {
      const square = document.createElement("div");

      addClickListener(square, callback);

      square.classList.add("square");
      square.dataset.coordinate = `${j},${i}`;
      row.appendChild(square);
    }
  }
}

function clearBoardVisual(gameboard) {
  const board = gameboard.board;

  for (let i = 1; i <= 10; i += 1) {
    for (let j = 1; j <= 10; j += 1) {
      if (board[`${i},${j}`] === null) {
        const square = document.querySelector(`[data-coordinate="${i},${j}"`);
        square.classList.remove("square-ship");
      }
    }
  }
}

export function renderPlayerBoard(gameboard) {
  const board = gameboard.board;

  for (let i = 1; i <= 10; i += 1) {
    for (let j = 1; j <= 10; j += 1) {
      if (
        typeof board[`${i},${j}`] === "object" &&
        board[`${i},${j}`] !== null
      ) {
        const square = document.querySelector(`[data-coordinate="${i},${j}"`);
        square.classList.add("square-ship");
      }
    }
  }
}

export function renderMissedShots(gameboardLeft, gameboardRight) {
  const boardLeft = gameboardLeft.board;
  const boardRight = gameboardRight.board;

  for (let i = 1; i <= 10; i += 1) {
    for (let j = 1; j <= 10; j += 1) {
      if (boardRight[`${i},${j}`] === 0) {
        const square = document.querySelector(
          `.computer-board [data-coordinate="${i},${j}"`
        );
        square.classList.add("square-miss");
        square.textContent = "・";
      }
    }
  }

  for (let i = 1; i <= 10; i += 1) {
    for (let j = 1; j <= 10; j += 1) {
      if (boardLeft[`${i},${j}`] === 0) {
        const square = document.querySelector(
          `.player-board [data-coordinate="${i},${j}"`
        );
        square.classList.add("square-miss");
        square.textContent = "・";
      }
    }
  }
}
