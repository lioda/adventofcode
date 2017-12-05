package main

import (
	"strings"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestOneStepWithPositiveMovesForward(t *testing.T) {
	instr := []int{2, 3, 0, 1, -3}
	cpu := NewCpu(instr)
	assert.Equal(t, 0, cpu.Current)
	cpu.Step()
	assert.Equal(t, 2, cpu.Current)
}
func TestOneStepWithNegativeMovesBackward(t *testing.T) {
	instr := []int{2, 3, -1, 1, -3}
	cpu := NewCpu(instr)
	assert.Equal(t, 0, cpu.Current)
	cpu.Step()
	cpu.Step()
	assert.Equal(t, 1, cpu.Current)
}
func TestOneStepIncrementInstr(t *testing.T) {
	instr := []int{2, 3, -1, 1, -3}
	cpu := NewCpu(instr)
	cpu.Step()
	assert.Equal(t, []int{3, 3, -1, 1, -3}, cpu.Instr)
	cpu.Step()
	assert.Equal(t, []int{3, 3, 0, 1, -3}, cpu.Instr)
}
func TestOneStepExitInstructionsReturnFalse(t *testing.T) {
	instr := []int{3, 3, -1, 2, -3}
	cpu := NewCpu(instr)
	assert.True(t, cpu.Step())
	assert.True(t, cpu.Step())
	assert.False(t, cpu.Step())
}
func TestFindExitFromMaze(t *testing.T) {
	input := "0\n3\n0\n1\n-3\n"
	maze := Maze{strings.NewReader(input)}
	assert.Equal(t, 5, maze.CountStepToExit())
}
