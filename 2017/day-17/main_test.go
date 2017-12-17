package main

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestCreateCircularBuffer(t *testing.T) {
	buf := NewCircularBuffer()
	assert.Equal(t, 0, buf.Current())
}
func TestCircularBufferStepAndInsert(t *testing.T) {
	buf := NewCircularBuffer()
	assert.Equal(t, 0, buf.StepAndInsert(3, 1))
	assert.Equal(t, 1, buf.Current())
	assert.Equal(t, []int{0, 1}, buf.buf)
}
func TestCircularBufferStepAndInsertTwoTimes(t *testing.T) {
	buf := NewCircularBuffer()
	assert.Equal(t, 0, buf.StepAndInsert(3, 1))
	assert.Equal(t, 1, buf.StepAndInsert(3, 2))
	assert.Equal(t, 2, buf.Current())
	assert.Equal(t, []int{0, 2, 1}, buf.buf)
}
func TestSpinlock9Times(t *testing.T) {
	buf := NewCircularBuffer()
	lock := NewSpinlock(3, buf)
	assert.Equal(t, 5, lock.spinUntil(9))
	assert.Equal(t, []int{0, 9, 5, 7, 2, 4, 3, 8, 6, 1}, buf.buf)
}
