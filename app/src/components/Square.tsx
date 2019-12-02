import React from "react";
import "../index.css";
import { AbstractPiece } from "../game-engine/AbstractPiece";

interface SquareProps {
  piece: AbstractPiece | null;
  background: string;
}

const squareStyle: React.CSSProperties = {
  height: "12.5%",
  width: "12.5%",
  float: "left",
  border: "none"
};

export const Square: React.FC<SquareProps> = props => {
  let style: React.CSSProperties = {
    ...squareStyle,
    background: props.background
  };
  return (
    <button style={style}>
      {props.piece == null ? "" : props.piece.name()}
    </button>
  );
};
