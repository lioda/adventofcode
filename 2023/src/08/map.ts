import { Lines } from '../exercise/line-reader.js'

type NodeDef = { name: string; left: string; right: string }

export class DesertMap {
  static async parse(lines: Lines): Promise<DesertMap> {
    const arr = await lines.map((l) => l)
    const instructions = arr.shift()?.split('')

    arr.shift()
    const nodeDefRegexp = /(?<name>[0-9A-Z]{3}) = \((?<left>[0-9A-Z]{3}), (?<right>[0-9A-Z]{3})\)/
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

  public stepsForGhosts(): number {
    const startNodes = Array.from(this.nodes.entries())
      .filter(([name]) => name.endsWith('A'))
      .map(([_, node]) => node)

    const stepsToReachFirstZNode: Record<string, number> = this.findStepForReachingAZNode(startNodes)

    return Object.entries(stepsToReachFirstZNode)
      .map(([, steps]) => steps)
      .reduce((lcm, steps) => this.findLeastCommonMultiple(lcm, steps))
  }

  private findLeastCommonMultiple(n1: number, n2: number): number {
    const a = { base: n1, current: n1 }
    const b = { base: n2, current: n2 }

    while (a.current != b.current) {
      while (a.current < b.current) {
        a.current += a.base
      }
      while (b.current < a.current) {
        b.current += b.base
      }
    }
    return a.current
  }

  private findStepForReachingAZNode(startNodes: NodeDef[]) {
    const stepsToReachFirstZNode: Record<string, number> = {}

    for (const start of startNodes) {
      let currentNode = start
      let steps = 0
      while (!currentNode.name.endsWith('Z')) {
        const instruction = this.instructions[steps % this.instructions.length]!

        if (instruction === 'L') {
          currentNode = this.nodes.get(currentNode.left)!
        } else {
          currentNode = this.nodes.get(currentNode.right)!
        }

        ++steps
      }
      stepsToReachFirstZNode[start.name] = steps
    }
    return stepsToReachFirstZNode
  }
}
