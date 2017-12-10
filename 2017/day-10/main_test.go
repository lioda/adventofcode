package main

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestParseLengths(t *testing.T) {
	assert.Equal(t, []int{206, 63, 255, 131, 65, 80, 238, 157, 254, 24, 133, 2, 16, 0, 1, 3}, parseLengths("206,63,255,131,65,80,238,157,254,24,133,2,16,0,1,3"))
}
func TestInts(t *testing.T) {
	assert.Equal(t, []int{0, 1, 2, 3, 4, 5, 6, 7, 8, 9}, ints(10))
}

func TestHashMultGivenSample(t *testing.T) {
	assert.Equal(t, 12, hashMult([]int{0, 1, 2, 3, 4}, []int{3, 4, 1, 5}))
}
