package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func Captcha(input string) int {
	result := 0
	// first, _ := strconv.Atoi(string(input[0]))
	for i := 0; i < len(input); i++ {
		curr := string(input[i])
		var next string
		if i < len(input)-1 {
			next = string(input[i+1])
		} else {
			next = string(input[0])
		}
		if curr == next {
			conv, _ := strconv.Atoi(curr)
			result += conv
		}
	}
	return result
}

func main() {
	file, _ := os.Open("input-01.txt")
	reader := bufio.NewReader(file)
	input, _, _ := reader.ReadLine()
	// input, _ := ioutil.ReadFile("input-01.txt")
	fmt.Printf("%s\n", string(input))
	fmt.Printf("%d\n", Captcha(string(input)))
}
