package main

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestReallocateAndFindSeenPattern(t *testing.T) {
	assert.Equal(t, 5, Reallocate([]int{0, 2, 7, 0}))
}
