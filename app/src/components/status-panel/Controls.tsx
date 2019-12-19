import React from "react";
import { Button } from "react-bootstrap";

interface StatusPanelProps {
  onUndo: () => void;
  onRestart: () => void;
}

const panelStyle: React.CSSProperties = {
  width: "100%",
  display: "flex",
  justifyContent: "space-around",
  padding: "10px"
};

const buttonStyle: React.CSSProperties = {
  width: "40%",
  boxShadow: "1px 1px 1px rgba(0, 0, 0, 0.5)"
};

export const Controls: React.FunctionComponent<StatusPanelProps> = (props) => {
  return (
    <div style={panelStyle}>
      <Button style={buttonStyle} onClick={props.onUndo}>Undo</Button>
      <Button style={buttonStyle} onClick={props.onRestart}>Restart</Button>
    </div>
  );
};
