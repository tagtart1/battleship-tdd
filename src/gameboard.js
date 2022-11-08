import Ship from "./ship";

function Gameboard() {
  // Creates a board that keeps tracks of ships, misses and hits
  function createBoard(size) {
    const result = {};
    for (let i = 1; i <= size; i += 1) {
      for (let j = 1; j <= size; j += 1) {
        result[`${i},${j}`] = null;
      }
    }
    return result;
  }

  const _board = createBoard(10);

  function popSurroundingNodes(coordinate) {
    const currentNode = coordinate.split(",");

    if (
      _board[`${Number(currentNode[0])},${Number(currentNode[1]) + 1}`] === null
    ) {
      console.log(currentNode);
      _board[`${Number(currentNode[0])},${Number(currentNode[1]) + 1}`] = 0;
    }
    if (
      _board[`${Number(currentNode[0]) + 1},${Number(currentNode[1]) + 1}`] ===
      null
    ) {
      _board[`${Number(currentNode[0]) + 1},${Number(currentNode[1]) + 1}`] = 0;
    }
    if (
      _board[`${Number(currentNode[0]) + 1},${Number(currentNode[1]) - 1}`] ===
      null
    ) {
      _board[`${Number(currentNode[0]) + 1},${Number(currentNode[1]) - 1}`] = 0;
    }
    if (
      _board[`${Number(currentNode[0]) + 1},${Number(currentNode[1])}`] === null
    ) {
      _board[`${Number(currentNode[0]) + 1},${Number(currentNode[1])}`] = 0;
    }
    if (
      _board[`${Number(currentNode[0])},${Number(currentNode[1]) - 1}`] === null
    ) {
      _board[`${Number(currentNode[0])},${Number(currentNode[1]) - 1}`] = 0;
    }
    if (
      _board[`${Number(currentNode[0]) - 1},${Number(currentNode[1]) - 1}`] ===
      null
    ) {
      _board[`${Number(currentNode[0]) - 1},${Number(currentNode[1]) - 1}`] = 0;
    }
    if (
      _board[`${Number(currentNode[0]) - 1},${Number(currentNode[1])}`] === null
    ) {
      _board[`${Number(currentNode[0]) - 1},${Number(currentNode[1])}`] = 0;
    }
    if (
      _board[`${Number(currentNode[0]) - 1},${Number(currentNode[1]) + 1}`] ===
      null
    ) {
      _board[`${Number(currentNode[0]) - 1},${Number(currentNode[1]) + 1}`] = 0;
    }
  }

  const _ships = [];
  return {
    get board() {
      return _board;
    },

    placeShip(coordinate, shipLength, axis = "x") {
      const validCoords = [];

      for (let i = 0; i < shipLength; i += 1) {
        if (axis === "x") {
          if (_board[`${coordinate[0] + i},${coordinate[1]}`] !== null) {
            throw new Error("Invalid Placement, already occupied location");
          }
          if (coordinate[0] + i > 10) {
            throw new Error("Out of bounds of board in that direction");
          }

          validCoords.push(`${coordinate[0] + i},${coordinate[1]}`);
        } else {
          if (_board[`${coordinate[0]},${coordinate[1] + i}`] !== null) {
            throw new Error("Invalid Placement, already occupied location");
          }
          if (coordinate[1] + i > 10) {
            throw new Error("Out of bounds of board in that direction");
          }

          validCoords.push(`${coordinate[0]},${coordinate[1] + i}`);
        }
      }
      // Do checks to make sure each ship has 1 radius from each other
      const newShip = Ship(shipLength, validCoords);
      for (let i = 0; i < validCoords.length; i += 1) {
        _board[`${validCoords[i]}`] = newShip;
      }
      _ships.push(newShip);
    },
    // Returns true on successful attack, false, upon a failed attack
    receiveAttack(coordinate) {
      const coord = _board[`${coordinate}`];

      // If the coord is null, its a miss, no ship
      if (coord === null) {
        _board[`${coordinate}`] = 0;
        return false;
      }

      // If the cords hold an object, meaning a ship, its a hit
      if (typeof coord === "object") {
        coord.hit();
        // Coordinate no longer needs to hold reference to ship therefore
        // we set it to 1, which represents a hit
        _board[`${coordinate}`] = 1;
        // check if the ship has sunk and pop all surrounding coords. Have DOMHelper rerender
        // the grid. To get sourround nodes, loops through the node by +1 or -1 and if the
        // surrounding node is NULL, make it 0
        if (coord.isSunk()) {
          for (let i = 0; i < coord.neighborCoordinates.length; i += 1) {
            popSurroundingNodes(coord.neighborCoordinates[i]);
          }
        }
        return true;
      }

      return false;
    },

    get allShips() {
      return _ships;
    },

    validCoordAttack(coordinate) {
      const coord = _board[`${coordinate}`];
      if (coord === 1 || coord === 0) {
        return false;
      }

      if (coord === null) {
        return true;
      }

      if (typeof coord === "object") {
        return true;
      }

      return false;
    },

    allShipsSunk() {
      for (let i = 0; i < _ships.length; i += 1) {
        if (_ships[i].isSunk() === false) return false;
      }
      return true;
    },

    getSurrounding4PointNeighbors(coordinate) {
      const result = [];
      const currentNode = coordinate.split(",");

      if (
        this.validCoordAttack(
          `${Number(currentNode[0])},${Number(currentNode[1]) + 1}`
        )
      ) {
        result.push(`${Number(currentNode[0])},${Number(currentNode[1]) + 1}`);
      }

      if (
        this.validCoordAttack(
          `${Number(currentNode[0]) + 1},${Number(currentNode[1])}`
        )
      ) {
        result.push(`${Number(currentNode[0]) + 1},${Number(currentNode[1])}`);
      }

      if (
        this.validCoordAttack(
          `${Number(currentNode[0])},${Number(currentNode[1]) - 1}`
        )
      ) {
        result.push(`${Number(currentNode[0])},${Number(currentNode[1]) - 1}`);
      }

      if (
        this.validCoordAttack(
          `${Number(currentNode[0]) - 1},${Number(currentNode[1])}`
        )
      ) {
        result.push(`${Number(currentNode[0]) - 1},${Number(currentNode[1])}`);
      }

      return result;
    },
  };
}

export default Gameboard;