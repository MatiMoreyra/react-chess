import { AbstractPiece } from "../../AbstractPiece";
import { ChessBoard } from "../../ChessBoard";
import { Move } from "../../AbstractChessEngine";

export class Knight extends AbstractPiece {
  public canMove(move: Move, board: ChessBoard): boolean {
    // Cannot move if there is a piece of the same color at destination
    let pieceAtDestination = board.pieceAt(move.destination);
    if (pieceAtDestination != null && pieceAtDestination.color === this.color) {
      return false;
    }

    let dx = move.destination.column - move.source.column;
    let dy = move.destination.row - move.source.row;

    // Cool solution
    return Math.abs(dx * dy) === 2;
  }

  public name(): string {
    return "Knight";
  }
}
