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
	fmt.Printf("Will parse: %s\n", line)
	analyser := AnalLog{Log: string(line)}
	result := analyser.CountBottlenecks()
	fmt.Printf("Log to parse: %s.\n", string(line))
	fmt.Printf("%d bootlenecks.\n", result)
}
