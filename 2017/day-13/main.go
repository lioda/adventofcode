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
func (l *Layers) Picosecond(p *Packet) (severity int, moved bool) {
	moved = p.Move(l.max)
	if !moved {
		return
	}
	if layer := l.m[p.Layer]; layer != nil && layer.Current == 0 {
		severity = layer.Depth * layer.Range
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
	for severity, moved := layers.Picosecond(packet); moved; severity, moved = layers.Picosecond(packet) {
		totalSeverity = totalSeverity + severity
	}
	fmt.Printf("Total severity: %d\n", totalSeverity)
}
