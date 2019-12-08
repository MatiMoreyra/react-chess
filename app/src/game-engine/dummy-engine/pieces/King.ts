import { AbstractPiece } from "../../AbstractPiece";
import { ChessBoard } from "../../ChessBoard";
import { Move } from "../../AbstractChessEngine";

export class King extends AbstractPiece {
  public canMove(move: Move, board: ChessBoard): boolean {
    // Cannot move if there is a piece of the same color at destination
    let pieceAtDestination = board.pieceAt(move.destination);
    if (pieceAtDestination != null && pieceAtDestination.color === this.color) {
      return false;
    }

    let dy = move.destination.row - move.source.row;
    let dx = move.destination.column - move.source.column;

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
