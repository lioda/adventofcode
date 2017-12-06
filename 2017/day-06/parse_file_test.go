package main

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestParseInputFile(t *testing.T) {
	assert.Equal(t, []int{2, 8, 8, 5, 4, 2, 3, 1, 5, 5, 1, 2, 15, 13, 5, 14}, ParseFile("input.txt"))
}
