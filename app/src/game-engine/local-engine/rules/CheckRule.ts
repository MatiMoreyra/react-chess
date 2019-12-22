import { Rule, RuleEvaluationResult } from "../Rule";
import { GameState } from "../GameState";
import { Move } from "../extensions/Move";
import { PieceColor, PieceType } from "../../IPiece";
import { Square } from "../extensions/Square";
import { ISquare } from "../../ISquare";

export class CheckRule extends Rule {
  public evaluate(move: Move, state: GameState): RuleEvaluationResult {
    // Evaluate the chain of rules.
    let result = this.nextOrInvalidResult(move, state);

    if (result.valid && result.nextState) {
      // Invalidate the move if the player who moved is on check after the move
      if (this.isChecked(result.nextState, result.nextState.currentTurn)) {
        return { valid: false };
      }
      let nextTurn =
        state.currentTurn === PieceColor.White
          ? PieceColor.Black
          : PieceColor.White;

      result.nextState.onCheck = this.isChecked(result.nextState, nextTurn);
    }
    return result;
  }

  private isChecked(state: GameState, color: PieceColor): boolean {
    // First, find the king of the given color
    let kingSquare;
    for (let row = 0; row < 8; row++) {
      for (let column = 0; column < 8; column++) {
        let square: ISquare = { row: row, column: column };
        let piece = state.board.getPiece({ row: row, column: column });
        if (piece && piece.type === PieceType.King && piece.color === color) {
          kingSquare = new Square(square);
          break;
        }
      }
    }

    if (kingSquare === undefined) {
      return false;
    }

    // Now check if any piece of the oposite color can move to the king square
    for (let row = 0; row < 8; row++) {
      for (let column = 0; column < 8; column++) {
        let source: ISquare = { row: row, column: column };
        let piece = state.board.getPiece(source);
        if (piece && piece.color !== color) {
          let move: Move = new Move({
            source: source,
            destination: kingSquare
          });
          let result = this.nextOrInvalidResult(move, state);
          if (result.valid) {
            return true;
          }
        }
      }
    }
    return false;
  }
}
