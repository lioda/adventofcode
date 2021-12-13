import { Row } from "./row";

describe("Row", () => {
  it("should add dot to its collection", () => {
    expect(new Row([]).add(2)).toEqual(new Row([2]));
    expect(new Row([]).add(2).countDots()).toEqual(1);
  });
  it("when dots do not overlapse, then add them", () => {
    const row = new Row([1, 3, 5]).fusion(new Row([2, 4]));
    expect(row).toEqual(new Row([1, 2, 3, 4, 5]));
    expect(row.countDots()).toBe(5);
  });
  it("when dots overlapse, then keep only one", () => {
    const row = new Row([1, 3, 5]).fusion(new Row([2, 3, 5]));
    expect(row).toEqual(new Row([1, 2, 3, 5]));
    expect(row.countDots()).toBe(4);
  });
  it("when fold and dots adds dots", () => {
    const row = new Row([1, 3, 6]).fold(4);
    expect(row).toEqual(new Row([1, 2, 3]));
    expect(row.countDots()).toBe(3);
  });

  it("when fold and dots overlapse then keep only one", () => {
    const row = new Row([1, 3, 5]).fold(4);
    expect(row).toEqual(new Row([1, 3]));
    expect(row.countDots()).toBe(2);
  });

  it("when fold and dots overlapse then keep only one", () => {
    const row = new Row([1, 3, 6, 8, 9, 10]).fold(5);
    expect(row).toEqual(new Row([0, 1, 2, 3, 4]));
    expect(row.countDots()).toBe(5);
  });

  it("should display", () => {
    const row = new Row([1, 3, 6, 8, 9, 10]);
    expect(row.display()).toEqual(" # #  # ###");
  });
});
