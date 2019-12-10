import React from "react";
import "../index.css";
import { Piece, PieceColor } from "../game-engine/Piece";

interface PieceProps {
  piece: Piece | null;
}

const style: React.CSSProperties = {
  height: "80%",
  width: "80%",
  border: "none"
};

function pieceImage(piece: Piece | null): string {
  if (piece === null) {
    return "";
  }

  let color = "";
  if (piece.color === PieceColor.Black) {
    color = "black";
  } else {
    color = "white";
  }

  let name = piece.type.toLowerCase();

  return "pieces/" + name + "-" + color + ".png";
}

export const PieceFrame: React.FC<PieceProps> = props => {
  if (props.piece == null) {
    return <div></div>;
  }
  return <img src={pieceImage(props.piece)} alt={""} style={style}></img>;
};
