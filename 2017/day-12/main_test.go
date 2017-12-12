package main

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestWithOneLine(t *testing.T) {
	pipes := NewPipes()
	pipes.Parse("0 <-> 2")
	assert.Equal(t, 2, pipes.CountGroup("0"))
	assert.Equal(t, 1, pipes.CountGroups())
}
func TestWithIndirectConnection(t *testing.T) {
	pipes := NewPipes()
	pipes.Parse("0 <-> 2")
	pipes.Parse("2 <-> 0, 3, 4")
	pipes.Parse("3 <-> 2")
	pipes.Parse("4 <-> 2")
	assert.Equal(t, 4, pipes.CountGroup("0"))
	assert.Equal(t, 1, pipes.CountGroups())
}
func TestWithItemsOutOfGroup(t *testing.T) {
	pipes := NewPipes()
	pipes.Parse("0 <-> 2")
	pipes.Parse("1 <-> 7")
	pipes.Parse("2 <-> 0, 3, 4")
	pipes.Parse("3 <-> 2")
	pipes.Parse("4 <-> 2")
	pipes.Parse("7 <-> 1")
	assert.Equal(t, 4, pipes.CountGroup("0"))
	assert.Equal(t, 2, pipes.CountGroups())
}
func TestWithFullSet(t *testing.T) {
	pipes := NewPipes()
	pipes.Parse("0 <-> 2")
	pipes.Parse("1 <-> 1")
	pipes.Parse("2 <-> 0, 3, 4")
	pipes.Parse("3 <-> 2, 4")
	pipes.Parse("4 <-> 2, 3, 6")
	pipes.Parse("5 <-> 6")
	pipes.Parse("6 <-> 4, 5")
	assert.Equal(t, 6, pipes.CountGroup("0"))
	assert.Equal(t, 2, pipes.CountGroups())
}
