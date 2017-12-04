package main

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestCreateRobot(t *testing.T) {
	assert.Equal(t, Robot{12, 58}, NewRobot("[12,58]"))
}
func TestMoveRobot(t *testing.T) {
	robot := Robot{12, 58}
	robot.Move("(1,-1)")
	assert.Equal(t, NewRobot("[13,57]"), robot)
}
