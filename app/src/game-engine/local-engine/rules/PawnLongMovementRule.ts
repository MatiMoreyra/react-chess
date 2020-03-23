import { Rule, RuleEvaluationResult } from "../Rule";
import { GameState } from "../GameState";
import { Move } from "../extensions/Move";
import { PieceColor, PieceType } from "../../IPiece";

export class PawnLongMovementRule extends Rule {
  public evaluate(move: Move, state: GameState): RuleEvaluationResult {
    let movingPiece = state.board.getPiece(move.source);
    if (!!movingPiece){
      // If the moving piece is not a king, just delegate the evaluation to the
      // next rule (if exists).
      if (movingPiece.type !== PieceType.Pawn) {
        return this.next ? this.next.evaluate(move, state) : { valid: false };
      }

      let validSourceRow = 0;
      let validDestinationRow = 0;
      switch (movingPiece.color) {
        // White pawns can make moves from column 6 to 4
        case PieceColor.White:
          validSourceRow = 6;
          validDestinationRow = 4;
          break;

        // Black pawns can make moves from column 1 to 3
        case PieceColor.Black:
          validSourceRow = 1;
          validDestinationRow = 3;
          break;
      }

      if (
        move.source.row === validSourceRow &&
        move.destination.row === validDestinationRow &&
        Math.abs(move.dx) === 0 &&
        state.board.isPathFree(move) && // The path should be empty
        !state.board.getPiece(move.destination) // Destination should be empty
      ) {
        let nextState = state.clone();
        nextState.board.move(move);
        nextState.history.push(move);
        return {
          valid: true,
          nextState: nextState
        };
      }
      // Just evaluate other pawn movement rules.
      return this.nextOrInvalidResult(move, state);
    }
  return { valid: false };
  }
}
