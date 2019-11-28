import { ChessSquare } from "../../game-engine/ChessSquare";

it('Constructor throws with invalid positions', () => {
  expect(() => { let square = new ChessSquare(-1, 0) }).toThrow("Invalid row number");
  expect(() => { let square = new ChessSquare(8, 0) }).toThrow("Invalid row number");
  expect(() => { let square = new ChessSquare(0, -1) }).toThrow("Invalid column number");
  expect(() => { let square = new ChessSquare(0, 8) }).toThrow("Invalid column number");
});

it('Label', () => {
  let square = new ChessSquare(0,0);
  expect(square.label).toBe("a1");

  square = new ChessSquare(2,2);
  expect(square.label).toBe("c3");
});
