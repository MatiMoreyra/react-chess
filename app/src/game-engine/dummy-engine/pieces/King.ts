import { AbstractPiece } from "../../AbstractPiece";
import { ChessSquare } from "../../ChessSquare";
import { ChessBoard } from "../../ChessBoard";

export class King extends AbstractPiece {
  public canMove(
    source: ChessSquare,
    destination: ChessSquare,
    board: ChessBoard
  ): boolean {
    let pieceAtDestination = board.pieceAt(destination);

    // Cannot move if there is a piece of the same color at destination
    if (pieceAtDestination != null && pieceAtDestination.color === this.color) {
      return false;
    }

    let dX = source.row - destination.row;
    let dY = source.column - destination.column;

    // Can move only 1 square away in any direction
    if (Math.abs(dX) <= 1 && Math.abs(dY) <= 1) {
      return true;
    }
    return false;
  }

  public name(): string {
    return "King";
  }
}
