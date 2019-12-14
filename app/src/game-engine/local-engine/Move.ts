import { ISquare } from "../ISquare";
import { IMove } from "../IMove";

// Class that provides extension methods to manipulate an IMove
export class Move implements IMove {
  source: ISquare;
  destination: ISquare;
  constructor(move: IMove) {
    this.source = move.source;
    this.destination = move.destination;
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
}
