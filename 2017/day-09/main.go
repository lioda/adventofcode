package main

import (
	"bufio"
	"fmt"
	"io"
	"os"
)

type stack struct {
	groups  int
	garbage bool
}

func newStack() *stack {
	s := new(stack)
	s.groups = 0
	s.garbage = false
	return s
}

func (s *stack) push() int {
	if s.garbage {
		return 0
	}
	s.groups = s.groups + 1
	return s.groups
}
func (s *stack) pop() {
	if s.garbage {
		return
	}
	s.groups = s.groups - 1
}
func (s *stack) enterGarbage() (changed bool) {
	changed = !s.garbage
	s.garbage = true
	return
}
func (s *stack) exitGarbage() {
	s.garbage = false
}

func ComputeScore(r io.Reader) int {
	result := 0
	stack := newStack()
	input := bufio.NewReader(r)
	skipNext := false
	for c, _, err := input.ReadRune(); err == nil; c, _, err = input.ReadRune() {
		if skipNext {
			skipNext = false
			continue
		}
		char := string(c)
		switch char {
		case "{":
			result = result + stack.push()
		case "}":
			stack.pop()
		case "<":
			stack.enterGarbage()
		case ">":
			stack.exitGarbage()
		case "!":
			skipNext = true
		}
	}
	return result
}
func CountGarbage(r io.Reader) int {
	result := 0
	stack := newStack()
	input := bufio.NewReader(r)
	skipNext := false
	for c, _, err := input.ReadRune(); err == nil; c, _, err = input.ReadRune() {
		if skipNext {
			skipNext = false
			continue
		}
		garbageOpener := false
		char := string(c)
		switch char {
		case "{":
			stack.push()
		case "}":
			stack.pop()
		case "<":
			garbageOpener = stack.enterGarbage()
		case ">":
			stack.exitGarbage()
		case "!":
			skipNext = true
		default:
		}
		if !garbageOpener && !skipNext && stack.garbage {
			result++
		}
	}
	return result
}

func main() {
	f, _ := os.Open("input.txt")
	fmt.Printf("Score of input: %d\n", ComputeScore(f))
	f, _ = os.Open("input.txt")
	fmt.Printf("Count in garbage: %d\n", CountGarbage(f))
}
