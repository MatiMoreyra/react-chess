import { IPiece, PieceColor, PieceType } from "../../IPiece";

// Class that provides extension methods to manipulate an IPiece
export class Piece implements IPiece {
  color: PieceColor;
  type: PieceType;
  constructor(piece: IPiece) {
    this.color = piece.color;
    this.type = piece.type;
  }

  public clone(): Piece {
    return new Piece({ color: this.color, type: this.type });
  }
}
