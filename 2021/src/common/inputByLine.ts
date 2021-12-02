import { createReadStream } from "fs";
import * as readline from "readline";

export async function inputByLine(
  filename: string,
  callback: (line: string) => void
) {
  const fileStream = createReadStream(filename);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    callback(line);
  }
}
