import { AbstractPiece, PieceColor } from "../../AbstractPiece";
import { ChessSquare } from "../../ChessSquare";
import { ChessBoard } from "../../ChessBoard";
import { Move } from "../../AbstractChessEngine";

export class Pawn extends AbstractPiece {
  public canMove(move: Move, board: ChessBoard): boolean {
    if (this.checkAdvanceMove(move, board)) {
      return true;
    }
    if (this.checkCaptureMove(move, board)) {
      return true;
    }
    if (this.checkLongMove(move, board)) {
      return true;
    }
    return false;
  }

  public name(): string {
    return "Pawn";
  }

  private checkCaptureMove(move: Move, board: ChessBoard): boolean {
    let validDy: number = 0;
    switch (this.color) {
      case PieceColor.White:
        validDy = -1; // From bottom to top
        break;

      case PieceColor.Black:
        validDy = 1; // From top to bottom
        break;
    }

    let dy = move.destination.row - move.source.row;
    let dx = move.destination.column - move.source.column;

    if (dy === validDy && Math.abs(dx) === 1) {
      // Can move if there is a piece of the oposite color at destination.
      let pieceAtDestination = board.pieceAt(move.destination);
      if (
        pieceAtDestination != null &&
        pieceAtDestination.color !== this.color
      ) {
        return true;
      }
    }

    return false;
  }

  private checkAdvanceMove(move: Move, board: ChessBoard): boolean {
    let validDy: number = 0;
    switch (this.color) {
      case PieceColor.White:
        validDy = -1; // From bottom to top
        break;

      case PieceColor.Black:
        validDy = 1; // From top to bottom
        break;
    }

    let dy = move.destination.row - move.source.row;
    let dx = move.destination.column - move.source.column;

    if (dy === validDy && Math.abs(dx) === 0) {
      // Can move if the destination square is empty.
      let pieceAtDestination = board.pieceAt(move.destination);
      if (pieceAtDestination === null) {
        return true;
      }
    }

    return false;
  }

  private checkLongMove(move: Move, board: ChessBoard): boolean {
    let validSourceRow: number = 0;
    let validDirection: number = 0;
    switch (this.color) {
      case PieceColor.White:
        validSourceRow = 6;
        validDirection = -1; // From bottom to top
        break;

      case PieceColor.Black:
        validSourceRow = 1;
        validDirection = 1; // From top to bottom
        break;
    }

    let dy = move.destination.row - move.source.row;
    let dx = move.destination.column - move.source.column;

    if (
      dy === validDirection * 2 &&
      move.source.row === validSourceRow &&
      Math.abs(dx) === 0
    ) {
      // Can move if the destination square is empty and can advance to the
      // next square.
      let pieceAtDestination = board.pieceAt(move.destination);
      let pieceAtNextSquare = board.pieceAt(
        new ChessSquare(validSourceRow + validDirection, move.source.column)
      );
      if (pieceAtDestination === null && pieceAtNextSquare === null) {
        return true;
      }
    }
    return false;
  }
}
