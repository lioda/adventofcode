package main

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestRemovesAndRedistribute(t *testing.T) {
	assert.Equal(t, []int{2, 4, 1, 2}, Cycle([]int{0, 2, 7, 0}))
}
func TestRemovesAndRedistributeLastBank(t *testing.T) {
	assert.Equal(t, []int{1, 3, 2, 0}, Cycle([]int{0, 2, 1, 3}))
}
