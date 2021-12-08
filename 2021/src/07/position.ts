export class Positions {
  static parse(input: number[]): Positions {
    return new Positions(input);
  }

  private constructor(private readonly initialPositions: number[]) {}

  findAligningPosition(): { position: number; fuel: number } {
    const unics = new Set(this.initialPositions);

    let fuel = Infinity;
    let position = 0;

    for (const unic of unics) {
      const neededFuel = this.fuelForPosition(unic);
      if (neededFuel < fuel) {
        fuel = neededFuel;
        position = unic;
      }
    }

    return {
      fuel,
      position,
    };
  }
  findAligningPositionWithIncreasingConsumption(): {
    position: number;
    fuel: number;
  } {
    // const unics = new Set(this.initialPositions);
    const max = Math.max(...this.initialPositions);

    let fuel = Infinity;
    let position = 0;

    for (let candidate = 0; candidate < max; ++candidate) {
      const neededFuel =
        this.fuelForPositionWithIncreasingConsumption(candidate);
      if (neededFuel < fuel) {
        fuel = neededFuel;
        position = candidate;
      }
    }

    return {
      fuel,
      position,
    };
  }

  fuelForPosition(destination: number): number {
    return this.initialPositions.reduce(
      (fuel, position) => fuel + Math.abs(position - destination),
      0
    );
  }

  fuelForPositionWithIncreasingConsumption(destination: number): number {
    return this.initialPositions.reduce((fuel, position, idx) => {
      const steps = Math.abs(position - destination);
      const cost = new Array(steps)
        .fill(0)
        .reduce((acc, _, step) => acc + step + 1, 0);
      return fuel + cost;
    }, 0);
  }
}
