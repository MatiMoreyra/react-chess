import { PieceColor, Piece } from "./Piece";

// Represents a chess square, used to represent piece locations
export interface Square {
  readonly row: number;
  readonly column: number;
}
