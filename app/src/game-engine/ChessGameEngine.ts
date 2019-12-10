import { Board } from "./Board";
import { Square } from "./Square";
import { PieceColor } from "./Piece";

export enum GameResult {
  WhiteWins,
  BlackWins,
  Draw
}

export interface Move {
  source: Square;
  destination: Square;
}

export abstract class ChessGameEngine {
  public abstract getChessBoard(): Board;
  public abstract getHistory(): Array<Move>;
  public abstract move(move: Move): boolean;
  public abstract isValidMove(move: Move): boolean;
  public abstract whoPlays(): PieceColor;
}
