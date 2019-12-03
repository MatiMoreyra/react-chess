import { AbstractChessEngine, Move } from "../AbstractChessEngine";
import { AbstractPiece, PieceColor } from "../AbstractPiece";
import { King } from "./pieces/King";
import { ChessBoard } from "../ChessBoard";
import { ChessSquare } from "../ChessSquare";

export class DummyChessEngine extends AbstractChessEngine {
  private _pieces: Array<Array<AbstractPiece | null>>;
  private _history: Array<Move>;
  constructor() {
    super();
    this._pieces = new Array<Array<AbstractPiece | null>>(8);
    for (let row = 0; row < 8; row++) {
      this._pieces[row] = new Array<AbstractPiece | null>(8).fill(null);
    }
    this._pieces[0][0] = new King(PieceColor.White);
    this._history = new Array<Move>();
  }

  public getChessBoard(): ChessBoard {
    return new ChessBoard(this._pieces);
  }

  public getHistory(): Array<Move> {
    return this._history;
  }

  public move(move: Move): boolean {
    if (this.isValidMove(move)) {
      this.setPiece(move.destination, this.pieceAt(move.source));
      this.setPiece(move.source, null);
      return true;
    }
    return false;
  }

  public isValidMove(move: Move): boolean {
    if (move.destination.equals(move.source)) {
      return false;
    }
    let piece = this.pieceAt(move.source);
    if (piece == null) {
      return false;
    }
    if (piece.color !== this.whoPlays()) {
      return false;
    }
    if (piece.canMove(move.source, move.destination, this.getChessBoard())) {
      return true;
    }
    return false;
  }

  public whoPlays(): PieceColor {
    return PieceColor.White;
  }

  private pieceAt(square: ChessSquare): AbstractPiece | null {
    return this._pieces[square.row][square.column];
  }

  private setPiece(square: ChessSquare, piece: AbstractPiece | null) {
    this._pieces[square.row][square.column] = piece;
  }
}
