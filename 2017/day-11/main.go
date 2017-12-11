package main

import (
	"fmt"
	"io"
	"math"
	"os"
	"strings"
)

type direction int

const (
	N direction = iota
	NE
	SE
	S
	SW
	NW
)

var directions = map[string]direction{
	"N":  N,
	"NE": NE,
	"NW": NW,
	"S":  S,
	"SW": SW,
	"SE": SE,
}

type movable interface {
	Move(direction)
}

type Cell struct {
	x, y, z int
}

func NewCell() *Cell {
	return &Cell{0, 0, 0}
}
func (c *Cell) Move(d direction) {
	switch d {
	case N:
		c.y--
		c.z--
	case NE:
		c.x++
		c.z--
	case NW:
		c.y--
		c.x--
	case S:
		c.z++
		c.y++
	case SE:
		c.y++
		c.x++
	case SW:
		c.z++
		c.x--
	}
}
func (c Cell) distance() int {
	return int(math.Max(math.Abs(float64(c.x)), math.Max(math.Abs(float64(c.y)), math.Abs(float64(c.z)))))
}

type Parser struct {
	r io.Reader
	m movable
}

func NewParser(r io.Reader, m movable) Parser {
	return Parser{r: r, m: m}
}
func (p *Parser) Parse() {
	buf := []byte{0}
	token := ""
	for s, err := p.r.Read(buf); s > 0 && err == nil; s, err = p.r.Read(buf) {
		char := string(buf)
		// fmt.Printf("Char read: <%s>\n", char)
		if char == "," || char == "\n" {
			// fmt.Printf("token: %s (%d)\n", token, directions[token])
			p.m.Move(directions[token])
			token = ""
		} else {
			token = token + strings.ToUpper(char)
		}
	}
	if token != "" {
		p.m.Move(directions[token])
	}

}

func main() {
	f, _ := os.Open("input.txt")
	// reader := bufio.NewScanner(f)
	// reader.Split(func())
	cell := NewCell()
	parser := NewParser(f, cell)
	parser.Parse()
	fmt.Printf("Distance: %d\n", cell.distance())
}
