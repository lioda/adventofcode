package main

import (
	"strings"
	"testing"

	"github.com/stretchr/testify/assert"
)

const input = `0: 3
1: 2
4: 4
6: 4
`

func TestInitialState(t *testing.T) {
	layers := NewLayers(strings.NewReader(input))
	assert.Equal(t, map[int]int{0: 3, 1: 2, 4: 4, 6: 4}, layers.ToMap())
}

func TestAfterPicosecond0(t *testing.T) {
	layers := NewLayers(strings.NewReader(input))
	p := NewPacket(0)
	sev, moved, _ := layers.Picosecond(p)
	assert.Equal(t, 0, sev)
	assert.True(t, moved)
	assert.Equal(t, 0, p.Layer)
}
func TestAfterPicosecond6(t *testing.T) {
	layers := NewLayers(strings.NewReader(input))
	p := NewPacket(0)
	layers.Picosecond(p)
	sev, moved, _ := layers.Picosecond(p)
	assert.Equal(t, 0, sev)
	assert.True(t, moved)
	layers.Picosecond(p)
	layers.Picosecond(p)
	layers.Picosecond(p)
	layers.Picosecond(p)
	sev, moved, _ = layers.Picosecond(p)
	assert.Equal(t, 24, sev)
	assert.True(t, moved)
	assert.Equal(t, 6, p.Layer)
}
func TestStopMovingAfterPicosecond6(t *testing.T) {
	layers := NewLayers(strings.NewReader(input))
	p := NewPacket(0)
	layers.Picosecond(p)
	layers.Picosecond(p)
	layers.Picosecond(p)
	layers.Picosecond(p)
	layers.Picosecond(p)
	layers.Picosecond(p)
	layers.Picosecond(p)
	_, moved, _ := layers.Picosecond(p)
	assert.False(t, moved)
	assert.Equal(t, 6, p.Layer)
}
func TestWait(t *testing.T) {
	layers := NewLayers(strings.NewReader(input))
	wait := layers.Wait()
	assert.Equal(t, 10, wait)
}
