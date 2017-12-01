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

func CaptchaHalf(input string) int {
	result := 0
	add := len(input) / 2
	// first, _ := strconv.Atoi(string(input[0]))
	for i := 0; i < len(input); i++ {
		curr := string(input[i])
		nextPos := (i + add) % len(input)
		// var next string
		// 	if i < len(input)-1 {
		// 		next = string(input[i+add])
		// 	} else {
		// 		next = string(input[0])
		// 	}
		next := string(input[nextPos])
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
	fmt.Printf("%s\n", string(input))
	fmt.Printf("%d\n", Captcha(string(input)))
	fmt.Printf("%d\n", CaptchaHalf(string(input)))
}
