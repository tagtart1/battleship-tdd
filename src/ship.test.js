import Ship from "ship.js";

test("Ship Object Method hit()", () => {
  const testShip = Ship(5);
  testShip.hit();
  expect(testShip.hits).toBe(1);
});

test("Ship Object Method hit() twice", () => {
  const testShip = Ship(5);
  testShip.hit();
  testShip.hit();
  expect(testShip.hits).toBe(2);
});

test("isSunk() should return false while hits is less than length", () => {
  const testShip = Ship(2);
  expect(testShip.isSunk()).toBe(false);
});

test("isSunk() should return true while hits is greater than length", () => {
  const testShip = Ship(2);
  testShip.hit();
  testShip.hit();
  expect(testShip.isSunk()).toBe(true);
});
