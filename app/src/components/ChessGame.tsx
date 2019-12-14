import { BoardView } from "./BoardView";
import React from "react";
import { ChessGameEngine } from "../game-engine/ChessGameEngine";
import { ISquare } from "../game-engine/ISquare";
import { Centered } from "./utils/Centered";
import { IMove } from "../game-engine/IMove";

interface ChessGameProps {
  engine: ChessGameEngine;
}

interface ChessGameState {
  sourceSquare: ISquare | null;
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
          <BoardView
            board={board}
            onSquareClick={this.handleSquareClick}
            highlightedSquares={this.highlightedSquares()}
          ></BoardView>
        </Centered>
      </div>
    );
  }

  private handleSquareClick = (row: number, col: number) => {
    console.log(row + "," + col + " clicked");
    if (this.state.sourceSquare == null) {
      if (this.props.engine.getChessBoard().pieces[row][col] != null) {
        this.setState({ sourceSquare: { row: row, column: col } });
      }
    } else {
      let move: IMove = {
        source: this.state.sourceSquare,
        destination: { row: row, column: col }
      };
      if (this.props.engine.isValidMove(move)) {
        this.props.engine.move(move);
      }
      this.setState({ sourceSquare: null });
    }
  };

  private highlightedSquares = () => {
    let squares = new Array<ISquare>();
    if (this.state.sourceSquare != null) {
      squares.push(this.state.sourceSquare);
    }
    return squares;
  };
}
