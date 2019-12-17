import React from "react";
import { Button } from "react-bootstrap";

interface StatusPanelProps {
  text: string;
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

export const Controls: React.FunctionComponent<StatusPanelProps> = () => {
  return (
    <div style={panelStyle}>
      <Button style={buttonStyle}>Undo</Button>
      <Button style={buttonStyle}>Restart</Button>
    </div>
  );
};
