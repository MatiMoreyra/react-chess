import { AbstractPiece, PieceColor } from "../../AbstractPiece";
import { ChessBoard } from "../../ChessBoard";
import { Bishop } from "./Bishop";
import { Rook } from "./Rook";
import { Move } from "../../AbstractChessEngine";

export class Queen extends AbstractPiece {
  private _bishop: Bishop;
  private _rook: Rook;

  constructor(color: PieceColor) {
    super(color);
    this._bishop = new Bishop(color);
    this._rook = new Rook(color);
  }

  public canMove(move: Move, board: ChessBoard): boolean {
    // Combines bishop and rook movement.
    return this._bishop.canMove(move, board) || this._rook.canMove(move, board);
  }

  public name(): string {
    return "Queen";
  }
}
