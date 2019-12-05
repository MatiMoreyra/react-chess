import { AbstractPiece, PieceColor } from "../../AbstractPiece";
import { ChessSquare } from "../../ChessSquare";
import { ChessBoard } from "../../ChessBoard";
import { Bishop } from "./Bishop";
import { Rook } from "./Rook";

export class Queen extends AbstractPiece {
  private _bishop: Bishop;
  private _rook: Rook;

  constructor(color: PieceColor) {
    super(color);
    this._bishop = new Bishop(color);
    this._rook = new Rook(color);
  }

  public canMove(
    source: ChessSquare,
    destination: ChessSquare,
    board: ChessBoard
  ): boolean {
    // Combines bishop and rook movement.
    return (
      this._bishop.canMove(source, destination, board) ||
      this._rook.canMove(source, destination, board)
    );
  }

  public name(): string {
    return "Queen";
  }
}
