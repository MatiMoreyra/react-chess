import { AbstractPiece } from "../../AbstractPiece";
import { ChessSquare } from "../../ChessSquare";
import { ChessBoard } from "../../ChessBoard";

export class Knight extends AbstractPiece {
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

    // Cool solution
    return Math.abs(dx * dy) === 2;
  }

  public name(): string {
    return "Knight";
  }
}
