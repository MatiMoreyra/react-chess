import React from "react";
import "../index.css";
import { AbstractPiece } from "../game-engine/AbstractPiece";

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
    default:
      break;
  }
  return String.fromCharCode(charCode);
}

export const Piece: React.FC<PieceProps> = props => {
  return <p style={pieceStyle}>{pieceCharacter(props.piece)}</p>;
};
