import { Rule, RuleEvaluationResult } from "../Rule";
import { GameState } from "../GameState";
import { Move } from "../Move";
import { PieceType } from "../../IPiece";

export class QueenMovementRule extends Rule {
  public evaluate(move: Move, state: GameState): RuleEvaluationResult {
    let movingPiece = state.board.getPiece(move.source);

    // If the moving piece is not a king, just delegate the evaluation to the
    // next rule (if exists).
    if (!movingPiece || movingPiece.type !== PieceType.Queen) {
      return this.next ? this.next.evaluate(move, state) : { valid: false };
    }

    // Cannot move if there is a piece of the same color at destination
    let pieceAtDestination = state.board.getPiece(move.destination);
    if (pieceAtDestination && pieceAtDestination.color === movingPiece.color) {
      return { valid: false };
    }

    if (!move.isDiagonal() && !move.isVertical() && !move.isVertical()) {
      return { valid: false };
    }

    // Check if the path is clear
    let advance = 1;
    while (advance < Math.abs(move.dx) || advance < Math.abs(move.dy)) {
      let col = move.source.column + advance * Math.sign(move.dy);
      let row = move.source.row + advance * Math.sign(move.dy);
      if (state.board.getPiece({ row: row, column: col }) !== null) {
        return { valid: false };
      }
      advance++;
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
