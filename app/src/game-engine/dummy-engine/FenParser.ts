import { AbstractPiece, PieceColor } from "../AbstractPiece";
import { King } from "./pieces/King";
import { Queen } from "./pieces/Queen";
import { Rook } from "./pieces/Rook";
import { Bishop } from "./pieces/Bishop";
import { Knight } from "./pieces/Knight";
import { Pawn } from "./pieces/Pawn";

function charToPiece(char: string): AbstractPiece | null {
  switch (char) {
    case "k":
      return new King(PieceColor.Black);
    case "q":
      return new Queen(PieceColor.Black);
    case "r":
      return new Rook(PieceColor.Black);
    case "b":
      return new Bishop(PieceColor.Black);
    case "n":
      return new Knight(PieceColor.Black);
    case "p":
      return new Pawn(PieceColor.Black);
    case "K":
      return new King(PieceColor.White);
    case "Q":
      return new Queen(PieceColor.White);
    case "R":
      return new Rook(PieceColor.White);
    case "B":
      return new Bishop(PieceColor.White);
    case "N":
      return new Knight(PieceColor.White);
    case "P":
      return new Pawn(PieceColor.White);
    default:
      return null;
  }
}

export function parseFen(
  fen: string
): Array<Array<AbstractPiece | null>> | null {
  // Create a matrix of pieces filled with null.
  let pieces = new Array<Array<AbstractPiece | null>>(8);
  for (let row = 0; row < 8; row++) {
    pieces[row] = new Array<AbstractPiece | null>(8).fill(null);
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
