import React from "react";
import "../index.css";
import { AbstractPiece, PieceColor } from "../game-engine/AbstractPiece";

interface PieceProps {
  piece: AbstractPiece | null;
}

const style: React.CSSProperties = {
  height: "80%",
  width: "80%",
  border: "none"
};

function pieceImage(piece: AbstractPiece | null): string {
  if (piece === null) {
    return "";
  }

  let color = "";
  if (piece.color === PieceColor.Black) {
    color = "black";
  } else {
    color = "white";
  }

  let name = piece.name().toLowerCase();

  return "pieces/" + name + "-" + color + ".png";
}

export const Piece: React.FC<PieceProps> = props => {
  if (props.piece == null) {
    return <div></div>;
  }
  return <img src={pieceImage(props.piece)} alt={""} style={style}></img>;
};
