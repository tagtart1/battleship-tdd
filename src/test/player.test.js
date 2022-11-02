import Player from "player.js";
import Gameboard from "gameboard.js";

test("Player can query name", () => {
  const playerTest = Player("Player1");
  expect(playerTest.name).toBe("Player1");
});

test("Player can launch attack at a gameboard", () => {
  const playerTest = Player("Player1");
  const testBoard = Gameboard();
  playerTest.launchAttack([3, 3], testBoard);
  expect(testBoard.board[`3,3`]).toBe(0);
});

test("Can query last fired attack from player", () => {
  const playerTest = Player("Player1");
  const testBoard = Gameboard();
  playerTest.launchAttack([3, 3], testBoard);
  playerTest.launchAttack([4, 3], testBoard);
  expect(playerTest.lastAttack).toEqual([4, 3]);
});

test("Player can launch random dumb attack", () => {
  const playerTest = Player("Computer");
  const testBoard = Gameboard();
  expect(playerTest.launchRandomAttack(testBoard)).not.toBeUndefined();
});
