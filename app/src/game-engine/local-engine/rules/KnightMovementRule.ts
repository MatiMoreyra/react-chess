import { Rule, RuleEvaluationResult } from "../Rule";
import { GameState } from "../GameState";
import { Move } from "../Move";
import { PieceType } from "../../IPiece";

export class KnightMovementRule extends Rule {
  public evaluate(move: Move, state: GameState): RuleEvaluationResult {
    let movingPiece = state.board.getPiece(move.source);

    // If the moving piece is not a king, just delegate the evaluation to the
    // next rule (if exists).
    if (!movingPiece || movingPiece.type !== PieceType.Knight) {
      return this.next ? this.next.evaluate(move, state) : { valid: false };
    }

    // Cannot move if there is a piece of the same color at destination
    let pieceAtDestination = state.board.getPiece(move.destination);
    if (pieceAtDestination && pieceAtDestination.color === movingPiece.color) {
      return { valid: false };
    }

    // Cool solution
    if (Math.abs(move.dx * move.dy) === 2) {
      let nextState = state.clone();
      nextState.board.move(move);
      nextState.history.push(move);
      return {
        valid: true,
        nextState: nextState
      };
    }

    return { valid: false };
  }
}