import { ChessSquare } from "./ChessSquare";
import { ChessBoard } from "./ChessBoard";

export enum PieceColor {
  Black,
  White
}

export abstract class AbstractPiece {
  private _color: PieceColor;
  constructor(color: PieceColor) {
    this._color = color;
  }

  public get color(): PieceColor {
    return this._color;
  }

  public abstract canMove(
    source: ChessSquare,
    destination: ChessSquare,
    board: ChessBoard
  ): boolean;

  public abstract name(): string;
}
