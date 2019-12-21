import React, { ReactNode } from "react";
import { Col } from "react-bootstrap";
import { PieceColor, IPiece } from "../../game-engine/IPiece";
import { CapturedPieceCounter } from "./CapturedPieceCounter";

interface CapturedPiecesProps {
  pieces: Array<IPiece>;
}

const panelStyle: React.CSSProperties = {
  width: "100%",
  display: "flex",
  maxHeight: "100%",
  justifyContent: "space-around",
  padding: "5px",
  overflowY: "scroll",
  overflowX: "hidden"
};

interface PieceCounter {
  piece: IPiece;
  count: number;
}

function countPieces(pieces: Array<IPiece>): Array<PieceCounter> {
  let counters = new Array<PieceCounter>();
  pieces.forEach(p => {
    let counter = counters.find(
      c => c.piece.color === p.color && c.piece.type === p.type
    );
    if (!counter) {
      counter = { piece: p, count: 0 };
      counters.push(counter);
    }
    counter.count++;
  });
  return counters;
}

export const CapturedPieces: React.FunctionComponent<CapturedPiecesProps> = props => {
  let counters = countPieces(props.pieces);
  let whitePieces = new Array<ReactNode>();
  let blackPieces = new Array<ReactNode>();
  counters.forEach(c => {
    if (c.piece.color === PieceColor.White) {
      whitePieces.push(
        <CapturedPieceCounter piece={c.piece} count={c.count} />
      );
    } else {
      blackPieces.push(
        <CapturedPieceCounter piece={c.piece} count={c.count} />
      );
    }
  });
  return (
    <div style={panelStyle}>
      <Col xs={6}>{whitePieces}</Col>
      <Col xs={6}>{blackPieces}</Col>
    </div>
  );
};
