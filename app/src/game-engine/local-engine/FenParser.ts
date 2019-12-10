import { Piece, PieceType, PieceColor } from "../Piece";

function charToPiece(char: string): Piece | null {
  switch (char) {
    case "k":
      return { type: PieceType.King, color: PieceColor.Black };
    case "q":
      return { type: PieceType.Queen, color: PieceColor.Black };
    case "r":
      return { type: PieceType.Rook, color: PieceColor.Black };
    case "b":
      return { type: PieceType.Bishop, color: PieceColor.Black };
    case "n":
      return { type: PieceType.Knight, color: PieceColor.Black };
    case "p":
      return { type: PieceType.Pawn, color: PieceColor.Black };
    case "K":
      return { type: PieceType.King, color: PieceColor.White };
    case "Q":
      return { type: PieceType.Queen, color: PieceColor.White };
    case "R":
      return { type: PieceType.Rook, color: PieceColor.White };
    case "B":
      return { type: PieceType.Bishop, color: PieceColor.White };
    case "N":
      return { type: PieceType.Knight, color: PieceColor.White };
    case "P":
      return { type: PieceType.Pawn, color: PieceColor.White };
    default:
      return null;
  }
}

export function parseFen(fen: string): Array<Array<Piece | null>> | null {
  // Create a matrix of pieces filled with null.
  let pieces = new Array<Array<Piece | null>>(8);
  for (let row = 0; row < 8; row++) {
    pieces[row] = new Array<Piece | null>(8).fill(null);
  }

  let rows = fen.split("/");
  if (rows.length !== 8) {
    return null;
  }

  for (var row = 0; row < 8; row++) {
    let col = 0;
    for (var i = 0; i < rows[row].length; i++) {
      let char = rows[row].charAt(i);
      // Check if char is a number between 0 and 8
      if (char >= "0" && char <= "8") {
        let n = parseInt(char, 10);
        // Skip n columns
        col += n;
        if (col > 8) {
          return null;
        }
        continue;
      }

      // Check if char is a valid piece
      let piece = charToPiece(char);
      if (piece != null) {
        pieces[row][col] = piece;
      } else {
        return null;
      }
      col++;
    }
  }

  return pieces;
}
