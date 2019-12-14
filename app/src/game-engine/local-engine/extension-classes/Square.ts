import { ISquare } from "../../ISquare";

// Class that provides extension methods to manipulate an IMove
export class Square implements ISquare {
  row: number;
  column: number;
  constructor(square: ISquare) {
    this.row = square.row;
    this.column = square.column;
  }

  public equals(square: ISquare): boolean {
    return this.row === square.row && this.column === square.column;
  }
}
