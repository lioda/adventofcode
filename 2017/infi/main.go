package main

import (
	"fmt"
	"os"
)

func main() {
	file, _ := os.Open("log.txt")
	analyser := NewAnalLog(file)
	result := analyser.CountBottlenecks()
	fmt.Printf("%d bootlenecks.\n", result)
}
