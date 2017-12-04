package main

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestSimpleLog(t *testing.T) {
	an := AnalLog{"[0,0][1,1](1,0)(0,-1)(0.1)(-1.0)(-1.0)(0.1)(0,-1)(1.0)"}
	assert.Equal(t, 2, an.CountBottlenecks())
}
