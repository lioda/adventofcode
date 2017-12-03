package main

import (
	"errors"
	"fmt"
	"math"
)

type Cell struct {
	X, Y int
}

type Direction int

const (
	RIGHT  Direction = 0
	UP     Direction = 1
	LEFT   Direction = 2
	DOWN   Direction = 3
	RIGHT2 Direction = 4
)

func (d Direction) Next() Direction {
	if d == RIGHT2 {
		return RIGHT
	}
	return d + 1
}
func (d Direction) Step(c Cell) (Cell, error) {
	switch d {
	case RIGHT:
		return Cell{c.X + 1, c.Y}, nil
	case RIGHT2:
		return Cell{c.X + 1, c.Y}, nil
	case UP:
		return Cell{c.X, c.Y + 1}, nil
	case LEFT:
		return Cell{c.X - 1, c.Y}, nil
	case DOWN:
		return Cell{c.X, c.Y - 1}, nil
	}
	return c, errors.New("invalid")
}

func (d Direction) MoveCoordinate(c Cell) int {
	switch d {
	case RIGHT:
		return c.X
	case RIGHT2:
		return c.X
	case UP:
		return c.Y
	case LEFT:
		return c.X
	case DOWN:
		return c.Y
	}
	return c.X
}

func abs(a int) int {
	return int(math.Abs(float64(a)))
}

func Distance(value int) int {
	direction := RIGHT2
	cell := Cell{0, 0}
	width := 0
	// fmt.Printf("Start:\n{%d, %d}\n", cell.X, cell.Y)
	for i := 1; i < value; i++ {
		// fmt.Printf("will move %d\n", direction.MoveCoordinate(cell))
		if abs(direction.MoveCoordinate(cell)) == abs(width) {
			if direction == RIGHT2 {
				width++
			}
			direction = direction.Next()
		}
		cell, _ = direction.Step(cell)
		// fmt.Printf("%d = {%d, %d}\n", i+1, cell.X, cell.Y)
	}
	// fmt.Printf("%s\n", cell)
	return abs(cell.X) + abs(cell.Y)
}

func main() {
	input := 312051
	fmt.Printf("%d => %d\n", input, Distance(input))
}
