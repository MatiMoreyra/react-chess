import { Rule, RuleEvaluationResult } from "../Rule";
import { GameState } from "../GameState";
import { IMove } from "../../ChessGameEngine";
import { PieceType } from "../../IPiece";

export class KnightMovementRule extends Rule {
  public evaluate(move: IMove, state: GameState): RuleEvaluationResult {
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

    let dy = move.destination.row - move.source.row;
    let dx = move.destination.column - move.source.column;

    // Cool solution
    if (Math.abs(dx * dy) === 2) {
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
