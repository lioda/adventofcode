package main

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestParseLengths(t *testing.T) {
	assert.Equal(t, []int{206, 63, 255, 131, 65, 80, 238, 157, 254, 24, 133, 2, 16, 0, 1, 3}, parseLengths("206,63,255,131,65,80,238,157,254,24,133,2,16,0,1,3"))
}
func TestParseLengths2(t *testing.T) {
	assert.Equal(t, []int{49, 44, 50, 44, 51, 17, 31, 73, 47, 23}, parseLengths2("1,2,3"))
}
func TestInts(t *testing.T) {
	assert.Equal(t, []int{0, 1, 2, 3, 4, 5, 6, 7, 8, 9}, ints(10))
}

func TestHashMultGivenSample(t *testing.T) {
	assert.Equal(t, 12, hashMult([]int{0, 1, 2, 3, 4}, []int{3, 4, 1, 5}))
}

func TestKnotHashGivenEmptyString(t *testing.T) {
	assert.Equal(t, "a2582a3a0e66e6e86e3812dcb672a272", knotHash(ints(256), parseLengths2("")))
}

func TestXor16(t *testing.T) {
	assert.Equal(t, []int{64, 64, 64, 64}, xor16([]int{65, 27, 9, 1, 4, 3, 40, 50, 91, 7, 6, 0, 2, 5, 68, 22,
		65, 27, 9, 1, 4, 3, 40, 50, 91, 7, 6, 0, 2, 5, 68, 22,
		65, 27, 9, 1, 4, 3, 40, 50, 91, 7, 6, 0, 2, 5, 68, 22,
		65, 27, 9, 1, 4, 3, 40, 50, 91, 7, 6, 0, 2, 5, 68, 22}))
}
func TestHex(t *testing.T) {
	assert.Equal(t, "01", hex([]int{1}))
}

func TestKnotHashGivenAoC2017(t *testing.T) {
	assert.Equal(t, "33efeb34ea91902bb2f59c9920caa6cd", knotHash(ints(256), parseLengths2("AoC 2017")))
}
func TestKnotHashGivenNumbersSeparatedComa(t *testing.T) {
	assert.Equal(t, "3efbe78a8d82f29979031a4aa0b16a9d", knotHash(ints(256), parseLengths2("1,2,3")))
	assert.Equal(t, "63960835bcdc130f0b66d7ff4f6a5a8e", knotHash(ints(256), parseLengths2("1,2,4")))
}
