import { ChessBoard } from "../game-engine/ChessBoard";
import { Square } from "./Square";
import React, { ReactNode } from "react";
import { ChessSquare } from "../game-engine/ChessSquare";

interface BoardProps {
  board: ChessBoard;
  onSquareClick: (col: number, row: number) => void;
  highlightedSquares?: Array<ChessSquare>;
}

const boardStyle: React.CSSProperties = {
  height: "80vmin",
  width: "80vmin",
  borderRadius: "2px",
  overflow: "hidden"
};

const darkSquareColor: string = "#ab5e3a";
const lightSquareColor: string = "#ffddba";
const highlightedSquareColor: string = "#fff763";

export const Board: React.FunctionComponent<BoardProps> = props => {
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
        <Square
          piece={props.board.pieceAt(new ChessSquare(row, col))}
          background={bg}
          onClick={() => {
            props.onSquareClick(row, col);
          }}
          key={row.toString() + col.toString()}
        ></Square>
      );
    }
  }
  return <div style={boardStyle}>{result}</div>;
};
