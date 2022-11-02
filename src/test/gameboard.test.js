import Gameboard from "gameboard.js";

test("Gameboard board queries correctly", () => {
  const gameboard = Gameboard();
  expect(gameboard.board[`5,2`]).toBeNull();
});

test("Gameboard board changes correctly", () => {
  const gameboard = Gameboard();
  gameboard.board[`5,2`] = "test";
  expect(gameboard.board[`5,2`]).toBe("test");
});

test("Gameboard Can Place Ship", () => {
  const gameboard = Gameboard();

  const shipOrigin = [2, 3];
  const shipLength = 3;

  gameboard.placeShip(shipOrigin, shipLength);

  expect(gameboard.board[`${shipOrigin}`]).not.toBeNull();
});

test("Gameboard Cant Place Ship In Out of Bound", () => {
  const gameboard = Gameboard();

  const shipOrigin = [9, 3];
  const shipLength = 3;

  expect(() => gameboard.placeShip(shipOrigin, shipLength)).toThrow();
});

test("Gameboard Can Place Ship on Y-Axis", () => {
  const gameboard = Gameboard();

  const shipOrigin = [5, 3];
  const shipLength = 3;
  const axis = "y";

  gameboard.placeShip(shipOrigin, shipLength, axis);

  expect(gameboard.board[`${shipOrigin}`]).not.toBeNull();
});

test("Gameboard cant place ship on already occcupied location", () => {
  const gameboard = Gameboard();

  gameboard.placeShip([5, 3], 3, "y");

  expect(() => gameboard.placeShip([4, 4], 4, "x")).toThrow();
});

test("Gameboard can hit a ship", () => {
  const gameboard = Gameboard();
  gameboard.placeShip([3, 3], 3);
  gameboard.receiveAttack([4, 3]);

  expect(gameboard.board[`4,3`]).toBe(1);
});

test("Gameboard can miss", () => {
  const gameboard = Gameboard();
  gameboard.placeShip([3, 3], 3);
  gameboard.receiveAttack([9, 3]);

  expect(gameboard.board[`9,3`]).toBe(0);
});

test("Gameboard cant repeat attack on same location", () => {
  const gameboard = Gameboard();
  gameboard.placeShip([3, 3], 3);
  gameboard.receiveAttack([9, 3]);

  expect(gameboard.receiveAttack([9, 3])).toBe(false);
});

test("Gameboard can report if all its ships are sunk - true", () => {
  const gameboard = Gameboard();
  gameboard.placeShip([3, 3], 1);
  gameboard.receiveAttack([3, 3]);

  expect(gameboard.allShipsSunk()).toBe(true);
});

test("Gameboard can report if all its ships are sunk - false", () => {
  const gameboard = Gameboard();
  gameboard.placeShip([3, 3], 1);
  gameboard.placeShip([4, 4], 1);
  gameboard.receiveAttack([3, 3]);

  expect(gameboard.allShipsSunk()).toBe(false);
});

test("Gameboard can report if all its ships are sunk - false partial", () => {
  const gameboard = Gameboard();
  gameboard.placeShip([3, 3], 2);
  gameboard.placeShip([4, 4], 1);
  gameboard.receiveAttack([3, 3]);
  gameboard.receiveAttack([4, 4]);

  expect(gameboard.allShipsSunk()).toBe(false);
});
