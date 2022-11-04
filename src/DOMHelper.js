function addClickListener(element, callback) {
  element.addEventListener("click", () => {
    // Register the input on turn

    callback(element.dataset.coordinate);
  });
}

export function generateGrid(size, parent) {
  for (let i = 1; i <= size / 10; i += 1) {
    for (let j = 1; j <= size / 10; j += 1) {
      const square = document.createElement("div");
      square.classList.add("square");
      square.dataset.coordinate = `${j},${i}`;
      parent.appendChild(square);
    }
  }
}

export function hitSquareElement(coordinate, boardElem) {
  const square = boardElem.querySelector(`[data-coordinate="${coordinate}"`);
  square.classList.add("square-hit");
}

export function missSquareElement(coordinate, boardElem) {
  const square = boardElem.querySelector(`[data-coordinate="${coordinate}"`);
  square.classList.add("square-miss");
}

export function generateComputerGrid(size, parent, callback) {
  for (let i = 1; i <= size / 10; i += 1) {
    for (let j = 1; j <= size / 10; j += 1) {
      const square = document.createElement("div");

      addClickListener(square, callback);

      square.classList.add("square");
      square.dataset.coordinate = `${j},${i}`;
      parent.appendChild(square);
    }
  }
}

export function renderPlayerBoard(gameboard) {
  const board = gameboard.board;

  for (let i = 1; i <= 10; i += 1) {
    for (let j = 1; j <= 10; j += 1) {
      if (board[`${i},${j}`] !== null) {
        const square = document.querySelector(`[data-coordinate="${i},${j}"`);
        square.classList.add("square-ship");
      }
    }
  }
}
