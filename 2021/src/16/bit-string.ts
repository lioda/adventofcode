import { parseInt } from "lodash";

type Hexa =
  | "0"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F";

const allHexas: Record<Hexa, string> = {
  "0": "0000",
  "1": "0001",
  "2": "0010",
  "3": "0011",
  "4": "0100",
  "5": "0101",
  "6": "0110",
  "7": "0111",
  "8": "1000",
  "9": "1001",
  A: "1010",
  B: "1011",
  C: "1100",
  D: "1101",
  E: "1110",
  F: "1111",
};

export class BitString {
  static parse(hexa: string): BitString {
    const splited = hexa.split("").map((s) => s as Hexa);
    return new BitString(splited);
  }

  private cursor = 0;
  private buffer = "";
  private constructor(private readonly hexas: Hexa[]) {}

  asString(): string {
    return this.hexas.map((h) => allHexas[h]).join("");
  }

  read(count: number): string {
    while (this.buffer.length < count && this.cursor < this.hexas.length) {
      this.buffer += allHexas[this.hexas[this.cursor++]];
    }
    const result = this.buffer.substring(0, count);
    this.buffer = this.buffer.substring(count);
    return result;
  }
}
