import { IMove } from "../../IMove";
import { Square } from "./Square";

// Class that provides extension methods to manipulate an IMove
export class Move implements IMove {
  source: Square;
  destination: Square;
  constructor(move: IMove) {
    this.source = new Square(move.source);
    this.destination = new Square(move.destination);
  }

  public get dx(): number {
    return this.destination.column - this.source.column;
  }

  public get dy(): number {
    return this.destination.row - this.source.row;
  }

  public isVertical(): boolean {
    return this.dx === 0 && this.dy !== 0;
  }

  public isHorizontal(): boolean {
    return this.dy === 0 && this.dx !== 0;
  }

  public isDiagonal(): boolean {
    return Math.abs(this.dx) === Math.abs(this.dy) && this.dx !== 0;
  }

  public equals(move: Move) {
    return (
      this.source.equals(move.source) &&
      this.destination.equals(move.destination)
    );
  }
}
