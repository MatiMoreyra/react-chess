import React from "react";
import { Button } from "react-bootstrap";

interface StatusPanelProps {
  text: string;
}

const panelStyle: React.CSSProperties = {
  width: "100%"
};

const buttonStyle: React.CSSProperties = {
  width: "50%"
};

export const Controls: React.FunctionComponent<StatusPanelProps> = () => {
  return (
    <div style={panelStyle}>
        <Button style={buttonStyle}>Undo</Button>
        <Button style={buttonStyle}>Restart</Button>
    </div>
  );
};
