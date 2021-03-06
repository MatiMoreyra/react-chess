import { Rule, RuleEvaluationResult } from "../Rule";
import { GameState } from "../GameState";
import { Move } from "../extensions/Move";
import { PieceColor, PieceType } from "../../IPiece";
import { Piece } from "../extensions/Piece";

export class PawnCaptureMovementRule extends Rule {
  public evaluate(move: Move, state: GameState): RuleEvaluationResult {
    let movingPiece = state.board.getPiece(move.source);

    // If the moving piece is not a pawn, just delegate the evaluation to the
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

    if (move.dy === validDy && Math.abs(move.dx) === 1) {
      // Can move if there is a piece of the oposite color at destination
      let pieceAtDestination = state.board.getPiece(move.destination);
      if (
        pieceAtDestination &&
        pieceAtDestination.color !== movingPiece.color
      ) {
        let nextState = state.clone();
        nextState.board.move(move);
        nextState.history.push(move);
        nextState.capturedPieces.push(new Piece(pieceAtDestination));
        return {
          valid: true,
          nextState: nextState,
        };
      }
    }

    // Just evaluate other pawn movement rules.
    return this.nextOrInvalidResult(move, state);
  }
}
