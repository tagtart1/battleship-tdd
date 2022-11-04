function Player(name) {
  let _lastAttack;
  return {
    name,
    get lastAttack() {
      return _lastAttack;
    },
    launchAttack(coordinate, gameboard) {
      _lastAttack = coordinate;
      return gameboard.receiveAttack(coordinate);
    },

    getRandomCoord() {
      return `${Math.floor(Math.random() * 11)},${Math.floor(
        Math.random() * 11
      )}`;
    },
  };
}

export default Player;
