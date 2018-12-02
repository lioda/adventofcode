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

func TestWhenSearchRepeatedFrequencyThenDoTheLoop(t *testing.T) {
	changes := []int{1, -2, 3, 1}
	assert.Equal(t, findRepeatedFrequency(0, changes), 2)
}

func TestWhenSearchRepeatedFrequencyThenFindIt(t *testing.T) {
	assert.Equal(t, findRepeatedFrequency(0, []int{1, -1}), 0)
	assert.Equal(t, findRepeatedFrequency(0, []int{3, 3, 4, -2, -4}), 10)
	assert.Equal(t, findRepeatedFrequency(0, []int{-6, 3, 8, 5, -6}), 5)
	assert.Equal(t, findRepeatedFrequency(0, []int{7, 7, -2, -7, -4}), 14)
}
