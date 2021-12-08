const outputNumbersRegex = /[^|]*\|(\s+\w+)(\s+\w+)(\s+\w+)(\s+\w+)/;

export class OutputCounter {
  private counts: number[] = new Array(8).fill(0);

  count(line: string): string[] {
    const parsed = line.match(outputNumbersRegex);

    if (!parsed) {
      throw new Error(`Not parseable: ${line}`);
    }

    const outputNumbers = [parsed[1], parsed[2], parsed[3], parsed[4]].map(
      (s) => s.trim()
    );
    outputNumbers.forEach((n) => {
      this.counts[n.length] += 1;
    });

    return outputNumbers;
  }

  countUniquePatternDigits(): number {
    return (
      this.counts[2] + //1
      this.counts[4] + //4
      this.counts[3] + //7
      this.counts[7] //8
    );
  }
}
