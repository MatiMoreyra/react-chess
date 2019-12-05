import { AbstractPiece } from "../../AbstractPiece";
import { ChessSquare } from "../../ChessSquare";
import { ChessBoard } from "../../ChessBoard";

export class Bishop extends AbstractPiece {
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

    let dx = destination.column - source.column;
    let dy = destination.row - source.row;

    // Diagonal movement means abs(dx) === abs(dy)
    if (Math.abs(dx) !== Math.abs(dy)) {
      return false;
    }

    // Check if the path is free
    let advance = 1;
    while (advance < Math.abs(dx)) {
      let col = source.column + advance * Math.sign(dx);
      let row = source.row + advance * Math.sign(dy);
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
