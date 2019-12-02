import React from "react";
import "./App.css";
import { Board } from "./components/Board";
import { DummyChessEngine } from "./game-engine/dummy-engine/DummyChessEngine";

const App: React.FC = () => {
  let engine = new DummyChessEngine();
  let board = engine.getChessBoard();
  return (
    <div className="App">
      <Board board={board}></Board>
    </div>
  );
};

export default App;
