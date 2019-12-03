import { AbstractPiece } from "../../AbstractPiece";
import { ChessSquare } from "../../ChessSquare";
import { ChessBoard } from "../../ChessBoard";

export class King extends AbstractPiece {
  public canMove(
    source: ChessSquare,
    destination: ChessSquare,
    board: ChessBoard
  ): boolean {
    // Cannot move if there is a piece of the same color at destination
    let pieceAtDestination = board.pieceAt(destination);
    if (pieceAtDestination != null && pieceAtDestination.color === this.color) {
      return false;
    }

    let dy = source.row - destination.row;
    let dx = source.column - destination.column;

    // Can move 1 square away in any direction
    if (Math.abs(dx) <= 1 && Math.abs(dy) <= 1) {
      return true;
    }
    return false;
  }

  public name(): string {
    return "King";
  }
}
