import React, { FC } from "react";
import { Square } from "./Square";
import { Board as BoardType } from "./types";

export type BoardProps = {
  squares: BoardType;
  onSquareClick: (id: number) => void;
};

export const Board: FC<BoardProps> = ({ squares, onSquareClick }) => {
  const renderSquare = (squareId: number) => (
    <Square
      id={squareId}
      value={squares[squareId]}
      onClick={() => onSquareClick(squareId)}
    />
  );

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};
