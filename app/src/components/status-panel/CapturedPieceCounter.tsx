import React, { ReactNode } from "react";
import { Row } from "react-bootstrap";
import { PieceFrame } from "../game-view/PieceFrame";
import { IPiece } from "../../game-engine/IPiece";

interface CapturedPieceCounter {
  piece: IPiece;
  count: number;
}

const pieceStyle: React.CSSProperties = {
  height: "30px",
  width: "30px",
  marginRight: "-20px"
};

export const CapturedPieceCounter: React.FunctionComponent<CapturedPieceCounter> = props => {
  let result = new Array<ReactNode>();
  for (let i = 0; i < props.count; i++) {
      result.push(
        <div style={pieceStyle}>
          <PieceFrame piece={props.piece}></PieceFrame>
        </div>
      );
  }
  return <Row>{result}</Row>;
};
