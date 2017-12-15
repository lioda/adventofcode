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
func TestJudgeCounting(t *testing.T) {
	generatorA := NewGeneratorA(65)
	generatorB := NewGeneratorB(8921)
	assert.Equal(t, 588, Judge{generatorA, generatorB}.Count())
}
