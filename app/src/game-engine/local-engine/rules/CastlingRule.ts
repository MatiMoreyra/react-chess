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
    // index 0 matchs PiceColor.Black, it is the same anyway
    // move this flags to the  GameState and get sure that the undo and remove history set the flags back
    // castled pieces should be divided in king short rook and long rook, 
    // cause If I move one of the rooks I am still able to castle in the opposite side
    private castlingFlags = [
        {castled: false, kingMoved: false, shortCastlingRookMoved: false, longCastlingRookMoved: false}, 
        {castled: false, kingMoved: false, shortCastlingRookMoved: false, longCastlingRookMoved: false}
    ]    
    private castlingPieces:string[] = ["King","Rook"];

    // this code should be improved/optimized -> use interfaces ?
    private piecesFixedPositions = [
        {
            initialRookShortCastling: { row: 0, column: 7 },
            initialRookLongCastling: { row: 0, column: 0 },
            finalKingShortCastling: { row: 0, column: 6 },
            finalKingLongCastling: { row: 0, column: 2 },
            finalRookShortCastling: { row: 0, column: 5 },
            finalRookLongCastling: { row: 0, column: 3 }
        },
        {
            initialRookShortCastling: { row: 7, column: 7 },
            initialRookLongCastling: { row: 7, column: 0 },
            finalKingShortCastling: { row: 7, column: 6 },
            finalKingLongCastling: { row: 7, column: 2 },
            finalRookShortCastling: { row: 7, column: 5 },
            finalRookLongCastling: { row: 7, column: 3 }
        }
    ]
    private allowedKingCols = [6,2];

    public evaluate(move: Move, state: GameState): RuleEvaluationResult {

        let movingPiece = state.board.getPiece(move.source);
        if (!!movingPiece){
            if (!this.castlingPieces.includes(movingPiece.type)) {
                return this.nextOrInvalidResult(move, state);
            }
            let pieceColor = movingPiece.color;
            // if next condition is done, player can't castle anymore
            if (this.castlingFlags[pieceColor].castled || this.castlingFlags[pieceColor].kingMoved){
                return this.nextOrInvalidResult(move, state);
            }

            // if the moving piece is the rook, set the flag and continue the pipeline
            // if it is the king, proceed with the evaluation
            return movingPiece.type === PieceType.King ? this.proceedForKing(move,state,pieceColor): this.proceedForRoot(move, state, pieceColor);
        }
        return { valid: false };
    }

    private proceedForKing(move: Move, state: GameState, pieceColor: PieceColor){    

        if(!this.allowedKingCols.includes(move.destination.column)){
            return this.nextOrInvalidResult(move, state);
        }
        let shortCastling = this.isKingShortCastling(move);
        let alreadyMovedTower = shortCastling ?
        this.castlingFlags[pieceColor].shortCastlingRookMoved:
        this.castlingFlags[pieceColor].longCastlingRookMoved;

        if (alreadyMovedTower){
            return this.nextOrInvalidResult(move, state);
        }

        let [destinationRook,castledRook,castledKing] = shortCastling ?
        this.shortCastling(pieceColor):
        this.longCastling(pieceColor);

        let fakeMove : IMove = {
            source: move.source,
            destination: destinationRook
        };

        if (this.emptySpaces(new Move(fakeMove), state)){
            let kingMove = new Move({source: move.source, destination: castledKing});
            let RookMove = new Move({source: destinationRook, destination: castledRook})
            return this.castle(state, kingMove, RookMove, pieceColor);
        }
        return this.nextOrInvalidResult(move, state);
    }

    private proceedForRoot(move: Move, state: GameState, pieceColor: PieceColor){
        let shortOrLongCastling = 
        this.isRootShortCastling(move) ?
        this.castlingFlags[pieceColor].shortCastlingRookMoved = true:
        this.castlingFlags[pieceColor].longCastlingRookMoved = true;
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

    private isKingShortCastling(move: Move):boolean{
        return move.dx > 0 ? true : false;
    }
    
    private isRootShortCastling(move: Move):boolean{
        return move.source.column == 7;
    }

    // both castling will return needed information like the position of the Rook destination or the new state
    private shortCastling(pieceColor: PieceColor){
        console.log('short castling');
        let destinationRook = this.piecesFixedPositions[pieceColor].initialRookShortCastling
        let castledRook = this.piecesFixedPositions[pieceColor].finalRookShortCastling;
        let castledKing = this.piecesFixedPositions[pieceColor].finalKingShortCastling;
        return [destinationRook,castledRook,castledKing];
    }
    private longCastling(pieceColor: PieceColor){
        console.log('long castling');
        let destinationRook = this.piecesFixedPositions[pieceColor].initialRookLongCastling
        let castledRook = this.piecesFixedPositions[pieceColor].finalRookLongCastling;
        let castledKing = this.piecesFixedPositions[pieceColor].finalKingLongCastling;
        return [destinationRook,castledRook,castledKing];
    }

    private castle(state:GameState, moveKing: Move, moveRook: Move, pieceColor: PieceColor){
        let nextState = state.clone();
        nextState.board.move(moveKing);
        nextState.board.move(moveRook);
        nextState.history.push(moveRook); 
        // this flag should be on the game state
        this.castlingFlags[pieceColor].castled = true;
        console.log('king Castled!');
        return {
          valid: true,
          nextState: nextState
        };
    }
}   
