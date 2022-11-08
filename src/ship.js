function Ship(length, neighborCoordinates) {
  let _hits = 0;

  return {
    length,
    neighborCoordinates,
    get hits() {
      return _hits;
    },
    hit() {
      _hits += 1;
    },
    isSunk() {
      return _hits >= length;
    },
  };
}

export default Ship;
