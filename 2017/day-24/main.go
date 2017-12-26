package main

import (
	"bufio"
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func main() {
	f, _ := os.Open("input.txt")
	comps := ParseComponents(f)
	fmt.Printf("Strongest bridge: %d\n", BuildStrongestBridge(comps))
	fmt.Printf("Strongest of longest bridges: %d\n", BuildStrongestLongestBridge(comps))
}

type Component struct {
	port1, port2 int
}

func (c Component) Matches(pinSize int) bool {
	return c.port1 == pinSize || c.port2 == pinSize
}
func (c Component) Other(pinSize int) int {
	// return c.port1 == pinSize || c.port2 == pinSize
	if pinSize == c.port1 {
		return c.port2
	}
	return c.port1
}

func ParseComponents(r io.Reader) []Component {
	result := []Component{}
	in := bufio.NewReader(r)
	for line, _, _ := in.ReadLine(); line != nil; line, _, _ = in.ReadLine() {
		ports := strings.Split(string(line), "/")
		port0, _ := strconv.Atoi(ports[0])
		port1, _ := strconv.Atoi(ports[1])
		component := Component{port0, port1}
		result = append(result, component)
	}
	return result
}

type Bridge struct {
	used  map[Component]bool
	chain []Component
	last  int
}

func (b Bridge) Display() {
	s := ""
	sep := ""
	for _, comp := range b.chain {
		c := fmt.Sprintf("%d/%d", comp.port1, comp.port2)
		s = s + sep + c
		sep = "--"
	}
	fmt.Printf("(%d - %d) %s\n", b.Length(), b.Strength(), s)
}

func (b Bridge) Strength() int {
	result := 0
	for _, comp := range b.chain {
		result = result + comp.port1 + comp.port2
	}
	return result
}
func (b Bridge) Length() int {
	return len(b.chain)
}
func (b Bridge) Accept(comp Component) (bool, Bridge) {
	if accept := comp.Matches(b.last); !accept || b.used[comp] {
		return false, b
	}
	bridge := NewBridge()
	for k, v := range b.used {
		bridge.used[k] = v
	}
	for _, v := range b.chain {
		bridge.chain = append(bridge.chain, v)
	}
	bridge.used[comp] = true
	bridge.chain = append(bridge.chain, comp)
	bridge.last = comp.Other(b.last)
	return true, bridge
}

func NewBridge() Bridge {
	return Bridge{map[Component]bool{}, []Component{}, 0}
}

func BuildStrongestBridge(comps []Component) int {
	bridge := NewBridge()
	return buildStrongestBridge(bridge, comps)
	// return 0
}
func BuildStrongestLongestBridge(comps []Component) int {
	bridge := NewBridge()
	_, strongest := buildStrongestLongestBridge(bridge, comps)
	return strongest
	// return 0
}

func buildStrongestBridge(bridge Bridge, comps []Component) int {
	// pins := bridge.LastPin()
	// bridge.Display()
	strongest := bridge.Strength()
	for _, comp := range comps {
		accepted, bridge2 := bridge.Accept(comp)
		if !accepted {
			continue
		}
		if strength := buildStrongestBridge(bridge2, comps); strength > strongest {
			strongest = strength
		}
	}
	return strongest
}
func buildStrongestLongestBridge(bridge Bridge, comps []Component) (int, int) {
	// pins := bridge.LastPin()
	// bridge.Display()
	longest := bridge.Length()
	strongest := bridge.Strength()
	for _, comp := range comps {
		accepted, bridge2 := bridge.Accept(comp)
		if !accepted {
			continue
		}
		if length, strength := buildStrongestLongestBridge(bridge2, comps); length >= longest && strength > strongest {
			longest = length
			strongest = strength
		}
	}
	return longest, strongest
}
