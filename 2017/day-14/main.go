package main

import (
	"fmt"
	"strconv"
)

func ComputeRow(input string, row int) (result string) {
	hash := KnotHash(input + "-" + strconv.Itoa(row))
	// fmt.Printf("%s-%d: %s (%d)\n", input, row, hash, len(hash))
	for _, digit := range hash {
		parsed, _ := strconv.ParseInt(string(digit), 16, 32)
		result = result + fmt.Sprintf("%04b", parsed)
		// fmt.Printf("%s => %s\n", string(digit), fmt.Sprintf("%04b", parsed))
	}
	return
}

func CountUsedSquares(input string) (used int) {
	for i := 0; i < 128; i++ {
		row := ComputeRow(input, i)
		for _, c := range row {
			if string(c) == "1" {
				used++
			}
		}
	}
	return
}

func main() {
	const input = "ffayrhll"
	used := CountUsedSquares(input)
	fmt.Printf("%d squares are used\n", used)
}
