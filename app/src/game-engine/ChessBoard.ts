import { AbstractPiece } from "./AbstractPiece";
import { ChessSquare } from "./ChessSquare";


// Container for a 8x8 matrix of AbstractPieces
export class ChessBoard {
    private _pieces: Array<Array<AbstractPiece | null>>;
    constructor(pieces: Array<Array<AbstractPiece | null>>) {
        if (pieces.length != 8) {
            throw new Error("Invalid starting position size");
        }
        for (let index = 0; index < 8; index++) {
            if (pieces[index].length != 8) {
                throw new Error("invalid starting position size");
            }
        }
        this._pieces = pieces;
    }

    public pieceAt(square: ChessSquare): AbstractPiece | null {
        return this._pieces[square.row][square.column];
    }
}