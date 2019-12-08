import { Board } from "./Board";
import React from "react";
import { AbstractChessEngine, Move } from "../game-engine/AbstractChessEngine";
import { ChessSquare } from "../game-engine/ChessSquare";
import { Centered } from "./utils/Centered";

interface ChessGameProps {
  engine: AbstractChessEngine;
}

interface ChessGameState {
  sourceSquare: ChessSquare | null;
}

const gameStyle: React.CSSProperties = {
  backgroundImage: "linear-gradient(-90deg, #643722, #bf9c77, #643722)",
  width: "100vw",
  height: "100vh"
};

export class ChessGame extends React.Component<ChessGameProps, ChessGameState> {
  constructor(p: ChessGameProps) {
    super(p);
    this.state = {
      sourceSquare: null
    };
  }

  render() {
    let board = this.props.engine.getChessBoard();
    return (
      <div style={gameStyle}>
        <Centered>
          <Board
            board={board}
            onSquareClick={this.handleSquareClick}
            highlightedSquares={this.highlightedSquares()}
          ></Board>
        </Centered>
      </div>
    );
  }

  private handleSquareClick = (row: number, col: number) => {
    console.log(row + "," + col + " clicked");
    if (this.state.sourceSquare == null) {
      if (
        this.props.engine.getChessBoard().pieceAt(new ChessSquare(row, col)) !=
        null
      ) {
        this.setState({ sourceSquare: new ChessSquare(row, col) });
      }
    } else {
      let move: Move = {
        source: this.state.sourceSquare,
        destination: new ChessSquare(row, col)
      };
      if (this.props.engine.isValidMove(move)) {
        this.props.engine.move(move);
      }
      this.setState({ sourceSquare: null });
    }
  };

  private highlightedSquares = () => {
    let squares = new Array<ChessSquare>();
    if (this.state.sourceSquare != null) {
      squares.push(this.state.sourceSquare);
    }
    return squares;
  };
}
