package main

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestFirstPair(t *testing.T) {
	generatorA := NewGeneratorA(65)
	assert.Equal(t, "00000000000100001010101101100111", generatorA.Next())
	generatorB := NewGeneratorB(8921)
	assert.Equal(t, "00011001101010101101001100110111", generatorB.Next())
}
func TestSecondPair(t *testing.T) {
	generatorA := NewGeneratorA(65)
	assert.Equal(t, "00000000000100001010101101100111", generatorA.Next())
	assert.Equal(t, "01000110011001001111011100111001", generatorA.Next())
	generatorB := NewGeneratorB(8921)
	assert.Equal(t, "00011001101010101101001100110111", generatorB.Next())
	assert.Equal(t, "01001001100010001000010110001000", generatorB.Next())
}

// func TestJudgeCounting(t *testing.T) {
// 	generatorA := NewGeneratorA(65)
// 	generatorB := NewGeneratorB(8921)
// 	assert.Equal(t, 588, Judge{generatorA, generatorB}.Count())
// }
func TestChan(t *testing.T) {
	generatorA := NewGeneratorA(65)
	generatorB := NewGeneratorB(8921)
	c1 := make(chan string)
	c2 := make(chan string)
	go generatorA.Chan(1, c1)
	go generatorB.Chan(1, c2)
	assert.Equal(t, "01010000100111111001100000100100", <-c1)
	assert.Equal(t, "01001001100010001000010110001000", <-c2)
	close(c1)
	close(c2)
}

func TestJudge2Counting(t *testing.T) {
	generatorA := NewGeneratorA(65)
	generatorB := NewGeneratorB(8921)
	assert.Equal(t, 309, Judge2{generatorA, generatorB}.Count())
}
