import { Bingo, Board } from "./board";

export type BingoParty = Bingo & { board: number };

export class BingoGame {
  static parse(input: string[]): BingoGame {
    const drawsLine = input.shift();
    const draws = drawsLine!.split(",").map((s) => parseInt(s, 10));

    const boards: Board[] = [];

    let boardRows: string[] = [];
    for (const line of input) {
      if (line.length === 0) {
        continue;
      }
      boardRows.push(line);
      if (boardRows.length === 5) {
        const board = Board.parse(boardRows);
        boards.push(board);
        boardRows = [];
      }
    }
    return new BingoGame(draws, boards);
  }

  constructor(
    private readonly draws: number[],
    private readonly boards: Board[]
  ) {}

  run(): BingoParty {
    for (const draw of this.draws) {
      let idx = 0;
      for (const board of this.boards) {
        const bingo = board.mark(draw);
        if (bingo) {
          return { ...bingo, board: idx };
        }
        idx += 1;
      }
    }
    throw new Error("nobody wins");
  }
  findLastWinningBoard(): BingoParty {
    const stillPlayingBoards = this.boards.map((board, idx) => ({
      board,
      idx,
      active: true,
    }));

    for (const draw of this.draws) {
      for (const board of stillPlayingBoards) {
        if (!board.active) {
          continue;
        }
        const bingo = board.board.mark(draw);
        if (!bingo) {
          continue;
        }
        board.active = false;
        if (stillPlayingBoards.every((b) => !b.active)) {
          return { ...bingo, board: board.idx };
        }
      }
    }
    throw new Error("nobody wins");
  }
}
