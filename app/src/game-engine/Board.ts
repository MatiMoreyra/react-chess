import { Piece } from "./Piece";

// Contains a 8x8 matrix of Pieces, a null value represents
// the absence of a piece.
export interface Board {
  readonly pieces: Array<Array<Piece | null>>;
}
