import { Positions } from "./position";

describe("Positions", () => {
  const input = [16, 1, 2, 0, 4, 2, 7, 1, 2, 14];

  it("compute fuel for specific position", () => {
    const positions = Positions.parse(input);

    expect(positions.fuelForPosition(1)).toEqual(41);
  });

  it("compute fuel for aligning position", () => {
    const positions = Positions.parse(input);

    expect(positions.fuelForPosition(2)).toEqual(37);
  });

  it("compute fuel with increasing consumption", () => {
    const positions = Positions.parse(input);

    expect(positions.fuelForPositionWithIncreasingConsumption(2)).toEqual(206);
    expect(positions.fuelForPositionWithIncreasingConsumption(5)).toEqual(168);
  });

  it("should find aligning position", () => {
    const positions = Positions.parse(input);

    expect(positions.findAligningPosition()).toEqual({ position: 2, fuel: 37 });
  });

  it("should find aligning position with increasing consumption", () => {
    const positions = Positions.parse(input);

    expect(positions.findAligningPositionWithIncreasingConsumption()).toEqual({
      position: 5,
      fuel: 168,
    });
  });
});
