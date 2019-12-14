import { Rule, RuleEvaluationResult } from "./Rule";
import { GameState } from "./GameState";
import { Move } from "./extension-classes/Move";

export class RulesPipeline {
  private _firstRule?: Rule;

  public push(rule: Rule): void {
    if (this._firstRule === undefined) {
      this._firstRule = rule;
    } else {
      // Find the last one and append the incoming rule
      let last = this._firstRule;
      while (last.next !== undefined) {
        last = last.next;
      }
      last.next = rule;
    }
  }

  public evaluate(move: Move, state: GameState): RuleEvaluationResult {
    if (this._firstRule !== undefined) {
      return this._firstRule.evaluate(move, state);
    }
    return { valid: false };
  }
}
