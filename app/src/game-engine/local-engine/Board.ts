import { IBoard } from "../IBoard";
import { IPiece } from "../IPiece";
import { Square } from "../ISquare";
import { Move } from "./Move";

// Class that provides extension methods to manipulate an IBoard
export class Board implements IBoard {
  readonly pieces: Array<Array<IPiece | null>>;
  constructor(board: IBoard) {
    this.pieces = board.pieces;
  }

  public getPiece(square: Square): IPiece | null {
    return this.pieces[square.row][square.column];
  }

  public setPiece(square: Square, piece: IPiece | null) {
    this.pieces[square.row][square.column] = piece;
  }

  /// Moves the piece at move.source to move.destination and sets
  // the piece at move.source to null.
  public move(move: Move) {
    if (this.getPiece(move.source)) {
      this.setPiece(move.destination, this.getPiece(move.source));
      this.setPiece(move.source, null);
    }
  }

  public clone(): Board {
    let pieces = new Array<Array<IPiece | null>>(8);

    for (let row = 0; row < 8; row++) {
      pieces[row] = new Array<IPiece | null>(8);
      for (let column = 0; column < 8; column++) {
        pieces[row][column] = this.pieces[row][column];
      }
    }

    return new Board({ pieces: pieces });
  }
}
