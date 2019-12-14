import { Rule, RuleEvaluationResult } from "../Rule";
import { GameState } from "../GameState";
import { Move } from "../Move";
import { PieceColor, PieceType } from "../../IPiece";

export class PawnLongMovementRule extends Rule {
  public evaluate(move: Move, state: GameState): RuleEvaluationResult {
    let movingPiece = state.board.getPiece(move.source);

    // If the moving piece is not a king, just delegate the evaluation to the
    // next rule (if exists).
    if (!movingPiece || movingPiece.type !== PieceType.Pawn) {
      return this.next ? this.next.evaluate(move, state) : { valid: false };
    }

    let validSourceRow = 0;
    let validDestinationRow = 0;
    let middleRow = 0;
    switch (movingPiece.color) {
      // White pawns can make moves from column 6 to 4
      case PieceColor.White:
        validSourceRow = 6;
        middleRow = 5;
        validDestinationRow = 4;
        break;

      // Black pawns can make moves from column 1 to 3
      case PieceColor.Black:
        validSourceRow = 1;
        middleRow = 2;
        validDestinationRow = 3;
        break;
    }

    if (
      move.source.row === validSourceRow &&
      move.destination.row === validDestinationRow &&
      Math.abs(move.dx) === 0
    ) {
      // Can move if the destination square and the path to it empty.
      let pieceAtDestination = state.board.getPiece(move.destination);
      let pieceAtPath = state.board.getPiece({
        row: middleRow,
        column: move.source.column
      });
      if (pieceAtDestination === null && pieceAtPath == null) {
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
