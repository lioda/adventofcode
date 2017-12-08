package main

import (
	"bufio"
	"fmt"
	"io"
	"os"
	"strings"
)

func ParseLine(line string) (root string, holdings []string) {
	splitted := strings.Split(line, " -> ")
	root = string(splitted[0][:strings.Index(splitted[0], " ")])
	if len(splitted) == 1 {
		return
	}
	holdings = strings.Split(splitted[1], ", ")
	return
}

func FindBottom(input io.Reader) string {
	holded := make(map[string]bool)
	buf := bufio.NewReader(input)
	for line, _, _ := buf.ReadLine(); line != nil; line, _, _ = buf.ReadLine() {
		root, holdings := ParseLine(string(line))
		for _, holding := range holdings {
			//holded = append(holded, holding)
			holded[holding] = false
		}
		_, ok := holded[root]
		if !ok {
			holded[root] = true
		}
	}
	for key, bottom := range holded {
		if bottom {
			return key
		}
	}
	return ""
}

func main() {
	f, _ := os.Open("input.txt")
	// input, _ := ioutil.ReadAll(f)
	fmt.Printf("Bottom: %s\n", FindBottom(f))
}
