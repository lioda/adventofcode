package main

import (
	"bufio"
	"fmt"
	"io"
	"os"
)

func main() {
	f, _ := os.Open("input.txt")
	grid := NewGrid(f)
	virus := NewVirusCarrier(grid)
	fmt.Printf("After 10000, %d bursts have caused an infection.\n", virus.Bursts(10000))
}

type Cell struct {
	X, Y int
}

type Status uint8

const (
	CLEAN Status = iota
	INFECTED
)

type Direction uint8

const (
	UP Direction = iota
	RIGHT
	DOWN
	LEFT
)

func (d Direction) TurnLeft() Direction {
	if d == UP {
		return LEFT
	}
	return d - 1
}
func (d Direction) TurnRight() Direction {
	if d == LEFT {
		return UP
	}
	return d + 1
}

func (d Direction) Move(c Cell) Cell {
	switch d {
	case UP:
		return Cell{c.X, c.Y + 1}
	case DOWN:
		return Cell{c.X, c.Y - 1}
	case RIGHT:
		return Cell{c.X + 1, c.Y}
	case LEFT:
		return Cell{c.X - 1, c.Y}
	}
	return c
}

func NewVirusCarrier(grid *Grid) *VirusCarrier {
	return &VirusCarrier{Cell{0, 0}, UP, grid}
}

type VirusCarrier struct {
	position  Cell
	direction Direction
	grid      *Grid
}

func (v *VirusCarrier) Bursts(count int) int {
	result := 0
	for i := 0; i < count; i++ {
		if status := v.grid.Get(v.position); status == INFECTED {
			v.direction = v.direction.TurnRight()
			v.grid.Clean(v.position)
		} else {
			v.direction = v.direction.TurnLeft()
			v.grid.Infect(v.position)
			result++
		}
		v.position = v.direction.Move(v.position)
	}
	return result
}
func (v *VirusCarrier) Position() Cell {
	return v.position
}

type Grid struct {
	grid map[Cell]Status
}

func (g *Grid) Get(c Cell) Status {
	status, ok := g.grid[c]
	if !ok {
		return CLEAN
	}
	return status
}
func (g *Grid) Infect(c Cell) {
	g.grid[c] = INFECTED
}
func (g *Grid) Clean(c Cell) {
	g.grid[c] = CLEAN
}
func NewGrid(r io.Reader) *Grid {
	buf := bufio.NewReader(r)
	lines := [][]byte{}
	for line, _, _ := buf.ReadLine(); line != nil; line, _, _ = buf.ReadLine() {
		lines = append(lines, line)
	}
	originY := len(lines) / 2
	grid := map[Cell]Status{}
	for y, line := range lines {
		originX := 0 - (len(line) / 2)
		for i, b := range line {
			if string(b) == "#" {
				// fmt.Printf("Infected : %#v\n", Cell{originX + i, originY + y})
				grid[Cell{originX + i, originY - y}] = INFECTED
			}
		}
	}
	return &Grid{grid}
}
