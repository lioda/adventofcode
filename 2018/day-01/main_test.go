package main

import (
	"strings"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestWhenTwoValueThenReturnTwoValuesInArray(t *testing.T) {
	input := strings.NewReader("-96\n+25")
	actual := readFile(input)
	assert.Equal(t, []int{-96, 25}, actual)
}

func TestWhenApplyTwoValuesThenReturnsResult(t *testing.T) {
	changes := []int{-5, 4, -9}
	assert.Equal(t, applyFrom(0, changes), -10)
}
