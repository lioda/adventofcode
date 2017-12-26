package main

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestTuringMachine(t *testing.T) {
	machine := NewTuringMachine(
		6,
		"A",
		NewState("A", Case{1, RIGHT, "B"}, Case{0, LEFT, "B"}),
		NewState("B", Case{1, LEFT, "A"}, Case{1, RIGHT, "A"}),
	)
	assert.Equal(t, 3, machine.DiagnosticChecksum())
}
