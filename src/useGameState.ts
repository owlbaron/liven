/**
 * Obs: O controle de estado principal da aplicação deve ser mantido neste hook
 */

import { useState } from "react";
import { Board, Player } from "./types";

const LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const MAX_STEPS = 9;

export type UseGameStateResult = {
  currentBoard: Board;
  draw: boolean;
  nextPlayer: Player;
  stepNumber: number;
  winner: Player | null;
  computeMove: (squareId: number) => void;
  restartGame: () => void;
};

export const useGameState = () => {
  const [firstToPlay, setFirstToPlay] = useState<Player>("X");
  const [stepNumber, setStepNumber] = useState(0);
  const [nextPlayer, setNextPlayer] = useState<Player>(firstToPlay);
  const [currentBoard, setCurrentBoard] = useState<Board>(Array(9).fill(null));

  const whoIsNext = (currentPlayer: Player): Player =>
    currentPlayer === "X" ? "O" : "X";

  const calculateWinner = () => {
    for (const line of LINES) {
      const [a, b, c] = line;

      if (
        currentBoard[a] &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        return currentBoard[a];
      }
    }

    return null;
  };

  const winner = calculateWinner();

  const draw = stepNumber === MAX_STEPS;

  const computeMove = (squareId: number) => {
    if (winner || currentBoard[squareId]) {
      // Game over or square already handled
      return;
    }

    setCurrentBoard((board) => {
      board[squareId] = nextPlayer;

      return board;
    });

    setNextPlayer((currentPlayer) => whoIsNext(currentPlayer));
    setStepNumber((currentStepNumber) => currentStepNumber + 1);
  };

  const restartGame = () => {
    const nextFirstToPlay = whoIsNext(firstToPlay);

    setFirstToPlay(nextFirstToPlay);
    setNextPlayer(nextFirstToPlay);
    setStepNumber(0);
    setCurrentBoard(currentBoard.fill(null));
  };

  return {
    currentBoard,
    draw,
    nextPlayer,
    stepNumber,
    winner,
    computeMove,
    restartGame
  };
};
