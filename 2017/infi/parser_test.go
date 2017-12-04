package main

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestParseRobots(t *testing.T) {
	input := "[0,0][1,1]"
	parser := Parser{Input: input}
	assert.Equal(t, "[0,0]", parser.Next())
	assert.Equal(t, "[1,1]", parser.Next())
}
func TestParseRobotsAndCoordinates(t *testing.T) {
	input := "[0,0][1,1](1,0)(0,-1)"
	parser := Parser{Input: input}
	assert.Equal(t, "[0,0]", parser.Next())
	assert.Equal(t, "[1,1]", parser.Next())
	assert.Equal(t, "(1,0)", parser.Next())
	assert.Equal(t, "(0,-1)", parser.Next())
	assert.Equal(t, "EOF", parser.Next())
}
