import { Lines } from '../exercise/line-reader.js'

type NodeDef = { name: string; left: string; right: string }

export class DesertMap {
  static async parse(lines: Lines): Promise<DesertMap> {
    const arr = await lines.map((l) => l)
    const instructions = arr.shift()?.split('')

    arr.shift()
    const nodeDefRegexp = /(?<name>[A-Z]{3}) = \((?<left>[A-Z]{3}), (?<right>[A-Z]{3})\)/
    const nodeDefs = arr.map((line) => {
      const groups = nodeDefRegexp.exec(line)!.groups
      return { name: groups!['name']!, left: groups!['left']!, right: groups!['right']! }
    })
    return new DesertMap(instructions! as any, nodeDefs)
  }

  private readonly nodes = new Map<string, NodeDef>()

  constructor(private readonly instructions: 'L' | 'R'[], nodes: NodeDef[]) {
    nodes.forEach((node) => {
      this.nodes.set(node.name, node)
    })
  }

  public stepsToReach(start: string, target: string): number {
    let steps = 0
    for (let node = this.nodes.get(start)!; node.name != target; ) {
      const instruction = this.instructions[steps % this.instructions.length]!
      if (instruction === 'L') {
        node = this.nodes.get(node.left)!
      } else {
        node = this.nodes.get(node.right)!
      }
      ++steps
    }
    return steps
  }
}
