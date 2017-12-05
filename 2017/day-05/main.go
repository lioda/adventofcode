package main

import (
	"bufio"
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

type Cpu struct {
	Instr   []int
	Current int
}

func NewCpu(instr []int) Cpu {
	return Cpu{Instr: instr}
}

func (cpu *Cpu) Step() bool {
	if cpu.Current >= len(cpu.Instr) {
		return false
	}
	instr := cpu.Instr[cpu.Current]
	cpu.Instr[cpu.Current]++
	cpu.Current = cpu.Current + instr
	return true
}
func (cpu *Cpu) Step2() bool {
	if cpu.Current >= len(cpu.Instr) {
		return false
	}
	instr := cpu.Instr[cpu.Current]
	if instr >= 3 {
		cpu.Instr[cpu.Current]--
	} else {
		cpu.Instr[cpu.Current]++
	}
	cpu.Current = cpu.Current + instr
	return true
}
func (cpu *Cpu) Print() string {
	display := []string{}
	for i, instr := range cpu.Instr {
		if i == cpu.Current {
			display = append(display, "("+strconv.Itoa(instr)+")")
		} else {
			display = append(display, strconv.Itoa(instr))
		}
	}
	return strings.Join(display, " ")
}

type Maze struct {
	Input io.Reader
}

func (m *Maze) readInput() []int {
	reader := bufio.NewReader(m.Input)
	result := []int{}
	for line, _, _ := reader.ReadLine(); line != nil; line, _, _ = reader.ReadLine() {
		strLine := string(line)
		if strLine == "" {
			continue
		}
		instr, _ := strconv.Atoi(strLine)
		result = append(result, instr)
	}
	return result
}

func (m *Maze) CountStepToExit() int {
	instr := m.readInput()
	cpu := NewCpu(instr)
	count := 0
	// fmt.Printf("%d - %s\n", count, cpu.Print())
	for cpu.Step() {
		count++
		// fmt.Printf("%d - %s\n", count, cpu.Print())
	}
	return count
}
func (m *Maze) CountStepToExit2() int {
	instr := m.readInput()
	cpu := NewCpu(instr)
	count := 0
	// fmt.Printf("%d - %s\n", count, cpu.Print())
	for cpu.Step2() {
		count++
		// fmt.Printf("%d - %s\n", count, cpu.Print())
	}
	return count
}

func main() {
	input, _ := os.Open("input.txt")
	maze := Maze{input}
	fmt.Printf("%d\n", maze.CountStepToExit())
	input, _ = os.Open("input.txt")
	maze = Maze{input}
	fmt.Printf("%d\n", maze.CountStepToExit2())
}
