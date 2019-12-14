import { Rule, RuleEvaluationResult } from "../Rule";
import { GameState } from "../GameState";
import { Move } from "../extensions/Move";
import { PieceType } from "../../IPiece";

export class QueenMovementRule extends Rule {
  public evaluate(move: Move, state: GameState): RuleEvaluationResult {
    let movingPiece = state.board.getPiece(move.source);

    // If the moving piece is not a king, just delegate the evaluation to the
    // next rule (if exists).
    if (!movingPiece || movingPiece.type !== PieceType.Queen) {
      return this.nextOrInvalidResult(move, state);
    }

    // Cannot move if there is a piece of the same color at destination
    let pieceAtDestination = state.board.getPiece(move.destination);
    if (pieceAtDestination && pieceAtDestination.color === movingPiece.color) {
      return { valid: false };
    }

    if (!move.isDiagonal() && !move.isVertical() && !move.isHorizontal()) {
      return { valid: false };
    }

    // Check if the path is clear
    if (!state.board.isPathFree(move)) {
      return { valid: false };
    }

    // Everything is fine, can move.
    let nextState = state.clone();
    nextState.board.move(move);
    nextState.history.push(move);
    return {
      valid: true,
      nextState: nextState
    };
  }
}
