import { BoardView } from "./game-view/BoardView";
import React from "react";
import { ChessGameEngine } from "../game-engine/ChessGameEngine";
import { ISquare } from "../game-engine/ISquare";
import { Centered } from "./utils/Centered";
import { IMove } from "../game-engine/IMove";
import { Row, Col, Container } from "react-bootstrap";
import { StatusPanel } from "./status-panel/StatusPanel";

interface ChessGameProps {
  engine: ChessGameEngine;
}

interface ChessGameState {
  sourceSquare: ISquare | null;
}

const gameStyle: React.CSSProperties = {
  backgroundImage: "linear-gradient(-90deg, #643722, #bf9c77, #643722)",
  width: "100vw",
  height: "100vh",
  overflow: "hidden"
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
          <Row
            style={{ margin: "10px", height: "80%", maxHeight: "80vh" }}
            bsPrefix={"d-flex justify-content-center"}
          >
            <Container bsPrefix={"d-flex justify-content-center"}>
              <Col>
                <BoardView
                  board={board}
                  onSquareClick={this.handleSquareClick}
                  highlightedSquares={this.highlightedSquares()}
                ></BoardView>
              </Col>
              <Col>
                <StatusPanel
                  history={this.props.engine.getHistory()}
                  currentTurn={this.props.engine.whoPlays()}
                  capturedPieces={this.props.engine.getCapturedPieces()}
                  onUndo={this.handleUndo}
                  onRestart={this.handleRestart}
                ></StatusPanel>
              </Col>
            </Container>
          </Row>
        </Centered>
      </div>
    );
  }

  private handleUndo = () => {
    this.props.engine.undoMove();
    this.setState({ sourceSquare: null });
  };

  private handleRestart = () => {
    this.props.engine.restart();
    this.setState({ sourceSquare: null });
  };

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
