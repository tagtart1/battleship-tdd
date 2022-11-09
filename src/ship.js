function Ship(length, neighborCoordinates, axis) {
  let _hits = 0;

  return {
    length,
    neighborCoordinates,
    axis,
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
