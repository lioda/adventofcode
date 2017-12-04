package main

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestCreateRobot(t *testing.T) {
	assert.Equal(t, Robot{12, 58}, NewRobot("[12,58]"))
}
