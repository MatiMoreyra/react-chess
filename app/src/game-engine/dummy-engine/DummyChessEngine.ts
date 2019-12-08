import { AbstractChessEngine, Move } from "../AbstractChessEngine";
import { AbstractPiece, PieceColor } from "../AbstractPiece";
import { ChessBoard } from "../ChessBoard";
import { ChessSquare } from "../ChessSquare";
import { parseFen } from "./FenParser";

export class DummyChessEngine extends AbstractChessEngine {
  private _pieces: Array<Array<AbstractPiece | null>>;
  private _history: Array<Move>;
  private _whoPlays: PieceColor;
  constructor() {
    super();
    let pieces = parseFen("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR");
    if (pieces != null) {
      this._pieces = pieces;
    } else {
      throw new Error("Invalid fen");
    }
    this._history = new Array<Move>();
    this._whoPlays = PieceColor.White;
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
      this._history.push(move);
      this.toggleTurn();
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
    if (piece.canMove(move, this.getChessBoard())) {
      return true;
    }
    return false;
  }

  public whoPlays(): PieceColor {
    return this._whoPlays;
  }

  private pieceAt(square: ChessSquare): AbstractPiece | null {
    return this._pieces[square.row][square.column];
  }

  private setPiece(square: ChessSquare, piece: AbstractPiece | null) {
    this._pieces[square.row][square.column] = piece;
  }

  private toggleTurn() {
    this._whoPlays =
      this._whoPlays === PieceColor.White ? PieceColor.Black : PieceColor.White;
  }
}
