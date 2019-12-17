import React from "react";
import { Controls } from "./Controls";
import { PanelHeader } from "./PanelHeader";
import { TurnIndicator } from "./TurnIndicator";

interface StatusPanelProps {
  text: string;
}

const panelStyle: React.CSSProperties = {
  minWidth: "15vw",
  height: "100%",
  width: "100%",
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
        <TurnIndicator text="Black to move"></TurnIndicator>{" "}
      </div>
      <div>
        <PanelHeader text="Captured Pieces"></PanelHeader>
      </div>
      <div style={{ marginTop: "auto" }}>
        <PanelHeader text="History"></PanelHeader>
      </div>
      <div style={{ marginTop: "auto" }}>
        <PanelHeader text="Controls"></PanelHeader>
        <Controls text="asd"></Controls>
      </div>
    </div>
  );
};
