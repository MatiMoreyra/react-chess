import { Rule, RuleEvaluationResult } from "../Rule";
import { GameState } from "../GameState";
import { PieceType } from "../../IPiece";
import { Move } from "../extensions/Move";
import { Piece } from "../extensions/Piece";

export class KingMovementRule extends Rule {
  public evaluate(move: Move, state: GameState): RuleEvaluationResult {
    let movingPiece = state.board.getPiece(move.source);
    if (!!movingPiece){
      // If the moving piece is not a king, just delegate the evaluation to the
      // next rule (if exists).
      if (movingPiece.type !== PieceType.King) {
        return this.nextOrInvalidResult(move, state);
      }

      // Cannot move if there is a piece of the same color at destination
      let pieceAtDestination = state.board.getPiece(move.destination);
      if (pieceAtDestination && pieceAtDestination.color === movingPiece.color) {
        return { valid: false };
      }

      // Can move 1 square away in any direction
      if (Math.abs(move.dx) <= 1 && Math.abs(move.dy) <= 1) {
        let nextState = state.clone();
        nextState.board.move(move);
        nextState.history.push(move);
        if (pieceAtDestination) {
          nextState.capturedPieces.push(new Piece(pieceAtDestination));
        }
        return {
          valid: true,
          nextState: nextState
        };
      }

      return this.nextOrInvalidResult(move, state); 
    }
    return { valid: false };
  }
}

