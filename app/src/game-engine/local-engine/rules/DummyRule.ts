import { Rule, RuleEvaluationResult } from "../Rule";
import { GameState } from "../GameState";
import { Move } from "../extensions/Move";

export class DummyRule extends Rule {
  public evaluate(move: Move, state: GameState): RuleEvaluationResult {
    let nextState = state.clone();
    nextState.board.move(move);
    nextState.history.push(move);
    return {
      valid: true,
      nextState: nextState,
    };
  }
}
