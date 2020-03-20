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
// king can't be under check (NOR THE SPACES BETWEEN KING AND ROOK)

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
    private castled: boolean = false; //SHOLD BE ON THE GAME STATE IN ORDER TO ALLOW THE REVERT HISTORY RESET THIS FLAG
    private movedCastledPieces: boolean = false; // SAME AS ABOVE
    private castlingPieces:string[] = ["King","Tower"];
    private defaultPositions  = { whiteRightTower : { row: 7, column: 7 },
                                  whiteLeftTower : { row: 7, column: 0 },
                                  whiteKingShortCastling : { row: 7, column: 6 },
                                  whiteKingLongCastling : { row: 7, column: 2 },
                                  whiteTowerShortCastling : { row: 7, column: 5 },
                                  whiteTowerLongCastling : { row: 7, column: 3 },
                                };
 

    public evaluate(move: Move, state: GameState): RuleEvaluationResult {
        if (this.castled || this.movedCastledPieces){
            return this.nextOrInvalidResult(move, state);
        }
        let movingPiece = state.board.getPiece(move.source);
        if (!movingPiece || movingPiece.type !in this.castlingPieces) {
          return this.nextOrInvalidResult(move, state);
        }
        // piece is either rook or king 
        console.log('moved king or tower, set castling flag to true');
        this.movedCastledPieces = true;
        // if the moving piece is the rook, set the flag to true and continue the pipeline
        // if it is the king, proceed with the evaluation
        return movingPiece.type === PieceType.King ? this.proceedCastling(move,state):  this.nextOrInvalidResult(move, state);
    }

    private proceedCastling(move: Move,state: GameState){    

        let [destinationTower,castledTower,castledKing] = this.isShortCastling(move) ? this.shortCastling() : this.longCastling(); //will need to include black logic for >dx
        let fakeMove : IMove = {
            source: move.source,
            destination: destinationTower
        };

        if (this.emptySpaces(new Move(fakeMove), state)){
            let kingMove = { source: move.source, destination: castledKing }
            let towerMove = { source: destinationTower, destination: castledTower}
            return this.castle(state, kingMove, towerMove);
        }

        return this.nextOrInvalidResult(move, state);
    }

    private emptySpaces(fakeMove: Move, state:GameState): boolean{
        let [initCol,endCol]=this.initIndexes(fakeMove);
        for(initCol; 0 < endCol-initCol; initCol++){
            let resultGetPiece= state.board.getPiece({ row: fakeMove.source.row, column: initCol });
            if(!!resultGetPiece){
                console.log("pieces between the king and rook");
                return false;
            }
        }
        console.log("empty spaces");
        return true;
    }

    private initIndexes(move: Move):number[]{
        var startIndex:number;
        var endIndex:number;
        if (move.dx>0){
            startIndex = move.source.column +1;
            endIndex = move.destination.column;
        }else{
            startIndex = move.destination.column + 1;  
            endIndex = move.source.column;
        }
        return [startIndex,endIndex];
    }

    private isShortCastling(move: Move):boolean{
        return move.dx > 0 ? true : false; //works for whites but not for blacks
    }

    // both castling will return needed information like the position of the tower destination or the new state
    private shortCastling(){
        console.log('short castling');
        let destinationTower = this.defaultPositions.whiteRightTower;
        let castledTower = this.defaultPositions.whiteTowerShortCastling;
        let castledKing = this.defaultPositions.whiteKingShortCastling;
        return [destinationTower,castledTower,castledKing];
    }
    private longCastling(){
        console.log('long castling');
        let destinationTower = this.defaultPositions.whiteLeftTower;
        let castledTower = this.defaultPositions.whiteTowerLongCastling;
        let castledKing = this.defaultPositions.whiteKingLongCastling;
        return [destinationTower,castledTower,castledKing];
    }

    private castle(state:GameState,moveKing: IMove, moveTower: IMove){
        let nextState = state.clone();
        let mk = new Move(moveKing);
        console.log(mk);
        debugger;
        nextState.board.move(mk);
        nextState.history.push(mk);
        let nextStateSecond = nextState.clone();
        let mt = new Move(moveTower);
        console.log(mt);
        nextStateSecond.board.move(mt);
        nextStateSecond.history.push(mt); 
        // this is not fine, the history shoud be an array of states, not from moves
        // how are flags handled? caslted end game and all that? should improve this in some place
        this.castled = true; // will be replaced for valid:true state: castledState
        console.log('king Castled!');

        return {
          valid: true,
          nextState: nextStateSecond
        };
    }
}   
