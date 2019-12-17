import React from "react";
import { Row, Container } from "react-bootstrap";

interface StatusPanelProps {
  text: string;
}

const panelStyle: React.CSSProperties = {
  width: "100%",
  borderStyle: "solid",
  borderColor: "black",
  paddingTop: "auto",
  paddingBottom: "auto",
  borderRadius: "5px",
  overflow: "hidden",
  background: "black",
  color: "white"
};

export const TurnIndicator: React.FunctionComponent<StatusPanelProps> = (props) => {
  return (
    <Container style={panelStyle} bsPrefix={"d-flex justify-content-center"}>
      <Row>
        <div>{props.text}</div>
      </Row>
    </Container>
  );
};
