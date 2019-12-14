import { Rule, RuleEvaluationResult } from "../Rule";
import { GameState } from "../GameState";
import { Move } from "../extension-classes/Move";
import { PieceColor, PieceType } from "../../IPiece";

export class EnPassantRule extends Rule {
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

    if (move.dy === validDy && Math.abs(move.dx) === 1) {
      // Can move if the last move was a long pawn move at destination column
      // from destination row + validDy to destination row - validDy.

      let backSquare = {
        column: move.destination.column,
        row: move.source.row
      };

      let pieceBehind = state.board.getPiece(backSquare);

      let lastMove = state.history[state.history.length - 1];

      if (
        pieceBehind &&
        pieceBehind.type === PieceType.Pawn && // Piece behind should be a pawn
        pieceBehind.color !== movingPiece.color && // of the oposite color
        // which did a long move in the last turn.
        Math.abs(lastMove.dy) === 2 &&
        lastMove.destination.column === backSquare.column &&
        lastMove.destination.row === backSquare.row
      ) {
        let nextState = state.clone();
        nextState.board.move(move);
        nextState.history.push(move);
        nextState.board.setPiece(backSquare, null);
        return {
          valid: true,
          nextState: nextState
        };
      }
    }

    // Just evaluate other pawn movement rules.
    return this.nextOrInvalidResult(move, state);
  }
}
