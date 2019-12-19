import React from "react";
import { Col } from "react-bootstrap";
import { PieceType, PieceColor } from "../../game-engine/IPiece";
import { CapturedPieceCounter } from "./CapturedPieceCounter";

interface CapturedPiecesProps {
  text: string;
}

const panelStyle: React.CSSProperties = {
  width: "100%",
  display: "flex",
  justifyContent: "space-around",
  padding: "5px"
};

export const CapturedPieces: React.FunctionComponent<CapturedPiecesProps> = () => {
  return (
    <div style={panelStyle}>
      <Col xs={6}>
        <CapturedPieceCounter
          piece={{ color: PieceColor.White, type: PieceType.Pawn }}
          count={6}
        ></CapturedPieceCounter>
        <CapturedPieceCounter
          piece={{ color: PieceColor.White, type: PieceType.Bishop }}
          count={2}
        ></CapturedPieceCounter>
      </Col>
      <Col xs={6}>
      <CapturedPieceCounter
          piece={{ color: PieceColor.Black, type: PieceType.Pawn }}
          count={6}
        ></CapturedPieceCounter>
        <CapturedPieceCounter
          piece={{ color: PieceColor.Black, type: PieceType.Knight }}
          count={2}
        ></CapturedPieceCounter>
      </Col>
    </div>
  );
};
