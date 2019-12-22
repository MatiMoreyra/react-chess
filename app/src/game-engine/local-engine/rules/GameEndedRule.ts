import { Rule, RuleEvaluationResult } from "../Rule";
import { GameState } from "../GameState";
import { Move } from "../extensions/Move";
import { ISquare } from "../../ISquare";
import { GameResult } from "../../ChessGameEngine";

export class GameEndedRule extends Rule {
  public evaluate(move: Move, state: GameState): RuleEvaluationResult {
    // Evaluate all rules.
    let evaluation = this.nextOrInvalidResult(move, state);

    if (!evaluation.nextState) {
      return evaluation;
    }
    if (!evaluation.valid) {
      return evaluation;
    }

    // If the evaluation is valid, check if there are possible moves.
    for (let sRow = 0; sRow < 8; sRow++) {
      for (let sColumn = 0; sColumn < 8; sColumn++) {
        let source: ISquare = { row: sRow, column: sColumn };
        let piece = state.board.getPiece({ row: sRow, column: sColumn });
        if (piece && piece.color === evaluation.nextState.currentTurn) {
          for (let dRow = 0; dRow < 8; dRow++) {
            for (let dColumn = 0; dColumn < 8; dColumn++) {
              let dest: ISquare = { row: dRow, column: dColumn };
              let move = new Move({ source: source, destination: dest });
              if (this.nextOrInvalidResult(move, evaluation.nextState).valid) {
                return evaluation;
              }
            }
          }
        }
      }
    }

    evaluation.nextState.result = evaluation.nextState.onCheck
      ? GameResult.CheckMate
      : GameResult.Draw;

    return evaluation;
  }
}
