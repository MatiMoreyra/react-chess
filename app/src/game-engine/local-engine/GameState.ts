import { PieceColor } from "../IPiece";
import { Board } from "./extension-classes/Board";
import { Move } from "./extension-classes/Move";

export class GameState {
  public board: Board;
  public currentTurn: PieceColor;
  public history: Array<Move>;

  constructor(board: Board, currentTurn: PieceColor, history: Array<Move>) {
    this.board = board;
    this.currentTurn = currentTurn;
    this.history = history;
  }

  // Deep copy
  public clone(): GameState {
    let clonedBoard = this.board.clone();
    let clonedHistory = new Array<Move>();
    this.history.forEach(m => {
      clonedHistory.push(m);
    });
    return new GameState(clonedBoard, this.currentTurn, clonedHistory);
  }
}
