import { Rule, RuleEvaluationResult } from "../Rule";
import { GameState } from "../GameState";
import { IMove } from "../../ChessGameEngine";
import { PieceColor } from "../../IPiece";

export class TurnsRule extends Rule {
  public evaluate(move: IMove, state: GameState): RuleEvaluationResult {
    let movingPiece = state.board.getPiece(move.source);

    // If the moving piece is not of the same color of the current turn
    // jus return an invalid result.
    if (movingPiece && movingPiece.color !== state.currentTurn) {
      return { valid: false };
    }

    if (!this.next) {
      return { valid: false };
    }
    // If the color is valid, continue evaluating rules.
    let result = this.next.evaluate(move, state);

    // Now if the evaluation is valid change the current turn color.
    if (result && result.valid && result.nextState) {
      result.nextState.currentTurn =
        result.nextState.currentTurn === PieceColor.White
          ? PieceColor.Black
          : PieceColor.White;
    }

    return result ? result : { valid: false };
  }
}
