import React from "react";

const centeredStyle: React.CSSProperties = {
  margin: "0",
  position: "absolute",
  top: "50%",
  left: "50%",
  msTransform: "translate(-50%, -50%)",
  transform: "translate(-50%, -50%)",
}

export const Centered: React.FC<{}> = (props) => {
  return (
    <div style={centeredStyle}>
      {props.children}
    </div>
  );
};
