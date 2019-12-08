import { AbstractPiece } from "../../AbstractPiece";
import { ChessSquare } from "../../ChessSquare";
import { ChessBoard } from "../../ChessBoard";
import { Move } from "../../AbstractChessEngine";

export class Bishop extends AbstractPiece {
  public canMove(move: Move, board: ChessBoard): boolean {
    // Cannot move if there is a piece of the same color at destination
    let pieceAtDestination = board.pieceAt(move.destination);
    if (pieceAtDestination != null && pieceAtDestination.color === this.color) {
      return false;
    }

    let dx = move.destination.column - move.source.column;
    let dy = move.destination.row - move.source.row;

    // Diagonal movement means abs(dx) === abs(dy)
    if (Math.abs(dx) !== Math.abs(dy)) {
      return false;
    }

    // Check if the path is free
    let advance = 1;
    while (advance < Math.abs(dx)) {
      let col = move.source.column + advance * Math.sign(dx);
      let row = move.source.row + advance * Math.sign(dy);
      if (board.pieceAt(new ChessSquare(row, col)) !== null) {
        return false;
      }
      advance++;
    }

    // Everything is fine, can move.
    return true;
  }

  public name(): string {
    return "Bishop";
  }
}
