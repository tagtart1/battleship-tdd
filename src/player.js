import Gameboard from "./gameboard";

function Player(name) {
  let _lastAttackResult = false;
  let _lastAttackCoordinate;
  let _potentialAttacks = [];
  let _lastAttackShip;
  let _firstAttackCoordinate;
  let directionEstablished = false;

  return {
    name,
    get lastAttackCoordinate() {
      return _lastAttackCoordinate;
    },

    attackRandom(gameboard) {
      let randomCoord = this.getRandomCoord();
      while (!gameboard.validCoordAttack(randomCoord)) {
        randomCoord = this.getRandomCoord();
      }

      return this.launchAttack(randomCoord, gameboard);
    },

    launchAttack(coordinate, gameboard) {
      if (typeof gameboard.board[coordinate] === "object") {
        _lastAttackShip = gameboard.board[coordinate];
      }
      const attackResult = gameboard.receiveAttack(coordinate);

      _lastAttackResult = attackResult;
      _lastAttackCoordinate = coordinate;
      return attackResult;
    },

    launchAIAttack(gameboard) {
      // If the last attacked missed and no potential attack, go random.
      if (_lastAttackResult === false && _potentialAttacks.length === 0) {
        return this.attackRandom(gameboard);
      }
      if (_lastAttackResult === true && _potentialAttacks.length === 0) {
        if (_lastAttackShip.isSunk()) {
          _potentialAttacks = [];
          _firstAttackCoordinate = null;
          directionEstablished = false;

          return this.attackRandom(gameboard);
        }
        if (!directionEstablished) {
          _potentialAttacks = gameboard.getSurrounding4PointNeighbors(
            _lastAttackCoordinate
          );
          console.log("result is true,  potential generated");
        } else {
          _potentialAttacks = gameboard.getValidEdgePointAttack(
            _firstAttackCoordinate,
            _lastAttackCoordinate
          );
          console.log("result is true,  edges generated");
        }

        _firstAttackCoordinate = _lastAttackCoordinate;
        const randomIndex = Math.floor(
          Math.random() * _potentialAttacks.length
        );

        const result = this.launchAttack(
          _potentialAttacks[randomIndex],
          gameboard
        );

        _potentialAttacks.splice(randomIndex, 1);
        if (_potentialAttacks.length === 0) {
          directionEstablished = true;
        }
        return result;
      }
      if (_lastAttackResult === true && _potentialAttacks.length !== 0) {
        if (_lastAttackShip.isSunk()) {
          _potentialAttacks = [];
          _firstAttackCoordinate = null;
          _lastAttackShip = null;
          directionEstablished = false;
          return this.attackRandom(gameboard);
        }
        directionEstablished = true;
        _potentialAttacks = gameboard.getValidEdgePointAttack(
          _firstAttackCoordinate,
          _lastAttackCoordinate
        );

        const randomIndex = Math.floor(
          Math.random() * _potentialAttacks.length
        );
        const result = this.launchAttack(
          _potentialAttacks[randomIndex],
          gameboard
        );

        _potentialAttacks.splice(randomIndex, 1);
        if (_potentialAttacks.length === 0) {
          _potentialAttacks = gameboard.getValidEdgePointAttack(
            _firstAttackCoordinate,
            _lastAttackCoordinate
          );
        }
        return result;
      }

      if (_lastAttackResult === false && _potentialAttacks.length !== 0) {
        const randomIndex = Math.floor(
          Math.random() * _potentialAttacks.length
        );
        const result = this.launchAttack(
          _potentialAttacks[randomIndex],
          gameboard
        );

        _potentialAttacks.splice(randomIndex, 1);

        return result;
      }
      return false;
    },

    getRandomCoord() {
      return `${Math.floor(Math.random() * 11)},${Math.floor(
        Math.random() * 11
      )}`;
    },
  };
}

export default Player;
