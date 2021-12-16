import { BitString } from "./bit-string";
import { execute, parsePacket } from "./parse";

describe("parsePacket", () => {
  const bits = (s: string) => BitString.parse(s);

  it("should parse version and type", () => {
    const result = parsePacket(bits("D2FE28"));
    expect(result).toMatchObject({ version: 6, typeId: 4 });
  });

  describe("type 4: literal packet", () => {
    it("should parse literal value", () => {
      const result = parsePacket(bits("D2FE28"));
      expect(result).toEqual({
        read: 21,
        version: 6,
        typeId: 4,
        literal: 2021,
        addVersionNumbers: 6,
      });
    });
  });

  describe("operator packet", () => {
    it("should parse operator with length Type Id of 0", () => {
      const result = parsePacket(bits("38006F45291200"));
      expect(result).toEqual({
        read: 49,
        addVersionNumbers: 9,
        version: 1,
        typeId: 6,
        lengthTypeId: 0,
        numberOfBits: 27,
        packets: [
          {
            read: 11,
            addVersionNumbers: 6,
            version: 6,
            typeId: 4,
            literal: 10,
          },
          {
            read: 16,
            addVersionNumbers: 2,
            version: 2,
            typeId: 4,
            literal: 20,
          },
        ],
      });
    });
    it("should parse operator with length Type Id of 1", () => {
      const result = parsePacket(bits("EE00D40C823060"));
      expect(result).toEqual({
        read: 51,
        addVersionNumbers: 7 + 2 + 4 + 1,
        version: 7,
        typeId: 3,
        lengthTypeId: 1,
        numberOfPackets: 3,
        packets: [
          {
            read: 11,
            addVersionNumbers: 2,
            version: 2,
            typeId: 4,
            literal: 1,
          },
          {
            read: 11,
            addVersionNumbers: 4,
            version: 4,
            typeId: 4,
            literal: 2,
          },
          {
            read: 11,
            addVersionNumbers: 1,
            version: 1,
            typeId: 4,
            literal: 3,
          },
        ],
      });
    });

    it.each([
      ["8A004A801A8002F478", 16],
      ["620080001611562C8802118E34", 12],
      ["C0015000016115A2E0802F182340", 23],
      ["A0016C880162017C3686B18A3D4780", 31],
    ])("should parse packet %s to sum version %d ", (input, expected) => {
      expect(parsePacket(bits(input)).addVersionNumbers).toEqual(expected);
    });
  });

  describe("operator", () => {
    it("should do a sum", () => {
      const packet = parsePacket(bits("C200B40A82"));
      const result = execute(packet);

      expect(result).toBe(3);
    });
    it("should do a product", () => {
      const packet = parsePacket(bits("04005AC33890"));
      const result = execute(packet);

      expect(result).toBe(54);
    });
    it("should do a minium", () => {
      const packet = parsePacket(bits("880086C3E88112"));
      const result = execute(packet);

      expect(result).toBe(7);
    });
    it("should do a maximum", () => {
      const packet = parsePacket(bits("CE00C43D881120"));
      const result = execute(packet);

      expect(result).toBe(9);
    });
    it("should do a lessThan", () => {
      const packet = parsePacket(bits("D8005AC2A8F0"));
      const result = execute(packet);

      expect(result).toBe(1);
    });
    it("should do a greaterThan", () => {
      const packet = parsePacket(bits("F600BC2D8F"));
      const result = execute(packet);

      expect(result).toBe(0);
    });
    it("should do a equal", () => {
      const packet = parsePacket(bits("9C005AC2F8F0"));
      const result = execute(packet);

      expect(result).toBe(0);
    });
    it("should do an operation", () => {
      const packet = parsePacket(bits("9C0141080250320F1802104A08"));
      const result = execute(packet);

      expect(result).toBe(1);
    });
  });
});
