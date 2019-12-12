import { IBoard } from "./IBoard";
import { Square } from "./ISquare";
import { PieceColor } from "./IPiece";

export enum GameResult {
  WhiteWins,
  BlackWins,
  Draw
}

export interface IMove {
  source: Square;
  destination: Square;
}

export abstract class ChessGameEngine {
  public abstract getChessBoard(): IBoard;
  public abstract getHistory(): Array<IMove>;
  public abstract move(move: IMove): boolean;
  public abstract isValidMove(move: IMove): boolean;
  public abstract whoPlays(): PieceColor;
}
