package main

import (
	"bufio"
	"fmt"
	"io"
	"os"
	"strconv"
)

func main() {
	exo := os.Args[1:2][0]
	input, _ := os.Open("input.txt")
	if exo == "a" {
		changes := readFile(input)
		fmt.Println(applyFrom(0, changes))
	} else if exo == "b" {

	}
}

func readFile(in io.Reader) []int {
	result := make([]int, 0)
	scanner := bufio.NewScanner(in)
	for scanner.Scan() {
		i, _ := strconv.Atoi(scanner.Text())
		result = append(result, i)
	}
	return result
}

func applyFrom(base int, changes []int) int {
	result := 0
	for _, change := range changes {
		result += change
	}
	return result
}
