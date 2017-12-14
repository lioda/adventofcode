package main

import (
	"fmt"
	"strconv"
	"strings"
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

type Pos struct {
	X, Y int
}

func displayGrid(grid [][]string, pos Pos) {
	fmt.Println("###################")
	fmt.Printf("%v\n", pos)
	for _, row := range grid {
		fmt.Printf("%v\n", row)
	}
	fmt.Println("###################")
}
func CountRegions(grid [][]string) (regions int) {
	// iter := 0
	for pos, found := findFirstElem(grid); found && regions < 10000; pos, found = findFirstElem(grid) {
		// displayGrid(grid, pos)
		zeroRegion(grid, pos)
		regions++ // = regions + 1
		// iter++
	}
	return
}
func findFirstElem(grid [][]string) (Pos, bool) {
	for i, arr := range grid {
		for j, c := range arr {
			if c != "0" {
				return Pos{j, i}, true
			}
		}
	}
	return Pos{0, 0}, false
}
func zeroRegion(grid [][]string, pos Pos) /*int*/ {
	// fmt.Printf("Try %v\n", pos)
	if pos.Y < 0 || pos.Y > 127 || pos.X < 0 || pos.X > 127 || grid[pos.Y][pos.X] == "0" {
		return
	}
	// fmt.Printf("Zero %v\n", pos)
	grid[pos.Y][pos.X] = "0"
	// result := 1
	zeroRegion(grid, Pos{pos.X + 1, pos.Y})
	zeroRegion(grid, Pos{pos.X - 1, pos.Y})
	zeroRegion(grid, Pos{pos.X, pos.Y + 1})
	zeroRegion(grid, Pos{pos.X, pos.Y - 1})
	// return result
}

func ConvertToGrid(input string) [][]string {
	result := make([][]string, 128)
	for i := 0; i < 128; i++ {
		row := ComputeRow(input, i)
		rowResult := strings.Split(row, "")
		// for _, c := range row {
		// if string(c) == "1" {
		// 	used++
		// }
		result[i] = rowResult
		// }
	}
	return result
}

func main() {
	const input = "ffayrhll"
	used := CountUsedSquares(input)
	fmt.Printf("%d squares are used\n", used)
	fmt.Printf("%d regions\n", CountRegions(ConvertToGrid(input)))
}
