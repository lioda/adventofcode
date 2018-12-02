package main

import (
	"bufio"
	"fmt"
	"io"
	"os"
	"strconv"
)

func main() {
	if len(os.Args) < 2 {
		panic("a or b ?")
	}
	exo := os.Args[1:2][0]
	input, _ := os.Open("input.txt")
	changes := readFile(input)
	if exo == "a" {
		fmt.Println(applyFrom(0, changes))
	} else if exo == "b" {
		fmt.Println(findRepeatedFrequency(0, changes))
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

func findRepeatedFrequency(base int, changes []int) int {
	found := make(map[int]bool)
	found[base] = true
	frequency := 0
	for i := 0; ; i++ {
		frequency += changes[i%len(changes)]
		if found[frequency] {
			return frequency
		} else {
			found[frequency] = true
		}
	}
}
