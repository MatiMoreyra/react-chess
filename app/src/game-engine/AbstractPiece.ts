import { ChessBoard } from "./ChessBoard";
import { Move } from "./AbstractChessEngine";

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

  public abstract canMove(move: Move, board: ChessBoard): boolean;

  public abstract name(): string;
}
