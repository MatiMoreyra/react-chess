import { ChessBoard } from "../game-engine/ChessBoard";
import { Square } from "./Square";
import React, { ReactNode } from "react";
import { ChessSquare } from "../game-engine/ChessSquare";
interface BoardProps {
  board: ChessBoard;
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

export const Board: React.FC<BoardProps> = props => {
  let result = new Array<ReactNode>();
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      let bg = (col + row) % 2 === 0 ? lightSquareColor : darkSquareColor;
      if (col === 0 && row === 0) {
        bg = highlightedSquareColor;
      }
      result.push(
        <Square
          piece={props.board.pieceAt(new ChessSquare(row, col))}
          background={bg}
        ></Square>
      );
    }
  }
  return <div style={boardStyle}>{result}</div>;
};
