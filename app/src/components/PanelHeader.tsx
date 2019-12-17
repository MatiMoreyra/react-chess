import React from "react";

interface PanelHeadernelProps {
  text: string;
}

const panelStyle: React.CSSProperties = {
  width: "100%",
  borderColor: "#b5b5b5",
  borderRadius: "0px",
  borderBottomStyle: "solid",
  borderTopStyle: "solid",
  borderWidth: "1px",
  padding: "5px",
  overflow: "hidden",
  background: "#f8f8f8",
  fontWeight: "bold",
  color: "#626161"
};

export const PanelHeader: React.FunctionComponent<PanelHeadernelProps> = props => {
  return <div style={panelStyle}>{props.text}</div>;
};
