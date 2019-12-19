import React from "react";
import { Controls } from "./Controls";
import { PanelHeader } from "./PanelHeader";
import { TurnIndicator } from "./TurnIndicator";
import { CapturedPieces } from "./CapturedPieces";
import { PieceColor } from "../../game-engine/IPiece";
import { HistoryView } from "./HistoryView";

interface StatusPanelProps {
  text: string;
}

const panelStyle: React.CSSProperties = {
  minWidth: "15vw",
  height: "100%",
  maxHeight: "100%",
  width: "100%",
  border: "none",
  borderRadius: "5px",
  overflow: "hidden",
  boxShadow: "5px 5px 5px rgba(0, 0, 0, 0.5)",
  background: "white",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between"
};

function handleUndo(): void {
  console.log("Undo pressed");
}

function handleRestart(): void {
  console.log("Restart pressed");
}

export const StatusPanel: React.FunctionComponent<StatusPanelProps> = () => {
  return (
    <div style={panelStyle}>
      <div>
        <TurnIndicator color={PieceColor.Black}></TurnIndicator>{" "}
        <PanelHeader text="Captured Pieces"></PanelHeader>
      </div>
      <CapturedPieces text="Captured Pieces"></CapturedPieces>
      <div>
        <PanelHeader text="History"></PanelHeader>
      </div>
        <HistoryView text="Asd"></HistoryView>
      <div>
        <PanelHeader text="Controls"></PanelHeader>
        <Controls onUndo={handleUndo} onRestart={handleRestart}></Controls>
      </div>
    </div>
  );
};
