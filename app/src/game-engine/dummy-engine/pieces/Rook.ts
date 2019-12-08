import { AbstractPiece } from "../../AbstractPiece";
import { ChessSquare } from "../../ChessSquare";
import { ChessBoard } from "../../ChessBoard";
import { Move } from "../../AbstractChessEngine";

export class Rook extends AbstractPiece {
  public canMove(move: Move, board: ChessBoard): boolean {
    // Cannot move if there is a piece of the same color at destination
    let pieceAtDestination = board.pieceAt(move.destination);
    if (pieceAtDestination != null && pieceAtDestination.color === this.color) {
      return false;
    }

    let dx = move.destination.column - move.source.column;
    let dy = move.destination.row - move.source.row;

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
          board.pieceAt(
            new ChessSquare(move.source.row + delta, move.source.column)
          ) !== null
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
          board.pieceAt(
            new ChessSquare(move.source.row, move.source.column + delta)
          ) !== null
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
