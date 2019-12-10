export enum PieceColor {
  Black,
  White
}

export enum PieceType {
  King = "King",
  Queen = "Queen",
  Rook = "Rook",
  Bishop = "Bishop",
  Knight = "Knight",
  Pawn = "Pawn"
}

export interface Piece {
  color: PieceColor;
  type: PieceType;
}
