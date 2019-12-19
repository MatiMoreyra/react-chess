import React from "react";
import { IPiece } from "../../game-engine/IPiece";
import { PieceFrame } from "./PieceFrame";

interface SquareProps {
  piece: IPiece | null;
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
