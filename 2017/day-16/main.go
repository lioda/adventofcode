package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

type MoveObserver interface {
	DoMove(move string)
	Order() string
}

type Dancers struct {
	programs []string
}

func (d *Dancers) DoMove(move string) {
	switch string(move[0]) {
	case "s":
		count, _ := strconv.Atoi(string(move[1:]))
		front := d.programs[len(d.programs)-count : len(d.programs)]
		back := d.programs[0 : len(d.programs)-count]
		d.programs = append(front, back...)
	case "x":
		ab := strings.Split(move[1:], "/")
		a, _ := strconv.Atoi(string(ab[0]))
		b, _ := strconv.Atoi(string(ab[1]))
		temp := d.programs[b]
		d.programs[b] = d.programs[a]
		d.programs[a] = temp
	case "p":
		a := string(move[1])
		b := string(move[3])
		for i, p := range d.programs {
			if p == a {
				d.programs[i] = b
			} else if p == b {
				d.programs[i] = a
			}
		}
	}
}
func (d Dancers) Order() string {
	return strings.Join(d.programs, "")
}

func NewDancers(count int) *Dancers {
	p := make([]string, count)
	for i := 0; i < count; i++ {
		p[i] = string([]byte("a")[0] + byte(i))
	}
	return &Dancers{p}
}

type Parser struct {
	r   io.Reader
	obs MoveObserver
}

func NewParser(r io.Reader, callback MoveObserver) Parser {
	return Parser{r, callback}
}
func (p Parser) Parse() {
	buf := make([]byte, 1)
	order := ""
	for sz, _ := p.r.Read(buf); sz > 0; sz, _ = p.r.Read(buf) {
		if string(buf) == "," || string(buf) == "\n" {
			p.obs.DoMove(order)
			order = ""
		} else {
			order = order + string(buf)
		}
	}
}
func (p Parser) Parsex(count int) {
	origin := p.obs.Order()
	orders := []string{}
	buf := make([]byte, 1)
	order := ""
	for sz, _ := p.r.Read(buf); sz > 0; sz, _ = p.r.Read(buf) {
		if string(buf) == "," || string(buf) == "\n" {
			p.obs.DoMove(order)
			orders = append(orders, order)
			order = ""
		} else {
			order = order + string(buf)
		}
	}
	for i := 1; i < count; i++ {
		// if i%1000 == 0 {
		fmt.Printf("Dance #%d (-%d)\n", i, count-i)
		// }
		for _, order := range orders {
			p.obs.DoMove(order)
		}
		if p.obs.Order() == origin {
			cycle := i + 1
			rest := count % cycle
			fmt.Printf("Back to origin %s in %d, rest %d\n", p.obs.Order(), cycle, rest)
			i = count - rest - 1
		}
	}
}

func main() {
	f, _ := os.Open("input.txt")
	dancers := NewDancers(16)
	parser := NewParser(f, dancers)
	// parser.Parse()
	// fmt.Printf("Order of dancers is: %s\n", dancers.Order())
	parser.Parsex(1000000000)
	fmt.Printf("Order of dancers is: %s\n", dancers.Order())
}
