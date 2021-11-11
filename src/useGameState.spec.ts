import {
  renderHook,
  act,
  RenderResult
} from "@testing-library/react-hooks/dom";

import { useGameState, UseGameStateResult } from "./useGameState";

describe("useGameState hook", () => {
  describe("when square is already filled", () => {
    it("should not override it", () => {
      const { result, waitForValueToChange } = renderHook(() => useGameState());
      const moves = [0, 1, 2, 0];

      moves.forEach(async (move) => {
        act(() => result.current.computeMove(move));

        await waitForValueToChange(() => result.current.nextPlayer);
      });

      expect(result.current.currentBoard).toEqual([
        "X", "O", "X",
        null, null, null,
        null, null, null
      ]);
    });
  });

  describe("when the match is restarted", () => {
    const moves = [0, 1, 2, 3, 4, 5];
    let res: RenderResult<UseGameStateResult>;

    beforeAll(async () => {
      const { result, waitForValueToChange } = renderHook(() => useGameState());
      res = result;

      moves.forEach(async (move) => {
        act(() => result.current.computeMove(move));

        await waitForValueToChange(() => result.current.nextPlayer);
      });

      act(() => result.current.restartGame());
    });

    it("should reset the board", () => {
      expect(res.current.currentBoard).toEqual([
        null, null, null,
        null, null, null,
        null, null, null
      ]);
    });

    it("should reset step count", () => {
      expect(res.current.stepNumber).toBe(0);
    });
  });

  describe('when "X" is the winner', () => {
    const testCases = [
      [[0, 3, 1, 4, 2]],
      [[0, 3, 4, 5, 8]],
      [[6, 1, 7, 2, 8]],
      [[0, 4, 3, 2, 6]],
      [[1, 3, 4, 6, 7]],
      [[2, 0, 5, 1, 8]],
      [[0, 7, 4, 6, 8]],
      [[2, 1, 4, 0, 6]]
    ];

    it.each(testCases)("with %p moves", (moves) => {
      const { result, waitForValueToChange } = renderHook(() => useGameState());

      moves.forEach(async (move) => {
        act(() => result.current.computeMove(move));

        await waitForValueToChange(() => result.current.nextPlayer);
      });

      expect(result.current.winner).toBe("X");
    });
  });

  describe('when "O" is the winner', () => {
    const testCases = [
      [[3, 0, 4, 1, 6, 2]],
      [[0, 3, 1, 4, 6, 5]],
      [[0, 6, 1, 7, 3, 8]],
      [[1, 0, 2, 3, 7, 6]],
      [[8, 1, 6, 4, 0, 7]],
      [[0, 2, 1, 5, 4, 8]],
      [[6, 0, 7, 4, 1, 8]],
      [[0, 2, 1, 4, 8, 6]]
    ];

    it.each(testCases)("with %p moves", (moves) => {
      const { result, waitForValueToChange } = renderHook(() => useGameState());

      moves.forEach(async (move) => {
        act(() => result.current.computeMove(move));

        await waitForValueToChange(() => result.current.nextPlayer);
      });

      expect(result.current.winner).toBe("O");
    });
  });

  describe("when the match ends in a draw", () => {
    const moves = [2, 1, 4, 6, 5, 8, 7, 3, 0];

    it(`with ${moves.toString()} moves`, () => {
      const { result, waitForValueToChange } = renderHook(() => useGameState());

      moves.forEach(async (move) => {
        act(() => result.current.computeMove(move));

        await waitForValueToChange(() => result.current.nextPlayer);
      });

      expect(result.current.draw).toBe(true);
    });
  });
});
