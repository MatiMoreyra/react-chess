import { IMove } from "../IMove";
import { GameState } from "./GameState";

export interface RuleEvaluationResult {
  valid: boolean;
  nextState?: GameState;
}

// A Rule is basically a function which validates or invalidates a Move given
// a GameState.
// These rules will be execute as a pipeline.
// Each rule can perform operations before and after the evaluation of the next rule.
// Example:
//
// This rule checks if the piece at the source square is not null.
//
// evaluate(move: Move, state: GameState): RuleEvaluationResult {
//   // If the piece at source is null, return an invalid evaluation.
//   // Returning before calling nextevaluate.(move, state) short-cirtuits the
//   // pipeline.
//   if (state.board[move.source.row][move.source.row]) {
//     return {valid: false};
//   }

//   // If not null, just delegate the decision to the next rule or invalidate
//   // the result if there isn't one.
//   return next != undefined ? next.evaluate(move, state) : {valid: false};
// }
//

export abstract class Rule {
  /// Reference of the next rule in the pipeline
  public next?: Rule;
  public abstract evaluate(move: IMove, state: GameState): RuleEvaluationResult;
}
