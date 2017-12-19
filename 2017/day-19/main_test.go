package main

import (
	"strings"
	"testing"

	"github.com/stretchr/testify/assert"
)

const input = `     |
     |  +--+
     A  |  C
 F---|----E|--+
     |  |  |  D
     +B-+  +--+
`

func TestMatch(t *testing.T) {
	assert.True(t, match("[A-Z-]", "-"))
	assert.True(t, match("[A-Z-]", "B"))
	assert.True(t, match("[A-Z|]", "B"))
	assert.True(t, match("[A-Z|]", "|"))

	assert.False(t, match("[A-Z|]", "-"))
	assert.False(t, match("[A-Z-]", "|"))
}

func TestMaze(t *testing.T) {
	maze := ParseMaze(strings.NewReader(input))
	assert.Equal(t, "ABCDEF", maze.Follow())
}
