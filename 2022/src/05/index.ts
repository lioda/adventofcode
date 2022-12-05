import { open } from "node:fs/promises";
import { exo01, exo02 } from "./exos";

async function main() {
  const file = await open("./src/05/input.txt");
  const lines: string[] = [];
  for await (const line of file.readLines()) {
    lines.push(line);
  }

  const result = exo02(lines);
  console.log({ result });
}

main();
