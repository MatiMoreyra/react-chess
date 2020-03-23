import { PieceColor } from "../IPiece";
import { Board } from "./extensions/Board";
import { Move } from "./extensions/Move";
import { Piece } from "./extensions/Piece";
import { GameResult } from "../ChessGameEngine";

export class GameState {
  public board: Board;
  public currentTurn: PieceColor;
  public history: Array<Move>;
  public capturedPieces: Array<Piece>;
  public onCheck: boolean;
  public result: GameResult;
  public castlingFlags: boolean[][];

  constructor(
    board: Board,
    currentTurn: PieceColor,
    history: Array<Move>,
    capturedPieces: Array<Piece>,
    onCheck: boolean,
    result: GameResult,
    castlingFlags: boolean[][]
  ) {
    this.board = board;
    this.currentTurn = currentTurn;
    this.history = history;
    this.capturedPieces = capturedPieces;
    this.onCheck = onCheck;
    this.result = result;
    this.castlingFlags = castlingFlags;
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
    let clonedCastlingFlags:boolean[][] = [];
    this.castlingFlags.forEach(flags => {
      let newFlags: boolean[]=[];
      flags.forEach(flag=>{
        newFlags.push(flag);
      })
      clonedCastlingFlags.push(newFlags);
    })

    return new GameState(
      clonedBoard,
      this.currentTurn,
      clonedHistory,
      clonedCapturedPieces,
      this.onCheck,
      this.result,
      clonedCastlingFlags
    );
  }
}
