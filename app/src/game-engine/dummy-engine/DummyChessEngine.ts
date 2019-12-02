import { AbstractChessEngine, Move } from "../AbstractChessEngine";
import { AbstractPiece, PieceColor } from "../AbstractPiece";
import { King } from "./pieces/King";
import { ChessBoard } from "../ChessBoard";

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
    this._pieces[move.destination.row][move.destination.column] = this._pieces[
      move.source.row
    ][move.source.column];
    this._pieces[move.source.row][move.source.column] = null;
    return true;
  }
  public isValidMove(move: Move): boolean {
    return true;
  }
  public whoPlays(): PieceColor {
    return PieceColor.White;
  }
}
