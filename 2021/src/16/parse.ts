import { BitString } from "./bit-string";

export type Packet = {
  read: number;
  addVersionNumbers: number;
  version: number;
  typeId: number;
} & (
  | { literal: number }
  | {
      lengthTypeId: number;
      numberOfBits?: number;
      numberOfPackets?: number;
      packets: Packet[];
    }
);

export function parsePacket(bits: BitString): Packet {
  const version = parseInt(bits.read(3), 2);
  let addVersionNumbers = version;
  const typeId = parseInt(bits.read(3), 2);
  let read = 3 + 3;

  if (typeId === 4) {
    const { literal, read: literalRead } = parseLiteral(bits);
    return {
      read: read + literalRead,
      version,
      typeId,
      literal,
      addVersionNumbers,
    };
  }

  const lengthTypeId = parseInt(bits.read(1), 2);
  const packets: Packet[] = [];
  const numberOfBitsOrPackets: {
    numberOfBits?: number;
    numberOfPackets?: number;
  } = {
    numberOfBits: undefined,
    numberOfPackets: undefined,
  };
  if (lengthTypeId === 0) {
    const numberOfBits = parseInt(bits.read(15), 2);
    numberOfBitsOrPackets.numberOfBits = numberOfBits;
    read += 1 + 15;
    let subpacketsRead = 0;
    while (subpacketsRead < numberOfBits) {
      const packet = parsePacket(bits);
      subpacketsRead += packet.read;
      packets.push(packet);

      addVersionNumbers += packet.addVersionNumbers;
    }
    read += subpacketsRead;
  } else {
    const numberOfPackets = parseInt(bits.read(11), 2);
    numberOfBitsOrPackets.numberOfPackets = numberOfPackets;
    read += 1 + 11;
    let subpacketsRead = 0;
    while (subpacketsRead < numberOfPackets) {
      const packet = parsePacket(bits);
      ++subpacketsRead;
      read += packet.read;
      packets.push(packet);

      addVersionNumbers += packet.addVersionNumbers;
    }
  }
  return {
    read,
    addVersionNumbers,
    version,
    typeId,
    lengthTypeId,
    ...numberOfBitsOrPackets,
    packets,
  };
}

function parseLiteral(bits: BitString): { literal: number; read: number } {
  let read = 0;
  let result = "";
  let header = "1";
  let group = [];
  const groups: string[][] = [];
  while (header === "1") {
    [header, ...group] = bits.read(5);
    result += group.join("");
    read += 5;
    groups.push([header, ...group]);
  }
  return { read, literal: parseInt(result, 2) };
}

const SUM = 0;
const PRODUCT = 1;
const MINIMUM = 2;
const MAXIMUM = 3;
const GREATER_THAN = 5;
const LESS_THAN = 6;
const EQUAL = 7;

export function execute(packet: Packet): number {
  const operation = packet.typeId;
  if ("packets" in packet) {
    if (operation === SUM) return sum(packet.packets);
    if (operation === PRODUCT) return product(packet.packets);
    if (operation === MINIMUM) return minimum(packet.packets);
    if (operation === MAXIMUM) return maximum(packet.packets);
    if (operation === GREATER_THAN) return gt(packet.packets);
    if (operation === LESS_THAN) return lt(packet.packets);
    if (operation === EQUAL) return eq(packet.packets);
    throw new Error(`unknown operation ${operation}`);
  } else {
    return packet.literal;
  }
}

function sum(packets: Packet[]): number {
  return packets.reduce((sum, subPacket) => {
    return sum + execute(subPacket);
  }, 0);
}

function product(packets: Packet[]): number {
  return packets.reduce((sum, subPacket) => {
    return sum * execute(subPacket);
  }, 1);
}

function minimum(packets: Packet[]): number {
  return packets.reduce((min, subPacket) => {
    const value = execute(subPacket);
    return value < min ? value : min;
  }, Infinity);
}

function maximum(packets: Packet[]): number {
  return packets.reduce((max, subPacket) => {
    const value = execute(subPacket);
    return max < value ? value : max;
  }, -Infinity);
}

function gt(packets: Packet[]): number {
  const v1 = execute(packets[0]);
  const v2 = execute(packets[1]);

  return v1 > v2 ? 1 : 0;
}

function lt(packets: Packet[]): number {
  const v1 = execute(packets[0]);
  const v2 = execute(packets[1]);

  return v1 < v2 ? 1 : 0;
}

function eq(packets: Packet[]): number {
  const v1 = execute(packets[0]);
  const v2 = execute(packets[1]);

  return v1 === v2 ? 1 : 0;
}
