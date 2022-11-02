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
    launchRandomAttack(gameboard) {
      const randomCoordinate = Math.floor(Math.random() * 11);
      _lastAttack = randomCoordinate;
      return gameboard.receiveAttack(randomCoordinate);
    },
  };
}

export default Player;
