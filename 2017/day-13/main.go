package main

import (
	"bufio"
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

type direction int

const (
	UP direction = iota
	DOWN
)

type Layer struct {
	Depth     int
	Range     int
	Current   int
	Direction direction
}

func (l *Layer) Reset() {
	l.Current = 0
	l.Direction = DOWN
}
func (l *Layer) Next() {
	switch l.Direction {
	case DOWN:
		l.Current++
		if l.Current == l.Range-1 {
			l.Direction = UP
		}
	case UP:
		l.Current--
		if l.Current == 0 {
			l.Direction = DOWN
		}
	}
}

type Layers struct {
	m   map[int]*Layer
	max int
}

func NewLayers(in io.Reader) *Layers {
	reader := bufio.NewReader(in)
	layers := make(map[int]*Layer)
	max := 0
	for line, _, err := reader.ReadLine(); err == nil; line, _, err = reader.ReadLine() {
		depthAndRange := strings.Split(string(line), ": ")
		depth, _ := strconv.Atoi(depthAndRange[0])
		rang, _ := strconv.Atoi(depthAndRange[1])
		layers[depth] = &Layer{depth, rang, 0, DOWN}
		if depth > max {
			max = depth
		}
	}
	return &Layers{m: layers, max: max}
}
func (l *Layers) Picosecond(p *Packet) (severity int, moved bool, caught bool) {
	moved = p.Move(l.max)
	if !moved {
		return
	}
	if layer := l.m[p.Layer]; layer != nil && layer.Current == 0 {
		severity = layer.Depth * layer.Range
		caught = true
	}
	// fmt.Printf("Packet: %v\n", p)
	for depth, _ := range l.m {
		l.m[depth].Next()
		// fmt.Printf("Layer: %#v\n", l.m[depth])
	}
	//fmt.Println("Packet: %v\nLayers: %v\n", p, l.ToString())
	return
}
func (l Layers) ToMap() map[int]int {
	result := make(map[int]int)
	for depth, layer := range l.m {
		result[depth] = layer.Range
	}
	return result
}
func (l *Layers) Wait() int {
	result := 0
	for caught := true; caught; result++ {
		if result%25 == 0 {
			fmt.Printf("Try: %d\n", result)
		}
		p := NewPacket()
		// var sev int
		for i := 0; i < result; i++ {
			l.Picosecond(NewPacket())
		}
		var moved bool
		picos := 0
		for _, moved, caught = l.Picosecond(p); !caught && moved; _, moved, caught = l.Picosecond(p) {
			// fmt.Printf("Picosecond: %d\n", picos)
			picos++
		}
		// fmt.Printf("caught: %t (%d)\n", caught, picos)
		// if sev == 0 && !moved {
		// 	caught = false
		// }
		l.reset()
		if !caught && !moved {
			return result
		}
	}
	return result
}

func (l *Layers) reset() {
	for depth, _ := range l.m {
		l.m[depth].Reset()
	}
}

type Packet struct {
	Layer int
}

func NewPacket() *Packet {
	return &Packet{-1}
}
func (p *Packet) Move(max int) bool {
	if p.Layer == max {
		return false
	}
	p.Layer++
	return true
}

func main() {
	f, _ := os.Open("input.txt")
	// reader := bufio.NewReader(f)
	layers := NewLayers(f)
	packet := NewPacket()
	totalSeverity := 0
	for severity, moved, _ := layers.Picosecond(packet); moved; severity, moved, _ = layers.Picosecond(packet) {
		totalSeverity = totalSeverity + severity
	}
	fmt.Printf("Total severity: %d\n", totalSeverity)
	layers.reset()

	fmt.Printf("Wait: %d\n", layers.Wait())
}
