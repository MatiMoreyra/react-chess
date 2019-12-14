import { Rule, RuleEvaluationResult } from "../Rule";
import { GameState } from "../GameState";
import { IMove } from "../../ChessGameEngine";
import { PieceType } from "../../IPiece";

export class QueenMovementRule extends Rule {
  public evaluate(move: IMove, state: GameState): RuleEvaluationResult {
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

    let dx = move.destination.column - move.source.column;
    let dy = move.destination.row - move.source.row;

    // Straight movement means abs(dx) === 0 or abs(dy) === 0 but not both, so:
    if (!this.isDiagonal(dx, dy) && !this.isStraightLine(dx, dy)) {
      console.log("invalid queen move");
      return { valid: false };
    }

    // Check if the path is free
    let advance = 1;
    while (advance < Math.abs(dx) || advance < Math.abs(dy)) {
      let col = move.source.column + advance * Math.sign(dx);
      let row = move.source.row + advance * Math.sign(dy);
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

  private isStraightLine(dx: number, dy: number) {
    return Math.abs(dx) * Math.abs(dy) === 0 && dx !== dy;
  }

  private isDiagonal(dx: number, dy: number) {
    return Math.abs(dx)=== Math.abs(dy) && dx !== 0;
  }
}
