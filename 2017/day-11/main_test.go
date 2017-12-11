package main

import (
	"strings"
	"testing"

	"github.com/stretchr/testify/assert"
)

type fakeMovable struct {
	moves []direction
}

func (m *fakeMovable) Move(d direction) {
	m.moves = append(m.moves, d)
}

func TestParser(t *testing.T) {
	movable := &fakeMovable{[]direction{}}
	NewParser(strings.NewReader("n,ne,se,s,sw,nw\n"), movable)
	parser := NewParser(strings.NewReader(`n,ne,se,s,sw,nw`), movable)
	parser.Parse()
	assert.Equal(t, []direction{N, NE, SE, S, SW, NW}, movable.moves)
}

func TestMoveInOneDirection(t *testing.T) {
	cell := NewCell()
	cell.Move(SE)
	cell.Move(SE)
	cell.Move(SE)
	assert.Equal(t, 3, cell.distance())
}
func TestMoveBackToOrigin(t *testing.T) {
	cell := NewCell()
	cell.Move(NE)
	cell.Move(NE)
	cell.Move(SW)
	cell.Move(SW)
	assert.Equal(t, 0, cell.distance())
}
func TestMoveTwoStepsAway(t *testing.T) {
	cell := NewCell()
	cell.Move(NE)
	cell.Move(NE)
	cell.Move(S)
	cell.Move(S)
	assert.Equal(t, 2, cell.distance())
}
func TestMoveThreeStepsAway(t *testing.T) {
	cell := NewCell()
	cell.Move(SE)
	cell.Move(SW)
	cell.Move(SE)
	cell.Move(SW)
	cell.Move(SW)
	assert.Equal(t, 3, cell.distance())
}
func TestMoveWholeCircle(t *testing.T) {
	cell := NewCell()
	cell.Move(N)
	cell.Move(SW)
	cell.Move(S)
	cell.Move(SE)
	cell.Move(NE)
	cell.Move(N)
	cell.Move(NW)
	assert.Equal(t, 1, cell.distance())
}
func TestMoveNorth(t *testing.T) {
	cell1 := NewCell()
	cell1.Move(N)
	cell2 := NewCell()
	cell2.Move(NW)
	cell2.Move(NE)
	cell3 := NewCell()
	cell3.Move(NE)
	cell3.Move(NW)
	assert.Equal(t, cell1, cell2)
	assert.Equal(t, cell1, cell3)
}
func TestMoveSouth(t *testing.T) {
	cell1 := NewCell()
	cell1.Move(S)
	cell2 := NewCell()
	cell2.Move(SW)
	cell2.Move(SE)
	cell3 := NewCell()
	cell3.Move(SE)
	cell3.Move(SW)
	assert.Equal(t, cell1, cell2)
	assert.Equal(t, cell1, cell3)
}
