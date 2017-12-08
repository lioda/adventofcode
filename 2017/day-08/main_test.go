package main

import (
	"bufio"
	"strings"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestIncIfInf(t *testing.T) {
	cpu := NewCpu()
	cpu.Process("a inc 1 if b < 5")
	cpu.Process("a inc 1 if b < -1")
	assert.Equal(t, map[string]int{"a": 1}, cpu.Registers)
}
func TestIncIfInfOrEq(t *testing.T) {
	cpu := NewCpu()
	cpu.Registers["b"] = 5
	cpu.Process("a inc 1 if b <= 5")
	cpu.Process("a inc 1 if b <= 6")
	cpu.Process("a inc 1 if b <= 4")
	assert.Equal(t, map[string]int{"a": 2, "b": 5}, cpu.Registers)
}
func TestIncIfEq(t *testing.T) {
	cpu := NewCpu()
	cpu.Registers["b"] = 5
	cpu.Process("a inc 1 if b == 5")
	cpu.Process("a inc 1 if b == 6")
	assert.Equal(t, map[string]int{"a": 1, "b": 5}, cpu.Registers)
}
func TestIncIfEqLargeNumber(t *testing.T) {
	cpu := NewCpu()
	cpu.Registers["b"] = 58
	cpu.Process("a inc 1 if b == 58")
	cpu.Process("a inc 1 if b == 6")
	assert.Equal(t, map[string]int{"a": 1, "b": 58}, cpu.Registers)
}

func TestIncIfNotEq(t *testing.T) {
	cpu := NewCpu()
	cpu.Registers["b"] = 4
	cpu.Process("a inc 1 if b != 5")
	cpu.Process("a inc 1 if b != 4")
	assert.Equal(t, map[string]int{"a": 1, "b": 4}, cpu.Registers)
}

func TestIncIfSup(t *testing.T) {
	cpu := NewCpu()
	cpu.Registers["b"] = 4
	cpu.Process("a inc 1 if b > 3")
	cpu.Process("a inc 1 if b > 4")
	cpu.Process("a inc 1 if b > 5")
	assert.Equal(t, map[string]int{"a": 1, "b": 4}, cpu.Registers)
}

func TestIncIfSupOrEq(t *testing.T) {
	cpu := NewCpu()
	cpu.Registers["b"] = 4
	cpu.Process("a inc 1 if b >= 3")
	cpu.Process("a inc 1 if b >= 4")
	cpu.Process("a inc 1 if b >= 5")
	assert.Equal(t, map[string]int{"a": 2, "b": 4}, cpu.Registers)
}

func TestDecIfEq(t *testing.T) {
	cpu := NewCpu()
	cpu.Registers["b"] = 5
	cpu.Process("a dec 1 if b == 5")
	cpu.Process("a dec -10 if b == 5")
	assert.Equal(t, map[string]int{"a": 9, "b": 5}, cpu.Registers)
}
func TestDecNegativeIfEq(t *testing.T) {
	cpu := NewCpu()
	cpu.Registers["b"] = 5
	cpu.Process("a dec -20 if b == 5")
	assert.Equal(t, map[string]int{"a": 20, "b": 5}, cpu.Registers)
}
func TestIncNegativeIfEq(t *testing.T) {
	cpu := NewCpu()
	cpu.Registers["b"] = 5
	cpu.Process("a inc -20 if b == 5")
	assert.Equal(t, map[string]int{"a": -20, "b": 5}, cpu.Registers)
}

func TestFindLargest(t *testing.T) {
	cpu := NewCpu()
	cpu.Registers["a"] = 4
	cpu.Registers["b"] = 15
	cpu.Registers["c"] = 6
	cpu.Registers["d"] = 69
	assert.Equal(t, 69, cpu.FindLargest())
}

func TestGlobal(t *testing.T) {
	input := `b inc 5 if a > 1
a inc 1 if b < 5
c dec -10 if a >= 1
c inc -20 if c == 10
`
	cpu := NewCpu()
	f := strings.NewReader(input)
	reader := bufio.NewReader(f)
	for line, _, _ := reader.ReadLine(); line != nil; line, _, _ = reader.ReadLine() {
		if string(line) == "" {
			continue
		}
		cpu.Process(string(line))
		// fmt.Printf("After %s registers are: %v\n", string(line), cpu.Registers)
	}
	// fmt.Printf("Largest value: %v\n", cpu.Registers)
	assert.Equal(t, 1, cpu.FindLargest())
	assert.Equal(t, 10, cpu.FindLargestAnyTime())
}
