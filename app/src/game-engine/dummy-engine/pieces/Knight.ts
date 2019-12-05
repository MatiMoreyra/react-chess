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
  
    if (Math.abs(dx) === 1 && Math.abs(dy) === 2) {
      return true;
    }
    if (Math.abs(dx) === 2 && Math.abs(dy) === 1) {
      return true;
    }
  
    return false;
  }

  public name(): string {
    return "Knight";
  }
}
