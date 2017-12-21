package main

import (
	"strings"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestFlip2(t *testing.T) {
	assert.Equal(t, [][]string{{"c", "a"}, {"d", "b"}}, Flip([][]string{{"a", "b"}, {"c", "d"}}))
	assert.Equal(t, [][]string{{"d", "c"}, {"b", "a"}}, Flip([][]string{{"c", "a"}, {"d", "b"}}))
	assert.Equal(t, [][]string{{"b", "d"}, {"a", "c"}}, Flip([][]string{{"d", "c"}, {"b", "a"}}))
	assert.Equal(t, [][]string{{"a", "b"}, {"c", "d"}}, Flip([][]string{{"b", "d"}, {"a", "c"}}))
}
func TestRotate2(t *testing.T) {
	assert.Equal(t, [][]string{{"b", "a"}, {"d", "c"}}, Rotate([][]string{{"a", "b"}, {"c", "d"}}))
	assert.Equal(t, [][]string{{"a", "c"}, {"b", "d"}}, Rotate([][]string{{"c", "a"}, {"d", "b"}}))
	assert.Equal(t, [][]string{{"c", "d"}, {"a", "b"}}, Rotate([][]string{{"d", "c"}, {"b", "a"}}))
	assert.Equal(t, [][]string{{"d", "b"}, {"c", "a"}}, Rotate([][]string{{"b", "d"}, {"a", "c"}}))
}
func TestFlip3(t *testing.T) {
	assert.Equal(t, [][]string{{"g", "d", "a"}, {"h", "e", "b"}, {"i", "f", "c"}}, Flip([][]string{{"a", "b", "c"}, {"d", "e", "f"}, {"g", "h", "i"}}))
	assert.Equal(t, [][]string{{"i", "h", "g"}, {"f", "e", "d"}, {"c", "b", "a"}}, Flip([][]string{{"g", "d", "a"}, {"h", "e", "b"}, {"i", "f", "c"}}))
	assert.Equal(t, [][]string{{"c", "f", "i"}, {"b", "e", "h"}, {"a", "d", "g"}}, Flip([][]string{{"i", "h", "g"}, {"f", "e", "d"}, {"c", "b", "a"}}))
	assert.Equal(t, [][]string{{"a", "b", "c"}, {"d", "e", "f"}, {"g", "h", "i"}}, Flip([][]string{{"c", "f", "i"}, {"b", "e", "h"}, {"a", "d", "g"}}))
}
func TestRotate3(t *testing.T) {
	assert.Equal(t, [][]string{{"c", "b", "a"}, {"f", "e", "d"}, {"i", "h", "g"}}, Rotate([][]string{{"a", "b", "c"}, {"d", "e", "f"}, {"g", "h", "i"}}))
	assert.Equal(t, [][]string{{"a", "d", "g"}, {"b", "e", "h"}, {"c", "f", "i"}}, Rotate([][]string{{"g", "d", "a"}, {"h", "e", "b"}, {"i", "f", "c"}}))
	assert.Equal(t, [][]string{{"g", "h", "i"}, {"d", "e", "f"}, {"a", "b", "c"}}, Rotate([][]string{{"i", "h", "g"}, {"f", "e", "d"}, {"c", "b", "a"}}))
	assert.Equal(t, [][]string{{"i", "f", "c"}, {"h", "e", "b"}, {"g", "d", "a"}}, Rotate([][]string{{"c", "f", "i"}, {"b", "e", "h"}, {"a", "d", "g"}}))
}

func TestJoin(t *testing.T) {
	assert.Equal(t, "ifc/heb/gda", Join([][]string{{"i", "f", "c"}, {"h", "e", "b"}, {"g", "d", "a"}}))
}
func TestSplit(t *testing.T) {
	assert.Equal(t, [][]string{{"i", "f", "c"}, {"h", "e", "b"}, {"g", "d", "a"}}, Split("ifc/heb/gda"))
}

func TestGetRule(t *testing.T) {
	rules := NewRules(strings.NewReader(`ab/cd => efg/hij/klm
`))
	assert.Equal(t, [][]string{{"e", "f", "g"}, {"h", "i", "j"}, {"k", "l", "m"}}, rules.Get([][]string{{"a", "b"}, {"c", "d"}}))
	assert.Equal(t, [][]string{{"e", "f", "g"}, {"h", "i", "j"}, {"k", "l", "m"}}, rules.Get([][]string{{"c", "a"}, {"d", "b"}}))
	assert.Equal(t, [][]string{{"e", "f", "g"}, {"h", "i", "j"}, {"k", "l", "m"}}, rules.Get([][]string{{"d", "c"}, {"b", "a"}}))
	assert.Equal(t, [][]string{{"e", "f", "g"}, {"h", "i", "j"}, {"k", "l", "m"}}, rules.Get([][]string{{"b", "d"}, {"a", "c"}}))
	assert.Equal(t, [][]string{{"e", "f", "g"}, {"h", "i", "j"}, {"k", "l", "m"}}, rules.Get([][]string{{"b", "a"}, {"d", "c"}}))
	assert.Equal(t, [][]string{{"e", "f", "g"}, {"h", "i", "j"}, {"k", "l", "m"}}, rules.Get([][]string{{"a", "c"}, {"b", "d"}}))
	assert.Equal(t, [][]string{{"e", "f", "g"}, {"h", "i", "j"}, {"k", "l", "m"}}, rules.Get([][]string{{"c", "d"}, {"a", "b"}}))
	assert.Equal(t, [][]string{{"e", "f", "g"}, {"h", "i", "j"}, {"k", "l", "m"}}, rules.Get([][]string{{"d", "b"}, {"c", "a"}}))
}

func TestIterate1(t *testing.T) {
	rules := NewRules(strings.NewReader(`../.# => ##./#../...
.#./..#/### => #..#/..../..../#..#
`))
	program := NewProgram(rules)
	assert.Equal(t, [][]string{{".", "#", "."}, {".", ".", "#"}, {"#", "#", "#"}}, program.State)
	program.Iterate(1)
	assert.Equal(t, [][]string{{"#", ".", ".", "#"}, {".", ".", ".", "."}, {".", ".", ".", "."}, {"#", ".", ".", "#"}}, program.State)
}

func TestSquare(t *testing.T) {
	assert.Equal(t, [][][][]string{
		{
			{{"a", "b"}, {"e", "f"}},
			{{"c", "d"}, {"g", "h"}},
		},
		{
			{{"i", "j"}, {"m", "n"}},
			{{"k", "l"}, {"o", "p"}},
		},
	},
		Square([][]string{{"a", "b", "c", "d"}, {"e", "f", "g", "h"}, {"i", "j", "k", "l"}, {"m", "n", "o", "p"}}, 2))
}
func TestSquare2(t *testing.T) {
	assert.Equal(t, [][][][]string{
		{
			{
				{".", "#", "."},
				{".", ".", "#"},
				{"#", "#", "#"},
			},
		},
	},
		Square([][]string{
			{".", "#", "."},
			{".", ".", "#"},
			{"#", "#", "#"},
		}, 3))
}
func TestUnsquare(t *testing.T) {
	assert.Equal(t, [][]string{{"a", "b", "c", "d"}, {"e", "f", "g", "h"}, {"i", "j", "k", "l"}, {"m", "n", "o", "p"}},
		Unsquare([][][][]string{
			{
				{{"a", "b"}, {"e", "f"}},
				{{"c", "d"}, {"g", "h"}},
			},
			{
				{{"i", "j"}, {"m", "n"}},
				{{"k", "l"}, {"o", "p"}},
			},
		}, 2))
}

func TestIterate2(t *testing.T) {
	rules := NewRules(strings.NewReader(`../.# => ##./#../...
.#./..#/### => #..#/..../..../#..#
`))
	program := NewProgram(rules)
	program.Iterate(2)
	assert.Equal(t, [][]string{
		{"#", "#", ".", "#", "#", "."},
		{"#", ".", ".", "#", ".", "."},
		{".", ".", ".", ".", ".", "."},
		{"#", "#", ".", "#", "#", "."},
		{"#", ".", ".", "#", ".", "."},
		{".", ".", ".", ".", ".", "."},
	}, program.State)
}

func TestCount2(t *testing.T) {
	rules := NewRules(strings.NewReader(`../.# => ##./#../...
.#./..#/### => #..#/..../..../#..#
`))
	program := NewProgram(rules)
	program.Iterate(2)
	assert.Equal(t, 12, program.Count())
}
