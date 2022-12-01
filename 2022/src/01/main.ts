import { open } from "node:fs/promises";
import { exo01, exo02 } from ".";

async function main() {
  const file = await open("./src/01/input.txt");
  const lines: string[] = [];
  for await (const line of file.readLines()) {
    lines.push(line);
  }

  console.log(exo02(lines));
}

main();
