import { Rule, RuleEvaluationResult } from "../Rule";
import { GameState } from "../GameState";
import { Move } from "../extensions/Move";
import { Square } from "../extensions/Square";
import { IMove } from "../../IMove";
import { PieceType, IPiece } from "../../IPiece";
import { ISquare } from "../../ISquare";


//rule must be before king rule, because it will allow the king 2 spaces

// this should check many rules
// I think the best way to iplement this rule is to make an inner pipeline of rules


// king and tower must have never moved before
// there must be empty spaces between the 2 pieces
// castling zone must no be under attack ( like an invisible line trying to check )
// king can't be under check (NOR THE PIECES BETWEEN KING AND ROOK)

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

// states:
// castled: boolean -> do not check the rule if already castled
// once castled or having one of the 2 pieces moved, can we set the castling unallowed for the rest of the game? ->  can we somewhere add or remove rules? like there is a push in the pipeline, can we make the pop?
// movement of the king can't be superposed


export class CastlingRule extends Rule {
    private castled: boolean = false;
    private alreadyMovedCastlingPieces: boolean = false;
    private castlingPieces:string[] = ["King","Tower"];
    private defaultPositions  = { whiteRightTower : { row: 7, column: 7 },
                                  whiteLeftTower : { row: 7, column: 0 }
                                };
 

    public evaluate(move: Move, state: GameState): RuleEvaluationResult {
        if (this.castled || this.alreadyMovedCastlingPieces){
            return this.nextOrInvalidResult(move, state);
        }
        let movingPiece = state.board.getPiece(move.source);
        if (!movingPiece || movingPiece.type !in this.castlingPieces) {
          return this.nextOrInvalidResult(move, state);
        }
        // piece is either rook or king 
        console.log('moved king or tower, set castling flag to true');
        this.alreadyMovedCastlingPieces = true;
        // if the moving piece is the rook, set the flag to true and continue the pipeline
        // if it is the king, proceed with the evaluation
        return movingPiece.type === PieceType.King ? this.proceedForKing(move,state):  this.nextOrInvalidResult(move, state);
    }

    protected proceedForKing(move: Move,state: GameState){    

        let fakeMove : IMove = {
            source: move.source,
            destination: this.defaultPositions.whiteRightTower
        };
        this.emptySpaces(fakeMove,state);
        this.castled = true; // will be replaced for valid:true state: castledState
        console.log('king Castled!');
        return this.nextOrInvalidResult(move, state);
    }

    protected emptySpaces(fakeMove: IMove, state:GameState): boolean{
        console.log("the piece at destination on the fake move is :",state.board.getPiece(fakeMove.destination));
        return true;
    }

}   
