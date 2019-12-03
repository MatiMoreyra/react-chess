import React from "react";
import "../index.css";
import { AbstractPiece } from "../game-engine/AbstractPiece";
import { Piece } from "./Piece";

interface SquareProps {
  piece: AbstractPiece | null;
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

export const Square: React.FC<SquareProps> = props => {
  let style: React.CSSProperties = {
    ...squareStyle,
    background: props.background
  };
  return (
    <button style={style} onClick={props.onClick}>
      <Piece piece={props.piece}></Piece>
    </button>
  );
};
