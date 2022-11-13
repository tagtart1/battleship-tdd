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
      _board[`${Number(currentNode[0])},${Number(currentNode[1]) + 1}`] ===
        null ||
      _board[`${Number(currentNode[0])},${Number(currentNode[1]) + 1}`] === 2
    ) {
      _board[`${Number(currentNode[0])},${Number(currentNode[1]) + 1}`] = 0;
    }
    if (
      _board[`${Number(currentNode[0]) + 1},${Number(currentNode[1]) + 1}`] ===
        null ||
      _board[`${Number(currentNode[0]) + 1},${Number(currentNode[1]) + 1}`] ===
        2
    ) {
      _board[`${Number(currentNode[0]) + 1},${Number(currentNode[1]) + 1}`] = 0;
    }
    if (
      _board[`${Number(currentNode[0]) + 1},${Number(currentNode[1]) - 1}`] ===
        null ||
      _board[`${Number(currentNode[0]) + 1},${Number(currentNode[1]) - 1}`] ===
        2
    ) {
      _board[`${Number(currentNode[0]) + 1},${Number(currentNode[1]) - 1}`] = 0;
    }
    if (
      _board[`${Number(currentNode[0]) + 1},${Number(currentNode[1])}`] ===
        null ||
      _board[`${Number(currentNode[0]) + 1},${Number(currentNode[1])}`] === 2
    ) {
      _board[`${Number(currentNode[0]) + 1},${Number(currentNode[1])}`] = 0;
    }
    if (
      _board[`${Number(currentNode[0])},${Number(currentNode[1]) - 1}`] ===
        null ||
      _board[`${Number(currentNode[0])},${Number(currentNode[1]) - 1}`] === 2
    ) {
      _board[`${Number(currentNode[0])},${Number(currentNode[1]) - 1}`] = 0;
    }
    if (
      _board[`${Number(currentNode[0]) - 1},${Number(currentNode[1]) - 1}`] ===
        null ||
      _board[`${Number(currentNode[0]) - 1},${Number(currentNode[1]) - 1}`] ===
        2
    ) {
      _board[`${Number(currentNode[0]) - 1},${Number(currentNode[1]) - 1}`] = 0;
    }
    if (
      _board[`${Number(currentNode[0]) - 1},${Number(currentNode[1])}`] ===
        null ||
      _board[`${Number(currentNode[0]) - 1},${Number(currentNode[1])}`] === 2
    ) {
      _board[`${Number(currentNode[0]) - 1},${Number(currentNode[1])}`] = 0;
    }
    if (
      _board[`${Number(currentNode[0]) - 1},${Number(currentNode[1]) + 1}`] ===
        null ||
      _board[`${Number(currentNode[0]) - 1},${Number(currentNode[1]) + 1}`] ===
        2
    ) {
      _board[`${Number(currentNode[0]) - 1},${Number(currentNode[1]) + 1}`] = 0;
    }
  }

  const _ships = [];
  return {
    get board() {
      return _board;
    },

    setSurroundingNodesToBusy(coordinate) {
      const currentNode = coordinate.split(",");

      if (
        _board[`${Number(currentNode[0])},${Number(currentNode[1]) + 1}`] ===
        null
      ) {
        _board[`${Number(currentNode[0])},${Number(currentNode[1]) + 1}`] = 2;
      }
      if (
        _board[
          `${Number(currentNode[0]) + 1},${Number(currentNode[1]) + 1}`
        ] === null
      ) {
        _board[
          `${Number(currentNode[0]) + 1},${Number(currentNode[1]) + 1}`
        ] = 2;
      }
      if (
        _board[
          `${Number(currentNode[0]) + 1},${Number(currentNode[1]) - 1}`
        ] === null
      ) {
        _board[
          `${Number(currentNode[0]) + 1},${Number(currentNode[1]) - 1}`
        ] = 2;
      }
      if (
        _board[`${Number(currentNode[0]) + 1},${Number(currentNode[1])}`] ===
        null
      ) {
        _board[`${Number(currentNode[0]) + 1},${Number(currentNode[1])}`] = 2;
      }
      if (
        _board[`${Number(currentNode[0])},${Number(currentNode[1]) - 1}`] ===
        null
      ) {
        _board[`${Number(currentNode[0])},${Number(currentNode[1]) - 1}`] = 2;
      }
      if (
        _board[
          `${Number(currentNode[0]) - 1},${Number(currentNode[1]) - 1}`
        ] === null
      ) {
        _board[
          `${Number(currentNode[0]) - 1},${Number(currentNode[1]) - 1}`
        ] = 2;
      }
      if (
        _board[`${Number(currentNode[0]) - 1},${Number(currentNode[1])}`] ===
        null
      ) {
        _board[`${Number(currentNode[0]) - 1},${Number(currentNode[1])}`] = 2;
      }
      if (
        _board[
          `${Number(currentNode[0]) - 1},${Number(currentNode[1]) + 1}`
        ] === null
      ) {
        _board[
          `${Number(currentNode[0]) - 1},${Number(currentNode[1]) + 1}`
        ] = 2;
      }
    },

    placeShip(coordinate, shipLength, axis = "x") {
      const validCoords = [];

      for (let i = 0; i < shipLength; i += 1) {
        if (axis === "x") {
          if (_board[`${coordinate[0] + i},${coordinate[1]}`] !== null) {
            return false;
          }
          if (coordinate[0] + i > 10) {
            return false;
          }

          validCoords.push(`${coordinate[0] + i},${coordinate[1]}`);
        } else {
          if (_board[`${coordinate[0]},${coordinate[1] + i}`] !== null) {
            return false;
          }
          if (coordinate[1] + i > 10) {
            console.log("too long");
            return false;
          }
          console.log(_board[`${coordinate[0]},${coordinate[1] + i}`]);

          validCoords.push(`${coordinate[0]},${coordinate[1] + i}`);
        }
      }

      const newShip = Ship(shipLength, validCoords, axis);
      for (let i = 0; i < validCoords.length; i += 1) {
        _board[`${validCoords[i]}`] = newShip;
      }

      for (let i = 0; i < validCoords.length; i += 1) {
        this.setSurroundingNodesToBusy(validCoords[i]);
      }

      return true;
    },
    // Returns true on successful attack, false, upon a failed attack
    receiveAttack(coordinate) {
      const coord = _board[`${coordinate}`];

      // If the coord is null or busy, its a miss, no ship
      if (coord === null || coord === 2) {
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

      if (coord === 2) return true;

      return false;
    },

    allShipsSunk() {
      for (let i = 1; i <= 10; i += 1) {
        for (let j = 1; j <= 10; j += 1) {
          if (
            typeof _board[`${i},${j}`] === "object" &&
            _board[`${i},${j}`] != null
          ) {
            if (!_board[`${i},${j}`].isSunk()) return false;
          }
        }
      }
      return true;
    },

    getValidEdgePointAttack(firstAttack, latestAttack) {
      let coord1 = firstAttack.split(",");
      let coord2 = latestAttack.split(",");
      const result = [];

      if (Math.abs(Number(coord1[1]) - Number(coord2[1])) !== 0) {
        if (Number(coord1[1]) > Number(coord2[1])) {
          coord1 = `${Number(coord1[0])},${Number(coord1[1]) + 1}`;
          coord2 = `${Number(coord2[0])},${Number(coord2[1]) - 1}`;

          if (this.validCoordAttack(coord1)) {
            result.push(coord1);
          }

          if (this.validCoordAttack(coord2)) {
            result.push(coord2);
          }
          console.log(result);
          return result;
        }
        coord1 = `${Number(coord1[0])},${Number(coord1[1]) - 1}`;
        coord2 = `${Number(coord2[0])},${Number(coord2[1]) + 1}`;

        if (this.validCoordAttack(coord1)) {
          result.push(coord1);
        }

        if (this.validCoordAttack(coord2)) {
          result.push(coord2);
        }
        console.log(result);
        return result;
      }

      if (Math.abs(Number(coord1[0]) - Number(coord2[0])) !== 0) {
        if (Number(coord1[0]) > Number(coord2[0])) {
          coord1 = `${Number(coord1[0]) + 1},${Number(coord1[1])}`;
          coord2 = `${Number(coord2[0]) - 1},${Number(coord2[1])}`;
          console.log(coord1);
          if (this.validCoordAttack(coord1)) {
            console.log(coord1);
            result.push(coord1);
          }

          console.log(coord2);
          if (this.validCoordAttack(coord2)) {
            result.push(coord2);
          }
          console.log(result);
          return result;
        }
        coord1 = `${Number(coord1[0]) - 1},${Number(coord1[1])}`;
        coord2 = `${Number(coord2[0]) + 1},${Number(coord2[1])}`;
        console.log(coord1);
        if (this.validCoordAttack(coord1)) {
          console.log(coord1);
          result.push(coord1);
        }
        console.log(coord2);
        if (this.validCoordAttack(coord2)) {
          console.log(coord2);
          result.push(coord2);
        }
        console.log(result);
        return result;
      }

      return result;
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

    generateRandomShips() {
      const XY = ["x", "y"];
      let randomCoord = [
        Math.floor(Math.random() * 11),
        Math.floor(Math.random() * 11),
      ];
      let randomIndex = Math.floor(Math.random() * 2);
      const shipSizes = [2, 3, 3, 4, 5];

      while (shipSizes.length !== 0) {
        while (!this.placeShip(randomCoord, shipSizes[0], XY[randomIndex])) {
          randomCoord = [
            Math.floor(Math.random() * 11),
            Math.floor(Math.random() * 11),
          ];
          randomIndex = Math.floor(Math.random() * 2);
        }
        shipSizes.shift();
      }
    },

    setSurroundingBusyNodesToNull(ship) {
      const shipNeigbors = ship.neighborCoordinates;
      for (let i = 0; i < shipNeigbors.length; i += 1) {
        const temp = shipNeigbors[i].split(",");
        if (_board[`${Number(temp[0])},${Number(temp[1]) + 1}`] === 2) {
          _board[`${Number(temp[0])},${Number(temp[1]) + 1}`] = null;
        }
        if (_board[`${Number(temp[0]) + 1},${Number(temp[1]) + 1}`] === 2) {
          _board[`${Number(temp[0]) + 1},${Number(temp[1]) + 1}`] = null;
        }
        if (_board[`${Number(temp[0]) + 1},${Number(temp[1]) - 1}`] === 2) {
          _board[`${Number(temp[0]) + 1},${Number(temp[1]) - 1}`] = null;
        }
        if (_board[`${Number(temp[0]) + 1},${Number(temp[1])}`] === 2) {
          _board[`${Number(temp[0]) + 1},${Number(temp[1])}`] = null;
        }
        if (_board[`${Number(temp[0])},${Number(temp[1]) - 1}`] === 2) {
          _board[`${Number(temp[0])},${Number(temp[1]) - 1}`] = null;
        }
        if (_board[`${Number(temp[0]) - 1},${Number(temp[1]) - 1}`] === 2) {
          _board[`${Number(temp[0]) - 1},${Number(temp[1]) - 1}`] = null;
        }
        if (_board[`${Number(temp[0]) - 1},${Number(temp[1])}`] === 2) {
          _board[`${Number(temp[0]) - 1},${Number(temp[1])}`] = null;
        }
        if (_board[`${Number(temp[0]) - 1},${Number(temp[1]) + 1}`] === 2) {
          _board[`${Number(temp[0]) - 1},${Number(temp[1]) + 1}`] = null;
        }
      }
    },

    addBusyCoords() {
      for (let i = 0; i <= 10; i += 1) {
        for (let j = 0; j <= 10; j += 1) {
          if (
            typeof _board[`${i},${j}`] === "object" &&
            _board[`${i},${j}`] !== null
          ) {
            this.setSurroundingNodesToBusy(`${i},${j}`);
          }
        }
      }
    },

    removeShip(coordinate) {
      _board[coordinate] = null;
    },
  };
}

export default Gameboard;
