import React, { FC } from "react";

import { Board } from "./Board";
import { useGameState } from "./useGameState";

export const Game: FC = () => {
  const {
    currentBoard,
    draw,
    stepNumber,
    nextPlayer,
    winner,
    computeMove,
    restartGame
  } = useGameState();

  const shouldRenderRestartButton = winner || stepNumber === 9;

  const renderStatusMessage = () => {
    if (winner) {
      return "Winner: " + winner;
    } else if (draw) {
      return "Draw: Game over";
    } else {
      return "Next player: " + (nextPlayer === "X" ? "❌" : "⭕");
    }
  };

  return (
    <>
      <h1>
        TIC-TAC-LIVEN{" "}
        <span role="img" aria-label="rocket">
          🚀
        </span>
      </h1>
      <div className="game">
        <div className="game-board">
          <Board squares={currentBoard} onSquareClick={computeMove} />
        </div>
        <div className="game-info">
          <div>Current step: {stepNumber}</div>
          <div>{renderStatusMessage()}</div>

          {shouldRenderRestartButton && (
            <div>
              <button onClick={restartGame}>Restart</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
