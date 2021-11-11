import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Game } from "./Game";

const computeMove = jest.fn();
const restartGame = jest.fn();

const useGameStateSpy = jest.spyOn(require("./useGameState"), "useGameState");
const BoardSpy = jest.spyOn(require("./Board"), "Board");

describe("Game component", () => {
  beforeAll(() => {
    useGameStateSpy.mockReturnValue({
      currentBoard: [],
      draw: false,
      stepNumber: 0,
      nextPlayer: "X",
      winner: null,
      computeMove,
      restartGame
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    restartGame.mockClear();
  });

  it("should render game headings", () => {
    const { getByText } = render(<Game />);

    getByText("TIC-TAC-LIVEN");
  });

  it("should render board", () => {
    render(<Game />);

    expect(BoardSpy).toHaveBeenCalledWith(
      {
        squares: [],
        onSquareClick: computeMove
      },
      {}
    );
  });

  it("should render step counter", () => {
    const { getByText } = render(<Game />);

    getByText("Current step: 0");
  });

  it("should render next player status", () => {
    const { getByText } = render(<Game />);

    getByText("Next player: ❌");
  });

  describe("when the match ends with a winner", () => {
    beforeAll(() => {
      useGameStateSpy.mockReturnValue({
        currentBoard: [],
        draw: false,
        stepNumber: 7,
        nextPlayer: "X",
        winner: "X",
        computeMove,
        restartGame
      });
    });

    it("should render draw status", () => {
      const { getByText } = render(<Game />);

      getByText("Winner: X");
    });

    it("should render restart button", () => {
      const { getByText } = render(<Game />);

      getByText("Restart");
    });

    describe("when click on restart button", () => {
      it("should call restart game", () => {
        const { getByText } = render(<Game />);

        fireEvent.click(getByText("Restart"));

        expect(restartGame).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe("when the match ends in a draw", () => {
    beforeAll(() => {
      useGameStateSpy.mockReturnValue({
        currentBoard: [],
        draw: true,
        stepNumber: 9,
        nextPlayer: "X",
        winner: null,
        computeMove,
        restartGame
      });
    });

    it("should render draw status", () => {
      const { getByText } = render(<Game />);

      getByText("Draw: Game over");
    });

    it("should render restart button", () => {
      const { getByText } = render(<Game />);

      getByText("Restart");
    });

    describe("when click on restart button", () => {
      it("should call restart game", () => {
        const { getByText } = render(<Game />);

        fireEvent.click(getByText("Restart"));

        expect(restartGame).toHaveBeenCalledTimes(1);
      });
    });
  });
});
