import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Square, SquareProps } from "./Square";

const defaultProps: SquareProps = {
  id: 1,
  onClick: jest.fn(),
  value: null
};

describe("Square component", () => {
  it("should render a button", () => {
    const { getByTestId } = render(<Square {...defaultProps} />);

    getByTestId("square-1");
  });

  describe("when click on square", () => {
    it("should call on click", () => {
      const { getByTestId } = render(<Square {...defaultProps} />);

      fireEvent.click(getByTestId("square-1"));

      expect(defaultProps.onClick).toBeCalledTimes(1);
    });
  });
});
