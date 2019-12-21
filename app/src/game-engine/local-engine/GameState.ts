import { PieceColor } from "../IPiece";
import { Board } from "./extensions/Board";
import { Move } from "./extensions/Move";
import { Piece } from "./extensions/Piece";

export class GameState {
  public board: Board;
  public currentTurn: PieceColor;
  public history: Array<Move>;
  public capturedPieces: Array<Piece>;

  constructor(
    board: Board,
    currentTurn: PieceColor,
    history: Array<Move>,
    capturedPieces: Array<Piece>
  ) {
    this.board = board;
    this.currentTurn = currentTurn;
    this.history = history;
    this.capturedPieces = capturedPieces;
  }

  // Deep copy
  public clone(): GameState {
    let clonedBoard = this.board.clone();
    let clonedHistory = new Array<Move>();
    this.history.forEach(m => {
      clonedHistory.push(m);
    });
    let clonedCapturedPieces = new Array<Piece>();
    this.capturedPieces.forEach(p => {
      clonedCapturedPieces.push(p.clone());
    });
    return new GameState(
      clonedBoard,
      this.currentTurn,
      clonedHistory,
      clonedCapturedPieces
    );
  }
}
