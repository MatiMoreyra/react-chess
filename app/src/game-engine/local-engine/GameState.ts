import { PieceColor } from "../IPiece";
import { IMove } from "../ChessGameEngine";
import { Board } from "./Board";

export class GameState {
  public board: Board;
  public currentTurn: PieceColor;
  public history: Array<IMove>;

  constructor(board: Board, currentTurn: PieceColor, history: Array<IMove>) {
    this.board = board;
    this.currentTurn = currentTurn;
    this.history = history;
  }

  // Deep copy
  public clone(): GameState {
    let clonedBoard = this.board.clone();
    let clonedHistory = new Array<IMove>();
    this.history.forEach(m => {
      clonedHistory.push(m);
    });
    return new GameState(clonedBoard, this.currentTurn, clonedHistory);
  }
}
