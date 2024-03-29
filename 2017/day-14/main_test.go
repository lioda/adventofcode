package main

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

const input = "flqrgnkx"

func TestFirstRow(t *testing.T) {
	row := ComputeRow(input, 0)
	assert.Equal(t, "11010100", row[0:8])
}
func TestEightRows(t *testing.T) {
	assert.Equal(t, "11010100", ComputeRow(input, 0)[0:8])
	assert.Equal(t, "01010101", ComputeRow(input, 1)[0:8])
	assert.Equal(t, "00001010", ComputeRow(input, 2)[0:8])
	assert.Equal(t, "10101101", ComputeRow(input, 3)[0:8])
	assert.Equal(t, "01101000", ComputeRow(input, 4)[0:8])
}

func TestCountUsedRows(t *testing.T) {
	assert.Equal(t, 8108, CountUsedSquares(input))
}

// func TestCountRegionsOnSample(t *testing.T) {
// 	sample := [][]string{
// 		{"1", "1", "0", "2", "0", "3", "0", "0"},
// 		{"0", "1", "0", "2", "0", "3", "0", "4"},
// 		{"0", "0", "0", "0", "5", "0", "6", "0"},
// 		{"7", "0", "8", "0", "5", "5", "0", "9"},
// 		{"0", "8", "8", "0", "5", "0", "0", "0"},
// 		{"8", "8", "0", "0", "5", "0", "0", "8"},
// 		{"0", "8", "0", "0", "0", "8", "0", "0"},
// 		{"8", "8", "0", "8", "0", "8", "8", "0"},
// 	}
// 	assert.Equal(t, 8, CountRegions(sample))
// }
func TestCountRegionsOnSample(t *testing.T) {
	grid := ConvertToGrid(input)
	assert.Equal(t, 1242, CountRegions(grid))
}
