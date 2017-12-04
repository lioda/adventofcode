package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	file, _ := os.Open("log.txt")
	reader := bufio.NewReader(file)
	line, _, _ := reader.ReadLine()
	analyser := AnalLog{string(line)}
	result := analyser.CountBottlenecks()
	fmt.Printf("Log to parse: %s.\n", string(line))
	fmt.Printf("%d bootlenecks.\n", result)
}
