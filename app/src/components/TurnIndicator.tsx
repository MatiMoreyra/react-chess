import React from "react";

interface TurnIndicatorProps {
  text: string;
}

const panelStyle: React.CSSProperties = {
  width: "100%",
  borderColor: "#b5b5b5",
  borderRadius: "0px",
  borderWidth: "1px",
  padding: "5px",
  overflow: "hidden",
  background: "Black",
  fontWeight: "bold",
  color: "#626161"
};

export const TurnIndicator: React.FunctionComponent<TurnIndicatorProps> = props => {
  return <div style={panelStyle}>{props.text}</div>;
};