import { open, FileHandle } from 'node:fs/promises'

export interface Lines {
  map<T>(lineMapper: (s: string) => T): Promise<T[]>
}

export class TextFileLines implements Lines {
  private readonly fd: Promise<FileHandle>
  constructor(path: string) {
    this.fd = open(path)
  }

  async map<T>(lineMapper: (s: string) => T): Promise<T[]> {
    const result: T[] = []

    const file = await this.fd
    for await (const line of file.readLines()) {
      result.push(lineMapper(line))
    }

    return result
  }
}
