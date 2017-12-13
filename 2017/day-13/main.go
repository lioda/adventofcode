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
	for depth, _ := range l.m {
		l.m[depth].Next()
	}
	return
}

type PacketState struct {
	Caught bool
	Moved  bool
}

func (l *Layers) Picoseconds(packets []*Packet) (packetStates []PacketState) {
	packetStates = make([]PacketState, len(packets))
	for i, p := range packets {
		packetStates[i].Moved = p.Move(l.max)
		if layer := l.m[p.Layer]; layer != nil && layer.Current == 0 {
			packetStates[i].Caught = true
		}
	}
	for depth, _ := range l.m {
		l.m[depth].Next()
	}
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
	l.reset()
	packets := []*Packet{}
	result := 0
	for caught := true; caught; result++ {
		if result%25 == 0 {
			fmt.Printf("Try: %d\n", result)
		}
		packets = append(packets, NewPacket(result))
		states := l.Picoseconds(packets)
		nextPackets := []*Packet{}
		for i, state := range states {
			if !state.Moved {
				return packets[i].Rank
			} else if !state.Caught && state.Moved {
				nextPackets = append(nextPackets, packets[i])
			}
		}
		packets = nextPackets
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
	Rank  int
}

func NewPacket(rank int) *Packet {
	return &Packet{-1, rank}
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
	layers := NewLayers(f)
	packet := NewPacket(0)
	totalSeverity := 0
	for severity, moved, _ := layers.Picosecond(packet); moved; severity, moved, _ = layers.Picosecond(packet) {
		totalSeverity = totalSeverity + severity
	}
	fmt.Printf("Total severity: %d\n", totalSeverity)
	layers.reset()

	fmt.Printf("Wait: %d\n", layers.Wait())
}
