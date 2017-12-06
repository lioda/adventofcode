package main

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestReallocateAndFindSeenPattern(t *testing.T) {
	result, size := Reallocate([]int{0, 2, 7, 0})
	assert.Equal(t, 5, result)
	assert.Equal(t, 4, size)
}
