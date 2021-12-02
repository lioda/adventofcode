import { inputByLine } from "../common/inputByLine";

export type Position = {
  horizontal: number;
  depth: number;
};
export type PositionAim = Position & {
  aim: number;
};

export class ParsedLine {
  constructor(
    private readonly command: "forward" | "up" | "down",
    private readonly distance: number
  ) {}

  applyParsedLine(init: Position): Position {
    switch (this.command) {
      case "up":
        return { ...init, depth: init.depth - this.distance };
      case "down":
        return { ...init, depth: init.depth + this.distance };
      default:
        return { ...init, horizontal: init.horizontal + this.distance };
    }
  }

  applyParsedLineAim(init: PositionAim): PositionAim {
    switch (this.command) {
      case "up":
        return { ...init, aim: init.aim - this.distance };
      case "down":
        return { ...init, aim: init.aim + this.distance };
      default:
        return {
          aim: init.aim,
          horizontal: init.horizontal + this.distance,
          depth: init.depth + init.aim * this.distance,
        };
    }
  }
}

export function parseLine(line: string): ParsedLine {
  const splited = line.split(" ");
  const command = splited[0] as any;
  const distance = parseInt(splited[1], 10);
  return new ParsedLine(command, distance);
}

export class Exo01 {
  private _position: Position = { horizontal: 0, depth: 0 };
  execute(line: string) {
    this._position = parseLine(line).applyParsedLine(this._position);
  }
  position(): Position & { result: number } {
    return {
      ...this._position,
      result: this._position.depth * this._position.horizontal,
    };
  }
}

export class Exo02 {
  private _position: PositionAim = { horizontal: 0, depth: 0, aim: 0 };
  execute(line: string) {
    this._position = parseLine(line).applyParsedLineAim(this._position);
  }
  position(): PositionAim & { result: number } {
    return {
      ...this._position,
      result: this._position.depth * this._position.horizontal,
    };
  }
}
