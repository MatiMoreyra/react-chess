import { Rule, RuleEvaluationResult } from "../Rule";
import { GameState } from "../GameState";
import { PieceType } from "../../IPiece";
import { Move } from "../extensions/Move";
import { Piece } from "../extensions/Piece";

export class BishopMovementRule extends Rule {
  public evaluate(move: Move, state: GameState): RuleEvaluationResult {
    let movingPiece = state.board.getPiece(move.source);

    // If the moving piece is not a bishop, just delegate the evaluation to the
    // next rule (if exists).
    if (!movingPiece || movingPiece.type !== PieceType.Bishop) {
      return this.nextOrInvalidResult(move, state);
    }

    // Diagonal movement means abs(dx) === abs(dy)
    if (!move.isDiagonal()) {
      return { valid: false };
    }

    // Check if the path is clear
    if (!state.board.isPathFree(move)) {
      return { valid: false };
    }

    // Cannot move if there is a piece of the same color at destination
    let pieceAtDestination = state.board.getPiece(move.destination);
    if (pieceAtDestination && pieceAtDestination.color === movingPiece.color) {
      return { valid: false };
    }

    // Everything is fine, can move.
    let nextState = state.clone();
    nextState.board.move(move);
    nextState.history.push(move);
    if (pieceAtDestination) {
      nextState.capturedPieces.push(new Piece(pieceAtDestination));
    }
    return {
      valid: true,
      nextState: nextState,
    };
  }
}
