import React, { FC } from "react";
import { Player } from "./types";

export type SquareProps = {
  id: number;
  value: Player | null;
  onClick: () => void;
};

export const Square: FC<SquareProps> = ({ id, value, onClick }) => {
  return (
    <button data-testid={`square-${id}`} className="square" onClick={onClick}>
      {value}
    </button>
  );
};
