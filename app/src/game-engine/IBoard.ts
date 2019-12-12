import { IPiece } from "./IPiece";

// Contains a 8x8 matrix of Pieces, a null value represents
// the absence of a piece.
export interface IBoard {
  pieces: Array<Array<IPiece | null>>;
}
