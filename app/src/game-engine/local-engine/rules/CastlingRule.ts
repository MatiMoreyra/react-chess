import { Rule, RuleEvaluationResult } from "../Rule";
import { GameState } from "../GameState";
import { Move } from "../extensions/Move";


// this should check many rules
// I think the best way to iplement this rule is to make an inner pipeline of rules

// king and tower must have never moved before
// there must be empty spaces between the 2 pieces
// castling zone must no be under attack ( like an invisible line trying to check )
// king can't be under check

// can we propose that at the beggining shoot the castling when the king is trying to move to the specific squares of castling?
// should we extend king and rook rules? get ideas frome pawn short and long movement


// there will be short and long castling
// short must be to the right of the king
// short allows king 1 movement and tower 2
// long must be to the left
// long allows king 2 movement and tower 3
// from this I conclude that therw could be a predefined moved for each of the 2 castling
// king 1 right tower 2 left
// king 2 left tower 3 right
// once all the validation rules are passed, we can decide which of the two castling are and implement it



export class CastlingRule extends Rule {
    public evaluate(move: Move, state: GameState): RuleEvaluationResult {
        let nextState = state.clone();
        nextState.board.move(move);
        nextState.history.push(move);
        return {
          valid: true,
          nextState: nextState
        };
    }
}   
