import { IBoard } from "./IBoard";
import { PieceColor, IPiece } from "./IPiece";
import { IMove } from "./IMove";

export enum GameResult {
  CheckMate = "Checkmate",
  Draw = "Draw",
  Open = "Open"
}

export abstract class ChessGameEngine {
  public abstract getChessBoard(): IBoard;
  public abstract getHistory(): Array<IMove>;
  public abstract getCapturedPieces(): Array<IPiece>;
  public abstract move(move: IMove): boolean;
  public abstract isValidMove(move: IMove): boolean;
  public abstract whoPlays(): PieceColor;
  public abstract undoMove(): void;
  public abstract restart(): void;
  public onGameEnded?: (result: GameResult) => void;
}
