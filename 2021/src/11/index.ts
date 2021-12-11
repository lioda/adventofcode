import { CaveMap } from "./map";
import { findFirstSync, runSteps } from "./step";

const input = [
  "5212166716",
  "1567322581",
  "2268461548",
  "3481561744",
  "6248342248",
  "6526667368",
  "5627335775",
  "8124511754",
  "4614137683",
  "4724561156",
];

function exo01() {
  const map = CaveMap.parse(input);
  const result = runSteps(map, 100);
  console.log(result);
}
function exo02() {
  const map = CaveMap.parse(input);
  const result = findFirstSync(map);
  console.log(result);
}

// exo01();
exo02();
