package main

import (
	"bufio"
	"fmt"
	"io"
	"os"
	"regexp"
	"strings"
)

func main() {
	f, _ := os.Open("input.txt")
	maze := ParseMaze(f)
	fmt.Printf("Word: %s\n", maze.Follow())
}

type Direction int

const (
	UP Direction = iota
	RIGHT
	DOWN
	LEFT
)

type Cell struct {
	X, Y int
}

type Maze struct {
	start     Cell
	position  Cell
	direction Direction
	grid      [][]string
}

func ParseMaze(r io.Reader) *Maze {
	maze := new(Maze)
	grid := [][]string{}
	maze.start = Cell{-1, -1}
	maze.direction = DOWN
	reader := bufio.NewReader(r)
	for line, _, _ := reader.ReadLine(); line != nil; line, _, _ = reader.ReadLine() {
		chars := strings.Split(string(line), "")
		if maze.start.X == -1 {
			maze.start = Cell{findStart(chars), 0}
		}
		grid = append(grid, chars)
	}
	maze.grid = grid
	// fmt.Printf("Maze: %#v\n", maze)
	return maze
}

func findStart(chars []string) int {
	for i, c := range chars {
		if c == "|" {
			return i
		}
	}
	return -1
}

func (m *Maze) Follow() string {
	max := 5000000000
	i := 0
	m.position = m.start
	result := ""
	for m.next() && i < max {
		s, _ := m.getCell(m.position)
		// fmt.Printf("Maze: %#v\n", m)
		if s != "|" && s != "-" && s != "+" && s != " " {
			result = result + s
			// fmt.Printf("Word: %s\n", result)
		}
		// i++
	}
	return result
}
func match(pattern string, s string) bool {
	match, err := regexp.MatchString(pattern, s)
	if err != nil {
		return false
	}
	return match
}
func (m Maze) getCell(c Cell) (string, bool) {
	if c.Y < 0 || c.Y >= len(m.grid) || c.X < 0 || c.X >= len(m.grid[c.Y]) {
		return "", false
	}
	return m.grid[c.Y][c.X], true
}
func (m Maze) findNewDirection() Direction {
	// a, b := m.getCell(Cell{m.position.X + 1, m.position.Y})
	// fmt.Printf("%#v -- %v -- %v / <%v> - <%v>\n", Cell{m.position.X + 1, m.position.Y}, len(m.grid), len(m.grid[0]), a, b)

	if cell, inGrid := m.getCell(Cell{m.position.X, m.position.Y - 1}); inGrid && m.direction != DOWN && match("[A-Z|]", cell) {
		// fmt.Printf("New direction: UP (%b)\n", m.direction == DOWN)
		return UP
	} else if cell, inGrid := m.getCell(Cell{m.position.X, m.position.Y + 1}); inGrid && m.direction != UP && match("[A-Z|]", cell) {
		// fmt.Printf("New direction: DOWN\n")
		return DOWN
	} else if cell, inGrid := m.getCell(Cell{m.position.X + 1, m.position.Y}); inGrid && m.direction != LEFT && match("[A-Z\\-]", cell) {
		// fmt.Printf("New direction: RIGHT\n")
		return RIGHT
	} else if cell, inGrid := m.getCell(Cell{m.position.X - 1, m.position.Y}); inGrid && m.direction != RIGHT && match("[A-Z\\-]", cell) {
		// fmt.Printf("New direction: LEFT\n")
		return LEFT
	}
	return -1
}
func (m *Maze) next() bool {
	current, inGrid := m.getCell(m.position)
	// fmt.Printf("next? %#v\n", m)
	if !inGrid || current == " " {
		return false
	}
	// current, _ := m.getCell(m.position)
	if current == "+" {
		newDir := m.findNewDirection()
		m.direction = newDir
	}
	switch m.direction {
	case UP:
		m.position.Y--
	case DOWN:
		m.position.Y++
	case RIGHT:
		m.position.X++
	case LEFT:
		m.position.X--
	}

	return true
}
