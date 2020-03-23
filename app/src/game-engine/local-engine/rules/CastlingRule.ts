import { Rule, RuleEvaluationResult } from "../Rule";
import { GameState } from "../GameState";
import { Move } from "../extensions/Move";
import { ISquare } from "../../ISquare";
import { PieceType, PieceColor } from "../../IPiece";

enum castlingFlags {
    castled,
    kingMoved,
    shortCastlingRookMoved,
    longCastlingRookMoved
}

export class CastlingRule extends Rule {

    private castlingPieces:string[] = ["King","Rook"];
    // next array strictly depends on the indexes for PieceColor, 0 for Black and 1 for White.
    // may need to remove this dependency ?
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
    private allowedKingCols = [6,2]; // cols that shoot the castling king movement

    public evaluate(move: Move, state: GameState): RuleEvaluationResult {
        let movingPiece = state.board.getPiece(move.source);
        if (!!movingPiece){
            if (!this.castlingPieces.includes(movingPiece.type)) {
                return this.nextOrInvalidResult(move, state);
            }
            let pieceColor = movingPiece.color;
            // if next condition is done, player can't castle anymore
            if (state.castlingFlags[pieceColor][castlingFlags.castled] || state.castlingFlags[pieceColor][castlingFlags.kingMoved]){
                return this.nextOrInvalidResult(move, state);
            }
            return movingPiece.type === PieceType.King ? this.proceedForKing(move,state,pieceColor): this.proceedForRoot(move, state, pieceColor);
        }
        return { valid: false };
    }


    private proceedForKing(move: Move, state: GameState, pieceColor: PieceColor){   
        if(!this.allowedKingCols.includes(move.destination.column)){
            let result = this.nextOrInvalidResult(move, state);
            if (result.nextState&&result.valid){
                result.nextState.castlingFlags[pieceColor][castlingFlags.kingMoved] = true;
            }
            return result;
        }

        let shortCastling = this.isKingShortCastling(move);
        let alreadyMovedTower = shortCastling ?
        state.castlingFlags[pieceColor][castlingFlags.shortCastlingRookMoved]:
        state.castlingFlags[pieceColor][castlingFlags.longCastlingRookMoved];

        if (alreadyMovedTower){
            return this.nextOrInvalidResult(move, state);
        }

        let [destinationRook,castledRook,castledKing] = shortCastling ?
        this.shortCastling(pieceColor):
        this.longCastling(pieceColor);

        let fakeMove = new Move({
            source: move.source,
            destination: destinationRook
        });

        if (state.board.isPathFree(fakeMove) && !state.onCheck &&
            !this.isPathThreatened(state, pieceColor, fakeMove)){
            let kingMove = new Move({source: move.source, destination: castledKing});
            let RookMove = new Move({source: destinationRook, destination: castledRook})
            return this.castle(state, kingMove, RookMove, pieceColor);
        }
        return this.nextOrInvalidResult(move, state);
    }

    private proceedForRoot(move: Move, state: GameState, pieceColor: PieceColor){
        let result = this.nextOrInvalidResult(move, state);
        if (result.nextState&&result.valid){
            let shortOrLongCastling = 
            this.isRootShortCastling(move) ?
            result.nextState.castlingFlags[pieceColor][castlingFlags.shortCastlingRookMoved] = true:
            result.nextState.castlingFlags[pieceColor][castlingFlags.longCastlingRookMoved] = true;
        }
        return result;
    }

    private isKingShortCastling(move: Move):boolean{
        return move.dx > 0 ? true : false;
    }
    
    private isRootShortCastling(move: Move):boolean{
        return move.source.column == 7;
    }

    // both castling functions return needed information like the position of the Rook destination or the new state
    private shortCastling(pieceColor: PieceColor){
        let destinationRook = this.piecesFixedPositions[pieceColor].initialRookShortCastling
        let castledRook = this.piecesFixedPositions[pieceColor].finalRookShortCastling;
        let castledKing = this.piecesFixedPositions[pieceColor].finalKingShortCastling;
        return [destinationRook,castledRook,castledKing];
    }

    private longCastling(pieceColor: PieceColor){
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
        nextState.castlingFlags[pieceColor][castlingFlags.castled] = true;
        return {
          valid: true,
          nextState: nextState
        };
    }

    private isPathThreatened(state: GameState, color: PieceColor, move: Move):boolean{
        let advance = 1;
        while (advance < Math.abs(move.dx) || advance < Math.abs(move.dy)) {
        let col = move.source.column + advance * Math.sign(move.dx);
        let row = move.source.row + advance * Math.sign(move.dy);
        if (this.isSquareThreatened(state, color, {  row: row, column: col })) {
            return true;
        }
        advance++;
        }
        return false;
    }     

    private isSquareThreatened(state: GameState, color: PieceColor, square: ISquare){
        //check if any opposite piece can reach the square
        for (let row = 0; row < 8; row++) {
            for (let column = 0; column < 8; column++) {
              let source: ISquare = { row: row, column: column };
              let piece = state.board.getPiece(source);
              if (piece && piece.color !== color) {
                let move: Move = new Move({
                  source: source,
                  destination: square
                });
                let result = this.nextOrInvalidResult(move, state);
                if (result.valid) {
                  return true;
                }
              }
            }
          }
          return false;
    }
}   
