import { Rule, RuleEvaluationResult } from "../Rule";
import { GameState } from "../GameState";
import { Move } from "../extensions/Move";
import { Square } from "../extensions/Square";
import { IMove } from "../../IMove";
import { PieceType, PieceColor } from "../../IPiece";
import { ISquare } from "../../ISquare";
import { map } from 'rxjs/operators';


//rule must be before king rule, because it will allow the king 2 spaces

// this should check many rules
// I think the best way to iplement this rule is to make an inner pipeline of rules


// king and Rook must have never moved before -done
// there must be empty spaces between the 2 pieces -done (refactorize it using already board function)
// castling zone must no be under attack ( like an invisible line trying to check )
// king can't be under check (NOR THE SPACES BETWEEN KING AND ROOK) same above


// states:
// castled: boolean -> do not check the rule if already castled - done
// once castled or having one of the 2 pieces moved -done

// white and black logic: coluumns are the same for both -> take the source of the king. if It's never moved
// then it has the row of the initial state , 0 or 7
// need two flags for the states -?black castled, white castled..

export class CastlingRule extends Rule {
    private whiteCastled: boolean = false; //SHOLD BE ON THE GAME STATE IN ORDER TO ALLOW THE REVERT HISTORY RESET THIS FLAG
    private whiteMovedCastledPieces: boolean = false; // SAME AS ABOVE
    private blackCastled: boolean = false; //SHOLD BE ON THE GAME STATE IN ORDER TO ALLOW THE REVERT HISTORY RESET THIS FLAG
    private blackMovedCastledPieces: boolean = false; // SAME AS ABOVE
    // index 0 matchs PiceColor.Black,it is the same anyway
    private castlingFlags = [
        {castled: false, movedClastingPieces: false}, 
        {castled: false, movedClastingPieces: false}
    ]    
    private castlingPieces:string[] = ["King","Rook"];
    private defaultPositions  = { whiteRightRook : { row: 7, column: 7 },
                                  whiteLeftRook : { row: 7, column: 0 },
                                };

    private defaultKingPositions = {
        whiteKingShortCastling : { row: 7, column: 6 },
        whiteKingLongCastling : { row: 7, column: 2 },
        blackKingShortCastling : { row: 0, column: 6 },
        blackKingLongCastling : { row: 0, column: 2 },
    }
    private allowedKingCols = [6,2];
    private defaultRookPositions = {
        whiteRookShortCastling : { row: 7, column: 5 },
        whiteRookLongCastling : { row: 7, column: 3 },
        blackRookShortCastling : { row: 0, column: 5 },
        blackRookLongCastling : { row: 0, column: 3 },
    }

    public evaluate(move: Move, state: GameState): RuleEvaluationResult {

        let movingPiece = state.board.getPiece(move.source);
        if (!!movingPiece){
            if (!this.castlingPieces.includes(movingPiece.type)) {
                return this.nextOrInvalidResult(move, state);
            }
            let colorPiece = movingPiece.color;
            debugger;
            if (this.castlingFlags[colorPiece].castled || this.castlingFlags[colorPiece].movedClastingPieces){
                return this.nextOrInvalidResult(move, state);
            }

            this.castlingFlags[colorPiece].movedClastingPieces = true;
            // if the moving piece is the rook, set the flag to true and continue the pipeline
            // if it is the king, proceed with the evaluation
            return movingPiece.type === PieceType.King ? this.proceedCastling(move,state,colorPiece):  this.nextOrInvalidResult(move, state);
        }
        return { valid: false };
    }

    private proceedCastling(move: Move, state: GameState, colorPiece: PieceColor){    

        if(!this.allowedKingCols.includes(move.destination.column)){
            return this.nextOrInvalidResult(move, state);
        }
        let [destinationRook,castledRook,castledKing] = this.isShortCastling(move) ? this.shortCastling() : this.longCastling(); //will need to include black logic for >dx
        let fakeMove : IMove = {
            source: move.source,
            destination: destinationRook
        };

        if (this.emptySpaces(new Move(fakeMove), state)){
            let kingMove = { source: move.source, destination: castledKing }
            let RookMove = { source: destinationRook, destination: castledRook}
            return this.castle(state, kingMove, RookMove, colorPiece);
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

    // both castling will return needed information like the position of the Rook destination or the new state
    private shortCastling(){
        console.log('short castling');
        let destinationRook = this.defaultPositions.whiteRightRook;
        let castledRook = this.defaultRookPositions.whiteRookShortCastling;
        let castledKing = this.defaultKingPositions.whiteKingShortCastling;
        return [destinationRook,castledRook,castledKing];
    }
    private longCastling(){
        console.log('long castling');
        let destinationRook = this.defaultPositions.whiteLeftRook;
        let castledRook = this.defaultRookPositions.whiteRookLongCastling;
        let castledKing = this.defaultKingPositions.whiteKingLongCastling;
        return [destinationRook,castledRook,castledKing];
    }

    private castle(state:GameState,moveKing: IMove, moveRook: IMove, colorPiece: PieceColor){
        let nextState = state.clone();
        let mk = new Move(moveKing);
        let mt = new Move(moveRook);
        nextState.board.move(mk);
        nextState.board.move(mt);
        nextState.history.push(mt); 
        // how are flags handled? caslted end game and all that? should improve this in some place
        this.castlingFlags[colorPiece].castled = true; // will be replaced for valid:true state: castledState
        console.log('king Castled!');
        return {
          valid: true,
          nextState: nextState
        };
    }
}   
