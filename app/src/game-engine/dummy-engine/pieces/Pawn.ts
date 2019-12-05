import { AbstractPiece, PieceColor } from "../../AbstractPiece";
import { ChessSquare } from "../../ChessSquare";
import { ChessBoard } from "../../ChessBoard";

export class Pawn extends AbstractPiece {
  public canMove(
    source: ChessSquare,
    destination: ChessSquare,
    board: ChessBoard
  ): boolean {
    if (this.checkAdvanceMove(source, destination, board)) {
      return true;
    }
    if (this.checkCaptureMove(source, destination, board)) {
      return true;
    }
    if (this.checkLongMove(source, destination, board)) {
      return true;
    }
    return false;
  }

  public name(): string {
    return "Pawn";
  }

  private checkCaptureMove(
    source: ChessSquare,
    destination: ChessSquare,
    board: ChessBoard
  ): boolean {
    let validDy: number = 0;
    switch (this.color) {
      case PieceColor.White:
        validDy = -1; // From bottom to top
        break;

      case PieceColor.Black:
        validDy = 1; // From top to bottom
        break;
    }

    let dy = destination.row - source.row;
    let dx = destination.column - source.column;

    if (dy === validDy && Math.abs(dx) === 1) {
      // Can move if there is a piece of the oposite color at destination.
      let pieceAtDestination = board.pieceAt(destination);
      if (
        pieceAtDestination != null &&
        pieceAtDestination.color !== this.color
      ) {
        return true;
      }
    }

    return false;
  }

  private checkAdvanceMove(
    source: ChessSquare,
    destination: ChessSquare,
    board: ChessBoard
  ): boolean {
    let validDy: number = 0;
    switch (this.color) {
      case PieceColor.White:
        validDy = -1; // From bottom to top
        break;

      case PieceColor.Black:
        validDy = 1; // From top to bottom
        break;
    }

    let dy = destination.row - source.row;
    let dx = destination.column - source.column;

    if (dy === validDy && Math.abs(dx) === 0) {
      // Can move if the destination square is empty.
      let pieceAtDestination = board.pieceAt(destination);
      if (pieceAtDestination === null) {
        return true;
      }
    }

    return false;
  }

  private checkLongMove(
    source: ChessSquare,
    destination: ChessSquare,
    board: ChessBoard
  ): boolean {
    let validRow: number = 0;
    let validDy: number = 0;
    switch (this.color) {
      case PieceColor.White:
        validRow = 6;
        validDy = -2; // From bottom to top
        break;

      case PieceColor.Black:
        validRow = 1;
        validDy = 2; // From top to bottom
        break;
    }

    let dy = destination.row - source.row;
    let dx = destination.column - source.column;

    if (dy === validDy && source.row === validRow && Math.abs(dx) === 0) {
      // Can move if the destination square is empty and can advance to the next square.
      let pieceAtDestination = board.pieceAt(destination);
      let pieceAtNextSquare = board.pieceAt(
        new ChessSquare(validRow + validDy / 2, source.column)
      );
      if (pieceAtDestination === null && pieceAtNextSquare === null) {
        return true;
      }
    }
    return false;
  }
}
