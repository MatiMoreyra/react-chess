import { AbstractPiece } from "../../AbstractPiece";
import { ChessSquare } from "../../ChessSquare";
import { ChessBoard } from "../../ChessBoard";

export class Rook extends AbstractPiece {
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

    // Can move vertically (dx === 0 &&& dy !== 0)
    if (dx === 0 && dy !== 0) {
      // Check if the path is free.
      for (
        let delta = Math.sign(dy);
        Math.abs(delta) < Math.abs(dy);
        delta += Math.sign(dy)
      ) {
        console.log(delta);
        if (
          board.pieceAt(new ChessSquare(source.row + delta, source.column)) !==
          null
        ) {
          return false;
        }
      }
      return true;
    }

    // Or horizontally (dy === 0 && dx !== 0)
    if (dx !== 0 && dy === 0) {
      // Check if the path is free.
      for (
        let delta = Math.sign(dx);
        Math.abs(delta) < Math.abs(dx);
        delta += Math.sign(dx)
      ) {
        if (
          board.pieceAt(new ChessSquare(source.row, source.column + delta)) !==
          null
        ) {
          return false;
        }
      }
      return true;
    }

    return false;
  }

  public name(): string {
    return "Rook";
  }
}
