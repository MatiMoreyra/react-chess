import { PieceColor } from "../IPiece";
import { IBoard } from "../IBoard";
import { parseFen } from "./FenParser";
import { ChessGameEngine, IMove } from "../ChessGameEngine";
import { RulesPipeline } from "./RulesPipeline";
import { GameState } from "./GameState";
import { Board } from "./Board";
import { TurnsRule } from "./rules/TurnsRule";
import { KingMovementRule } from "./rules/KingMovementRule";
import { PawnShortMovementRule } from "./rules/PawnShortMovementRule";
import { PawnLongMovementRule } from "./rules/PawnLongMovementRule";
import { PawnCaptureMovementRule } from "./rules/PawnCaptureMovementRule";
import { KnightMovementRule } from "./rules/KnightMovementRule";
import { BishopMovementRule } from "./rules/BishopMovementRule";
import { RookMovementRule } from "./rules/RookMovementRule";

export class LocalEngine extends ChessGameEngine {
  private _state: GameState;
  private _pipeline: RulesPipeline;
  constructor() {
    super();
    let pieces = parseFen("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR");
    if (pieces == null) {
      throw new Error("Invalid fen");
    }
    this._state = new GameState(
      new Board({ pieces: pieces }),
      PieceColor.White,
      new Array<IMove>()
    );
    this._pipeline = new RulesPipeline();
    this.setupRulesPipeline();
  }

  public getChessBoard(): IBoard {
    return this._state.board;
  }

  public getHistory(): Array<IMove> {
    return this._state.history;
  }

  public move(move: IMove): boolean {
    let evaluation = this._pipeline.evaluate(move, this._state);
    if (evaluation.valid && evaluation.nextState !== undefined) {
      this._state = evaluation.nextState;
    }
    return true;
  }

  public isValidMove(move: IMove): boolean {
    return this._pipeline.evaluate(move, this._state).valid;
  }

  public whoPlays(): PieceColor {
    return this._state.currentTurn;
  }

  private setupRulesPipeline(): void {
    this._pipeline.push(new TurnsRule());
    this._pipeline.push(new KingMovementRule());
    this._pipeline.push(new PawnShortMovementRule());
    this._pipeline.push(new PawnLongMovementRule());
    this._pipeline.push(new PawnCaptureMovementRule());
    this._pipeline.push(new KnightMovementRule());
    this._pipeline.push(new BishopMovementRule());
    this._pipeline.push(new RookMovementRule());
  }
}
