import { Rule, RuleEvaluationResult } from "../Rule";
import { GameState } from "../GameState";
import { Move } from "../Move";
import { PieceColor, PieceType } from "../../IPiece";

export class PawnShortMovementRule extends Rule {
  public evaluate(move: Move, state: GameState): RuleEvaluationResult {
    let movingPiece = state.board.getPiece(move.source);

    // If the moving piece is not a king, just delegate the evaluation to the
    // next rule (if exists).
    if (!movingPiece || movingPiece.type !== PieceType.Pawn) {
      return this.next ? this.next.evaluate(move, state) : { valid: false };
    }

    let validDy = 0;
    switch (movingPiece.color) {
      case PieceColor.White:
        validDy = -1; // From bottom to top
        break;

      case PieceColor.Black:
        validDy = 1; // From top to bottom
        break;
    }

    if (move.dy === validDy && Math.abs(move.dx) === 0) {
      // Can move if the destination square is empty.
      let pieceAtDestination = state.board.getPiece(move.destination);
      if (pieceAtDestination === null) {
        let nextState = state.clone();
        nextState.board.move(move);
        nextState.history.push(move);
        return {
          valid: true,
          nextState: nextState
        };
      }
    }

    // Just evaluate other pawn movement rules.
    return this.next ? this.next.evaluate(move, state) : { valid: false };
  }
}
