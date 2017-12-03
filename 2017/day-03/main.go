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
	for i := 1; i < value; i++ {
		if abs(direction.MoveCoordinate(cell)) == abs(width) {
			if direction == RIGHT2 {
				width++
			}
			direction = direction.Next()
		}
		cell, _ = direction.Step(cell)
	}
	return abs(cell.X) + abs(cell.Y)
}

type Data struct {
	M map[Cell]int
}

func (d *Data) Value(c Cell) int {
	value := d.M[Cell{c.X + 1, c.Y}] +
		d.M[Cell{c.X + 1, c.Y + 1}] + d.M[Cell{c.X, c.Y + 1}] + d.M[Cell{c.X - 1, c.Y + 1}] +
		d.M[Cell{c.X - 1, c.Y}] +
		d.M[Cell{c.X - 1, c.Y - 1}] + d.M[Cell{c.X, c.Y - 1}] + d.M[Cell{c.X + 1, c.Y - 1}]
	return value
}
func NewData() Data {
	data := Data{map[Cell]int{}}
	return data
}

func PartTwo(search int) (int, Cell) {
	data := NewData()
	direction := RIGHT2
	cell := Cell{0, 0}
	width := 0
	last := 1
	data.M[cell] = 1
	for last < search {
		if abs(direction.MoveCoordinate(cell)) == abs(width) {
			if direction == RIGHT2 {
				width++
			}
			direction = direction.Next()
		}
		cell, _ = direction.Step(cell)
		value := data.Value(cell)
		data.M[cell] = value
		last = value
	}
	return last, cell
}

func main() {
	input := 312051
	fmt.Printf("%d => %d\n", input, Distance(input))
	value, cell := PartTwo(input)
	fmt.Printf("%d => %d\n", input, value, cell)
}
