import { PieceColor } from "../Piece";
import { Board } from "../Board";
import { parseFen } from "./FenParser";
import { ChessGameEngine, Move } from "../ChessGameEngine";

export class LocalEngine extends ChessGameEngine {
  private _board: Board;
  private _history: Array<Move>;
  private _whoPlays: PieceColor;
  constructor() {
    super();
    let pieces = parseFen("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR");
    if (pieces != null) {
      this._board = {pieces: pieces};
    } else {
      throw new Error("Invalid fen");
    }
    this._history = new Array<Move>();
    this._whoPlays = PieceColor.White;
  }

  public getChessBoard(): Board {
    return this._board;
  }

  public getHistory(): Array<Move> {
    return this._history;
  }

  public move(move: Move): boolean {
      return true;
  }

  public isValidMove(move: Move): boolean {
    return true;
  }

  public whoPlays(): PieceColor {
    return this._whoPlays;
  }

  private toggleTurn() {
    this._whoPlays =
      this._whoPlays === PieceColor.White ? PieceColor.Black : PieceColor.White;
  }
}
