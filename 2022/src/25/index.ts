import { open } from "node:fs/promises";
import { exo01, fromSnafu, toSnafu } from "./exos";

async function main() {
  const file = await open("./src/25/input.txt");
  const lines: string[] = [];
  for await (const line of file.readLines()) {
    lines.push(line);
  }

  const result = exo01(lines);
  console.log({ result });
}

main();
