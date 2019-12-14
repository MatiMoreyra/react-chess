import { IBoard } from "./IBoard";
import { PieceColor } from "./IPiece";
import { IMove } from "./IMove";

export enum GameResult {
  WhiteWins,
  BlackWins,
  Draw
}

export abstract class ChessGameEngine {
  public abstract getChessBoard(): IBoard;
  public abstract getHistory(): Array<IMove>;
  public abstract move(move: IMove): boolean;
  public abstract isValidMove(move: IMove): boolean;
  public abstract whoPlays(): PieceColor;
}
