package main

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func Test1Distance0(t *testing.T) {
	assert.Equal(t, 0, Distance(1))
}
func Test2Distance1(t *testing.T) {
	assert.Equal(t, 1, Distance(2))
}
func Test12Distance3(t *testing.T) {
	assert.Equal(t, 3, Distance(12))
}
func Test23Distance2(t *testing.T) {
	assert.Equal(t, 2, Distance(23))
}
func Test1024Distance31(t *testing.T) {
	assert.Equal(t, 31, Distance(1024))
}
