import { Rule, RuleEvaluationResult } from "../Rule";
import { GameState } from "../GameState";
import { IMove } from "../../ChessGameEngine";

export class DummyRule extends Rule {
  public evaluate(move: IMove, state: GameState): RuleEvaluationResult {
    let nextState = state.clone();
    let movingPiece = nextState.board.getPiece(move.source);
    nextState.board.setPiece(move.destination, movingPiece);
    nextState.board.setPiece(move.source, null);
    nextState.history.push(move);
    return {
      valid: true,
      nextState: nextState
    };
  }
}
