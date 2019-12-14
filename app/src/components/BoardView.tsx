import { IBoard } from "../game-engine/IBoard";
import { SquareFrame } from "./SquareFrame";
import React, { ReactNode } from "react";
import { ISquare } from "../game-engine/ISquare";

interface BoardProps {
  board: IBoard;
  onSquareClick: (col: number, row: number) => void;
  highlightedSquares?: Array<ISquare>;
}

const boardStyle: React.CSSProperties = {
  height: "80vmin",
  width: "80vmin",
  border: "none",
  borderRadius: "5px",
  overflow: "hidden",
  boxShadow: "5px 5px 5px rgba(0, 0, 0, 0.5)"
};

const darkSquareColor: string = "#ab5e3a";
const lightSquareColor: string = "#ffddba";
const highlightedSquareColor: string = "#fff763";

export const BoardView: React.FunctionComponent<BoardProps> = props => {
  let result = new Array<ReactNode>();
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      let bg = (col + row) % 2 === 0 ? lightSquareColor : darkSquareColor;
      if (props.highlightedSquares !== undefined) {
        let square = props.highlightedSquares.find(
          s => s.row === row && s.column === col
        );
        bg = square === undefined ? bg : highlightedSquareColor;
      }
      result.push(
        <SquareFrame
          piece={props.board.pieces[row][col]}
          background={bg}
          onClick={() => {
            props.onSquareClick(row, col);
          }}
          key={row.toString() + col.toString()}
        ></SquareFrame>
      );
    }
  }
  return <div style={boardStyle}>{result}</div>;
};
