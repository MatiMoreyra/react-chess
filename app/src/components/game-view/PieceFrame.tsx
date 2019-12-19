import React from "react";
import { IPiece, PieceColor } from "../../game-engine/IPiece";

interface PieceProps {
  piece: IPiece | null;
}

const style: React.CSSProperties = {
  height: "80%",
  width: "80%",
  border: "none"
};

function pieceImage(piece: IPiece | null): string {
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
