package main

import (
	"strings"
	"testing"

	"github.com/stretchr/testify/assert"
)

const input = `..#
#..
...
`

func TestParseGrid(t *testing.T) {
	grid := NewGrid(strings.NewReader(input))
	assert.Equal(t, CLEAN, grid.Get(Cell{0, 0}))
	assert.Equal(t, INFECTED, grid.Get(Cell{1, 1}))
	assert.Equal(t, INFECTED, grid.Get(Cell{-1, 0}))
}
func TestInfectAndClean(t *testing.T) {
	grid := NewGrid(strings.NewReader(input))
	assert.Equal(t, CLEAN, grid.Get(Cell{0, 0}))
	grid.Infect(Cell{0, 0})
	assert.Equal(t, INFECTED, grid.Get(Cell{0, 0}))
	grid.Clean(Cell{0, 0})
	assert.Equal(t, CLEAN, grid.Get(Cell{0, 0}))
	assert.Equal(t, INFECTED, grid.Get(Cell{1, 1}))
	grid.Clean(Cell{1, 1})
	assert.Equal(t, CLEAN, grid.Get(Cell{1, 1}))
}
func TestNextStatus(t *testing.T) {
	grid := NewGrid(strings.NewReader(input))
	assert.Equal(t, CLEAN, grid.Get(Cell{0, 0}))
	grid.NextStatus(Cell{0, 0})
	assert.Equal(t, WEAKENED, grid.Get(Cell{0, 0}))
	grid.NextStatus(Cell{0, 0})
	assert.Equal(t, INFECTED, grid.Get(Cell{0, 0}))
	grid.NextStatus(Cell{0, 0})
	assert.Equal(t, FLAGGED, grid.Get(Cell{0, 0}))
	grid.NextStatus(Cell{0, 0})
	assert.Equal(t, CLEAN, grid.Get(Cell{0, 0}))
}

func TestFirstBurst(t *testing.T) {
	grid := NewGrid(strings.NewReader(input))
	virus := NewVirusCarrier(grid)
	assert.Equal(t, Cell{0, 0}, virus.Position())
	assert.Equal(t, 1, virus.Bursts(1))
	assert.Equal(t, Cell{-1, 0}, virus.Position())
	assert.Equal(t, INFECTED, grid.Get(Cell{-1, 0}))
	assert.Equal(t, INFECTED, grid.Get(Cell{0, 0}))
}

func TestTurnLeft(t *testing.T) {
	assert.Equal(t, LEFT, UP.TurnLeft())
	assert.Equal(t, DOWN, LEFT.TurnLeft())
	assert.Equal(t, RIGHT, DOWN.TurnLeft())
	assert.Equal(t, UP, RIGHT.TurnLeft())
}
func TestTurnRight(t *testing.T) {
	assert.Equal(t, RIGHT, UP.TurnRight())
	assert.Equal(t, DOWN, RIGHT.TurnRight())
	assert.Equal(t, LEFT, DOWN.TurnRight())
	assert.Equal(t, UP, LEFT.TurnRight())
}
func TestReverse(t *testing.T) {
	assert.Equal(t, DOWN, UP.Reverse())
	assert.Equal(t, LEFT, RIGHT.Reverse())
	assert.Equal(t, UP, DOWN.Reverse())
	assert.Equal(t, RIGHT, LEFT.Reverse())
}
func TestMove(t *testing.T) {
	assert.Equal(t, Cell{0, 1}, UP.Move(Cell{0, 0}))
	assert.Equal(t, Cell{1, 0}, RIGHT.Move(Cell{0, 0}))
	assert.Equal(t, Cell{0, -1}, DOWN.Move(Cell{0, 0}))
	assert.Equal(t, Cell{-1, 0}, LEFT.Move(Cell{0, 0}))
}

func TestSevenBursts(t *testing.T) {
	grid := NewGrid(strings.NewReader(input))
	virus := NewVirusCarrier(grid)
	assert.Equal(t, 5, virus.Bursts(7))
	assert.Equal(t, Cell{0, 1}, virus.Position())
}
func TestAllBursts(t *testing.T) {
	grid := NewGrid(strings.NewReader(input))
	virus := NewVirusCarrier(grid)
	assert.Equal(t, 5587, virus.Bursts(10000))
}
func TestVirusEvolved100(t *testing.T) {
	grid := NewGrid(strings.NewReader(input))
	virus := NewVirusEvolved(grid)
	assert.Equal(t, 26, virus.Bursts(100))
}
func TestVirusEvolved10000000(t *testing.T) {
	grid := NewGrid(strings.NewReader(input))
	virus := NewVirusEvolved(grid)
	assert.Equal(t, 2511944, virus.Bursts(10000000))
}
