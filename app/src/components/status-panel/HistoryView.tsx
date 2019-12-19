import React from "react";
import { Col } from "react-bootstrap";
import { Row } from "react-bootstrap";

interface HistoryViewProps {
  text: string;
}

const panelStyle: React.CSSProperties = {
  width: "100%",
  maxHeight: "100%",
  padding: "5px",
  paddingLeft: "10px",
  overflowY: "scroll",
  overflowX: "hidden"
};

export const HistoryView: React.FunctionComponent<HistoryViewProps> = () => {
  return (
    <div style={panelStyle}>
      <Row>
        <Col xs={2}>1</Col>
        <Col>e2 e4</Col>
        <Col>e7 e5</Col>
      </Row>
      <Row>
        <Col xs={2}>1</Col>
        <Col>e2 e4</Col>
        <Col>e7 e5</Col>
      </Row>
      <Row>
        <Col xs={2}>1</Col>
        <Col>e2 e4</Col>
        <Col>e7 e5</Col>
      </Row>
      <Row>
        <Col xs={2}>1</Col>
        <Col>e2 e4</Col>
        <Col>e7 e5</Col>
      </Row>
      <Row>
        <Col xs={2}>1</Col>
        <Col>e2 e4</Col>
        <Col>e7 e5</Col>
      </Row>
      <Row>
        <Col xs={2}>1</Col>
        <Col>e2 e4</Col>
        <Col>e7 e5</Col>
      </Row>
      <Row>
        <Col xs={2}>1</Col>
        <Col>e2 e4</Col>
        <Col>e7 e5</Col>
      </Row>
      <Row>
        <Col xs={2}>1</Col>
        <Col>e2 e4</Col>
        <Col>e7 e5</Col>
      </Row>
      <Row>
        <Col xs={2}>1</Col>
        <Col>e2 e4</Col>
        <Col>e7 e5</Col>
      </Row>
      <Row>
        <Col xs={2}>1</Col>
        <Col>e2 e4</Col>
        <Col>e7 e5</Col>
      </Row>
      <Row>
        <Col xs={2}>1</Col>
        <Col>e2 e4</Col>
        <Col>e7 e5</Col>
      </Row>
      <Row>
        <Col xs={2}>1</Col>
        <Col>e2 e4</Col>
        <Col>e7 e5</Col>
      </Row>
      <Row>
        <Col xs={2}>1</Col>
        <Col>e2 e4</Col>
        <Col>e7 e5</Col>
      </Row>
      <Row>
        <Col xs={2}>1</Col>
        <Col>e2 e4</Col>
        <Col>e7 e5</Col>
      </Row>
      <Row>
        <Col xs={2}>1</Col>
        <Col>e2 e4</Col>
        <Col>e7 e5</Col>
      </Row>
      <Row>
        <Col xs={2}>1</Col>
        <Col>e2 e4</Col>
        <Col>e7 e5</Col>
      </Row>
    </div>
  );
};
