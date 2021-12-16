import { BitString } from "./bit-string";

describe("BitString", () => {
  it("should parse some hexadecimal characters", () => {
    const str = BitString.parse("01A");

    expect(str.asString()).toEqual("000000011010");
  });
  it("should read random character numbers", () => {
    const str = BitString.parse("01A");

    expect(str.read(3)).toEqual("000");
    expect(str.read(5)).toEqual("00001");
    expect(str.read(1)).toEqual("1");
    expect(str.read(3)).toEqual("010");
  });
  it("should return empty string if read more than length", () => {
    const str = BitString.parse("1");

    expect(str.read(3)).toEqual("000");
    expect(str.read(2)).toEqual("1");
    expect(str.read(3)).toEqual("");
  });
});
