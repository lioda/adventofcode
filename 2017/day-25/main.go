package main

import "fmt"

func main() {
	machine := NewTuringMachine(
		12794428,
		"A",
		NewState("A", Case{1, RIGHT, "B"}, Case{0, LEFT, "F"}),
		NewState("B", Case{0, RIGHT, "C"}, Case{0, RIGHT, "D"}),
		NewState("C", Case{1, LEFT, "D"}, Case{1, RIGHT, "E"}),
		NewState("D", Case{0, LEFT, "E"}, Case{0, LEFT, "D"}),
		NewState("E", Case{0, RIGHT, "A"}, Case{1, RIGHT, "C"}),
		NewState("F", Case{1, LEFT, "A"}, Case{1, RIGHT, "A"}),
	)
	fmt.Printf("Checksum: %d\n", machine.DiagnosticChecksum())
}

type Direction uint8

const (
	LEFT Direction = iota
	RIGHT
)

type Case struct {
	set       int
	d         Direction
	nextState string
}

type State struct {
	Name  string
	Cases map[int]Case
}

func NewState(name string, c1 Case, c2 Case) State {
	return State{
		Name: name,
		Cases: map[int]Case{
			0: c1,
			1: c2,
		},
	}
}

type TuringMachine struct {
	steps  int
	states map[string]State
	tape   map[int]int
	state  string
}

func (m *TuringMachine) DiagnosticChecksum() int {
	currPos := 0
	for step := 0; step < m.steps; step++ {
		st := m.states[m.state]
		cas := st.Cases[m.tape[currPos]]

		m.tape[currPos] = cas.set
		if cas.d == RIGHT {
			currPos++
		} else {
			currPos--
		}
		m.state = cas.nextState
	}
	result := 0
	for _, v := range m.tape {
		result = result + v
	}
	return result
}

func NewTuringMachine(steps int, initial string, cs ...State) TuringMachine {
	states := map[string]State{}
	for _, c := range cs {
		states[c.Name] = c
	}
	return TuringMachine{steps, states, map[int]int{}, initial}
}
