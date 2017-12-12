package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

type Pipes struct {
	m        map[string][]string
	group    map[string]bool
	groups   map[string]bool
	programs []string
}

func NewPipes() *Pipes {
	return &Pipes{make(map[string][]string), nil, make(map[string]bool), make([]string, 0)}
}
func (p *Pipes) Parse(s string) {
	pipeDesc := strings.Split(s, " <-> ")
	key := pipeDesc[0]
	value := strings.Split(pipeDesc[1], ", ")
	p.m[key] = value
	p.programs = append(p.programs, key)
}
func (p Pipes) CountGroup(s string) int {
	p.group = make(map[string]bool)
	p.count(s)
	return len(p.group)
}

func (p Pipes) count(s string) {
	p.groups[s] = false
	if _, alreadySeen := p.group[s]; alreadySeen {
		return
	}
	p.group[s] = true
	for _, item := range p.m[s] {
		p.count(item)
	}
}

func (p Pipes) CountGroups() int {
	for _, prog := range p.programs {
		p.groups[prog] = true
	}
	result := 0
	for item, v := range p.groups {
		if v {
			p.CountGroup(item)
			result++
		}
	}
	return result
}

func main() {
	f, _ := os.Open("input.txt")
	input := bufio.NewReader(f)
	pipes := NewPipes()
	for line, err := input.ReadString('\n'); err == nil; line, err = input.ReadString('\n') {
		pipes.Parse(line[:len(line)-1])
	}
	fmt.Printf("0 are in a group of : %d\n", pipes.CountGroup("0"))
	fmt.Printf("There are %d groups in total\n", pipes.CountGroups())
}
