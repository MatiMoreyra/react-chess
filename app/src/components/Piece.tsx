import React from "react";
import "../index.css";
import { AbstractPiece, PieceColor } from "../game-engine/AbstractPiece";

interface PieceProps {
  piece: AbstractPiece | null;
}

const pieceStyle: React.CSSProperties = {
  fontSize: "4vw",
  margin: "0"
};

function pieceCharacter(piece: AbstractPiece | null): string {
  if (piece === null) {
    return "";
  }
  let charCode: number = 0;
  switch (piece.name()) {
    case "King":
      charCode = 9812;
      break;
    case "Rook":
      charCode = 9814;
      break;
    case "Pawn":
      charCode = 9817;
      break;
    default:
      break;
  }
  if (piece.color === PieceColor.Black) {
    charCode += 6;
  }
  return String.fromCharCode(charCode);
}

export const Piece: React.FC<PieceProps> = props => {
  return <p style={pieceStyle}>{pieceCharacter(props.piece)}</p>;
};
