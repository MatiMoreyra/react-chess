import { PieceColor, IPiece } from "../IPiece";
import { IBoard } from "../IBoard";
import { parseFen } from "./FenParser";
import { ChessGameEngine, GameResult } from "../ChessGameEngine";
import { RulesPipeline } from "./RulesPipeline";
import { GameState } from "./GameState";
import { Board } from "./extensions/Board";
import { TurnsRule } from "./rules/TurnsRule";
import { KingMovementRule } from "./rules/KingMovementRule";
import { CastlingRule } from "./rules/CastlingRule";
import { PawnShortMovementRule } from "./rules/PawnShortMovementRule";
import { PawnLongMovementRule } from "./rules/PawnLongMovementRule";
import { PawnCaptureMovementRule } from "./rules/PawnCaptureMovementRule";
import { KnightMovementRule } from "./rules/KnightMovementRule";
import { BishopMovementRule } from "./rules/BishopMovementRule";
import { RookMovementRule } from "./rules/RookMovementRule";
import { QueenMovementRule } from "./rules/QueenMovementRule";
import { IMove } from "../IMove";
import { Move } from "./extensions/Move";
import { EnPassantRule } from "./rules/EnPassantRule";
import { Piece } from "./extensions/Piece";
import { CheckRule } from "./rules/CheckRule";
import { GameEndedRule } from "./rules/GameEndedRule";
import { GameInitialPositions } from "./gameInitialPositions/InitialPositions"

export class LocalEngine extends ChessGameEngine {
  private _state: GameState;
  private _pipeline: RulesPipeline;
  private _stateHisory: Array<GameState>;
  constructor() {
    super();
    let pieces = parseFen(GameInitialPositions["Default"]);
    if (pieces == null) {
      throw new Error("Invalid fen");
    }
    this._state = new GameState(
      new Board({ pieces: pieces }),
      PieceColor.White,
      new Array<Move>(),
      new Array<Piece>(),
      false,
      GameResult.Open
    );
    this._pipeline = new RulesPipeline();
    this.setupRulesPipeline();
    this._stateHisory = new Array<GameState>();
  }

  public getChessBoard(): IBoard {
    return this._state.board;
  }

  public getHistory(): Array<IMove> {
    return this._state.history;
  }

  public move(move: IMove): boolean {
    let evaluation = this._pipeline.evaluate(new Move(move), this._state);
    if (evaluation.valid && evaluation.nextState !== undefined) {
      this._stateHisory.push(this._state);
      this._state = evaluation.nextState;
      if (this._state.result !== GameResult.Open) {
        if (this.onGameEnded !== undefined) {
          this.onGameEnded(this._state.result);
        }
      }
      return true;
    }
    return false;
  }

  public isValidMove(move: IMove): boolean {
    return this._pipeline.evaluate(new Move(move), this._state).valid;
  }

  public whoPlays(): PieceColor {
    return this._state.currentTurn;
  }

  public getCapturedPieces(): Array<IPiece> {
    return this._state.capturedPieces;
  }

  public undoMove(): void {
    let lastState = this._stateHisory.pop();
    if (lastState) {
      this._state = lastState;
    }
  }

  public restart(): void {
    if (this._stateHisory.length !== 0) {
      this._state = this._stateHisory[0];
      this._stateHisory = new Array<GameState>();
    }
  }

  private setupRulesPipeline(): void {
    this._pipeline.push(new GameEndedRule());
    this._pipeline.push(new TurnsRule());
    this._pipeline.push(new CheckRule());
    this._pipeline.push(new KingMovementRule());
    this._pipeline.push(new PawnShortMovementRule());
    this._pipeline.push(new PawnLongMovementRule());
    this._pipeline.push(new PawnCaptureMovementRule());
    this._pipeline.push(new KnightMovementRule());
    this._pipeline.push(new BishopMovementRule());
    this._pipeline.push(new RookMovementRule());
    this._pipeline.push(new QueenMovementRule());
    this._pipeline.push(new EnPassantRule());
  }
}
