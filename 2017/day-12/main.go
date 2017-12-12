package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

type Pipes struct {
	m     map[string][]string
	group map[string]bool
}

func NewPipes() *Pipes {
	return &Pipes{make(map[string][]string), nil}
}
func (p *Pipes) Parse(s string) {
	pipeDesc := strings.Split(s, " <-> ")
	key := pipeDesc[0]
	value := strings.Split(pipeDesc[1], ", ")
	p.m[key] = value
}
func (p Pipes) CountGroup(s string) int {
	p.group = make(map[string]bool)
	p.count(s)
	return len(p.group)
}

func (p Pipes) count(s string) {
	if _, alreadySeen := p.group[s]; alreadySeen {
		return
	}
	p.group[s] = true
	for _, item := range p.m[s] {
		p.count(item)
	}

}

func main() {
	f, _ := os.Open("input.txt")
	input := bufio.NewReader(f)
	pipes := NewPipes()
	for line, err := input.ReadString('\n'); err == nil; line, err = input.ReadString('\n') {
		pipes.Parse(line[:len(line)-1])
	}
	fmt.Printf("0 are in a group of : %d\n", pipes.CountGroup("0"))
}
