import React from "react";
import { TurnIndicator } from "./TurnIndicator";
import { Controls } from "./Controls";

interface StatusPanelProps {
  text: string;
}

const panelStyle: React.CSSProperties = {
  minWidth: "15vw",
  height: "100%",
  width: "100%",
  padding: "5px 5px",
  border: "none",
  borderRadius: "5px",
  overflow: "hidden",
  boxShadow: "5px 5px 5px rgba(0, 0, 0, 0.5)",
  background: "white",
  display: "flex",
  flexDirection: "column"
};

export const StatusPanel: React.FunctionComponent<StatusPanelProps> = () => {
  return (
    <div style={panelStyle}>
      <div>
        <TurnIndicator text={"White to Move"}></TurnIndicator>
      </div>
      <div style={{ marginTop: "auto" }}>
        <Controls text="asd"></Controls>
      </div>
    </div>
  );
};
