import React, { ReactNode } from "react";
import { Col } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { IMove } from "../../game-engine/IMove";
import { ISquare } from "../../game-engine/ISquare";

interface HistoryViewProps {
  history: Array<IMove>;
}

const panelStyle: React.CSSProperties = {
  width: "100%",
  maxHeight: "100%",
  padding: "5px",
  paddingLeft: "10px",
  overflowY: "scroll",
  overflowX: "hidden"
};

function squareLabel(square: ISquare): string {
  let column = String.fromCharCode("a".charCodeAt(0) + square.column);
  let row = String.fromCharCode("8".charCodeAt(0) - square.row);
  return column + row;
}

function moveLabel(move: IMove): string {
  return squareLabel(move.source) + " " + squareLabel(move.destination);
}

export const HistoryView: React.FunctionComponent<HistoryViewProps> = props => {
  let result = new Array<ReactNode>();
  for (let i = 0; i < props.history.length; i += 2) {
    result.push(
      <Row>
        <Col xs={2}>{i / 2 + 1}</Col>
        <Col>{moveLabel(props.history[i])}</Col>
        <Col>
          {i + 1 === props.history.length ? (
            <div>...</div>
          ) : (
            moveLabel(props.history[i + 1])
          )}
        </Col>
      </Row>
    );
  }
  return <div style={panelStyle}>{result}</div>;
};
