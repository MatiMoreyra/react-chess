import { PieceColor } from "../IPiece";
import { IBoard } from "../IBoard";
import { parseFen } from "./FenParser";
import { ChessGameEngine, IMove } from "../ChessGameEngine";
import { RulesPipeline } from "./RulesPipeline";
import { DummyRule } from "./rules/DummyRule";
import { GameState } from "./GameState";
import { Board } from "./Board";
import { TurnsRule } from "./rules/TurnsRule";

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
    this._pipeline.push(new DummyRule());
  }
}
