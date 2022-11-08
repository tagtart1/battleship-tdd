import Gameboard from "./gameboard";

function Player(name) {
  let _lastAttackResult = false;
  let _lastAttackCoordinate;
  let _potentialAttacks = [];

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
      console.log("yo");
      return this.launchAttack(randomCoord, gameboard);
    },

    launchAttack(coordinate, gameboard) {
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
        _potentialAttacks = gameboard.getSurrounding4PointNeighbors(
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
        return result;
      }
      if (_lastAttackResult === true && _potentialAttacks.length !== 0) {
        if (
          gameboard.getSurrounding4PointNeighbors(_lastAttackCoordinate)
            .length === 0
        ) {
          _potentialAttacks = [];
          return this.attackRandom(gameboard);
        }
        console.log("attacking edge");
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
