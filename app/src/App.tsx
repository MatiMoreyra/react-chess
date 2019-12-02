import React from "react";
import "./App.css";
import { Board } from "./components/Board";
import { DummyChessEngine } from "./game-engine/dummy-engine/DummyChessEngine";
import { ChessSquare } from "./game-engine/ChessSquare";

function handleSquareClick(row: number, col: number) {
  console.log(row + "," + col + " clicked");
}

const highlightedSquares = new Array<ChessSquare>(new ChessSquare(1, 1));

const App: React.FC = () => {
  let engine = new DummyChessEngine();
  let board = engine.getChessBoard();
  return (
    <div className="App">
      <Board
        board={board}
        onSquareClick={handleSquareClick}
        highlightedSquares={highlightedSquares}
      ></Board>
    </div>
  );
};

export default App;
