import { ChessBoard } from "./ChessBoard";
import { ChessSquare } from "./ChessSquare";
import { PieceColor } from "./AbstractPiece";

export enum GameResult {
    WhiteWins,
    BlackWins,
    Draw,
}

export interface Move {
    source: ChessSquare;
    destination: ChessSquare;
    playerColor: PieceColor;
}

export abstract class AbstractChessEngine {
    constructor() {
        this.moveEvent = () => { };
        this.gameEndedEvent = () => { };
    }

    public abstract getChessBoard(): ChessBoard;
    public abstract getHistory(): Array<Move>;
    public abstract move(move: Move): boolean;
    public abstract isValidMove(move: Move): boolean;
    public abstract whoPlays(): PieceColor;
    public moveEvent: () => void;
    public gameEndedEvent: (result: GameResult) => void;
}
