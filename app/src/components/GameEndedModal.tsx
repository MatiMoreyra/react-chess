import { GameResult } from "../game-engine/ChessGameEngine";
import { Modal, Button } from "react-bootstrap";
import React from "react";
import { PieceColor } from "../game-engine/IPiece";

interface GameEndedModalProps {
  currentTurn: PieceColor;
  result: GameResult;
  onHide: () => void;
}

export const GameEndedModal: React.FunctionComponent<GameEndedModalProps> = props => {
  let message: string;
  if (props.result === GameResult.Draw) {
    message = "Game ended by draw.";
  } else {
    if (props.currentTurn === PieceColor.White) {
      message = "Black won by checkmate.";
    } else {
      message = "White won by checkmate.";
    }
  }
  return (
    <Modal show={props.result !== GameResult.Open} onHide={props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Game ended!</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          onClick={props.onHide}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
