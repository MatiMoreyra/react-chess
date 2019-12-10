import React from "react";
import "../index.css";
import { Piece } from "../game-engine/Piece";
import { PieceFrame } from "./PieceFrame";

interface SquareProps {
  piece: Piece | null;
  background: string;
  onClick: () => void;
}

const squareStyle: React.CSSProperties = {
  height: "12.5%",
  width: "12.5%",
  float: "left",
  border: "none",
  padding: "0",
};

export const SquareFrame: React.FC<SquareProps> = props => {
  let style: React.CSSProperties = {
    ...squareStyle,
    background: props.background
  };
  return (
    <button style={style} onClick={props.onClick}>
      <PieceFrame piece={props.piece}></PieceFrame>
    </button>
  );
};
