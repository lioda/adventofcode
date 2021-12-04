import { inputByLine } from "../common/inputByLine";
import { BingoGame } from "./bingo-game";

async function exo01() {
  const input: string[] = [];
  await inputByLine("src/04/input", (line) => input.push(line));
  const game = BingoGame.parse(input);
  // const bingo = game.run();
  // console.log(bingo);
  const lastWinning = game.findLastWinningBoard();
  console.log(lastWinning);
}

exo01();
