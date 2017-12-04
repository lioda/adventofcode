package main

import (
	"os"
	"strings"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestParseRobots(t *testing.T) {
	input := "[0,0][1,1]"
	parser := Parser{Input: strings.NewReader(input)}
	assert.Equal(t, "[0,0]", parser.Next())
	assert.Equal(t, "[1,1]", parser.Next())
}
func TestParseRobotsAndCoordinates(t *testing.T) {
	input := "[0,0][1,1](1,0)(0,-1)"
	parser := Parser{Input: strings.NewReader(input)}
	assert.Equal(t, "[0,0]", parser.Next())
	assert.Equal(t, "[1,1]", parser.Next())
	assert.Equal(t, "(1,0)", parser.Next())
	assert.Equal(t, "(0,-1)", parser.Next())
	assert.Equal(t, "EOF", parser.Next())
}
func TestParseLargeFile(t *testing.T) {
	file, _ := os.Open("large_file.txt")
	parser := Parser{Input: file}
	count := 0
	for token := parser.Next(); token != "EOF"; token = parser.Next() {
		count++
	}
	assert.Equal(t, 690, count)
}
