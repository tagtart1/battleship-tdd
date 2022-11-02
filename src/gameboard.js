import Ship from "ship.js";

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
  const _ships = [];
  return {
    get board() {
      return _board;
    },

    placeShip(coordinate, shipLength, axis = "x") {
      const newShip = Ship(shipLength);

      for (let i = 0; i < shipLength; i += 1) {
        if (coordinate[0] + i > 10 || coordinate[1] + i > 10) {
          throw new Error("Out of bounds of board in that direction");
        }

        if (axis === "x") {
          if (_board[`${coordinate[0] + i},${coordinate[1]}`] !== null) {
            throw new Error("Invalid Placement, already occupied location");
          }
          _board[`${coordinate[0] + i},${coordinate[1]}`] = newShip;
        } else {
          if (_board[`${coordinate[0]},${coordinate[1] + i}`] !== null) {
            throw new Error("Invalid Placement, already occupied location");
          }

          _board[`${coordinate[0]},${coordinate[1] + i}`] = newShip;
        }
      }
      _ships.push(newShip);
    },
    // Returns true on successful attack, false, upon a failed attack
    receiveAttack(coordinate) {
      const coord = _board[`${coordinate[0]},${coordinate[1]}`];

      // Already attacked this coord
      if (coord === 1 || coord === 0) {
        return false;
      }

      // If the coord is null, its a miss, no ship
      if (coord === null) {
        _board[`${coordinate[0]},${coordinate[1]}`] = 0;
        return true;
      }

      // If the cords hold an object, meaning a ship, its a hit
      if (typeof coord === "object") {
        coord.hit();
        // Coordinate no longer needs to hold reference to ship therefore
        // we set it to 1, which represents a hit
        _board[`${coordinate[0]},${coordinate[1]}`] = 1;
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
  };
}

export default Gameboard;
