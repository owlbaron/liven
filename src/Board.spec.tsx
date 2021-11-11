import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Board, BoardProps } from "./Board";

const SquareSpy = jest.spyOn(require("./Square"), "Square");

const defaultProps: BoardProps = {
  onSquareClick: jest.fn(),
  squares: [null, null, null, "X", "O", null, null, null, null]
};

describe("Board component", () => {
  const testCases = [
    [0, null],
    [1, null],
    [2, null],
    [3, "X"],
    [4, "O"],
    [5, null],
    [6, null],
    [7, null],
    [8, null]
  ];

  it.each(testCases)(
    "should render square with id %p and value %p",
    (id, value) => {
      render(<Board {...defaultProps} />);

      expect(SquareSpy).toHaveBeenCalledWith(
        { id, value, onClick: expect.any(Function) },
        {}
      );
    }
  );
});
