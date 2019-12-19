import React from "react";
import { PieceColor } from "../../game-engine/IPiece";

interface TurnIndicatorProps {
  color: PieceColor;
}

const indicatorStyle: React.CSSProperties = {
  width: "100%",
  borderColor: "#b5b5b5",
  borderRadius: "0px",
  borderWidth: "1px",
  padding: "5px",
  overflow: "hidden",
  background: "Black",
  fontWeight: "bold",
  color: "#626161",
  textAlign: "center"
};

export const TurnIndicator: React.FunctionComponent<TurnIndicatorProps> = props => {
  let style = {...indicatorStyle};
  let text: string;
  if (props.color === PieceColor.White) {
    text = "White";
    style.background = "white";
    style.color = "#626161";
  } else {
    text = "Black";
    style.background = "black";
    style.color = "white";
  }
  return <div style={style}>{text + " plays"}</div>;
};
