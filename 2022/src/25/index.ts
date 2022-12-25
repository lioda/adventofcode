import { open } from "node:fs/promises";
import { exo01, fromSnafu, toSnafu } from "./exos";

// async function yolo() {
//     const file = await open("./src/09/input.txt");
//   const lines: string[] = [];
//   for await (const line of file.readLines()) {
//     lines.push(line);
//   }
//     for (let i = 0; i < 100; ++i) {
//         const snafu = toSnafu(i);
//         const andBack = fromSnafu(snafu);
//         if (i !== andBack) {
//             console.log({ i, snafu, andBack });
//         }
//         // console.log(toSnafu(22));
//     }
// }

// console.log("end");

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
