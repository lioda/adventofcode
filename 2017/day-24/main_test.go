package main

import (
	"strings"
	"testing"

	"github.com/stretchr/testify/assert"
)

const input = `0/2
2/2
2/3
3/4
3/5
0/1
10/1
9/10
`

func TestParseComponent(t *testing.T) {
	input := `0/1
8/47
`
	assert.Equal(t, []Component{Component{0, 1}, Component{8, 47}}, ParseComponents(strings.NewReader(input)))
}

func TestComponentMatches(t *testing.T) {
	assert.True(t, Component{0, 6}.Matches(0))
	assert.True(t, Component{0, 6}.Matches(6))
	assert.False(t, Component{0, 6}.Matches(2))
}
func TestComponentOther(t *testing.T) {
	assert.Equal(t, 6, Component{4, 6}.Other(4))
	assert.Equal(t, 4, Component{4, 6}.Other(6))
}
func TestBridgeAccept(t *testing.T) {
	// comps := ParseComponents(strings.NewReader(input))
	bridge := NewBridge()
	assert.Equal(t, 0, bridge.Strength())
	accepted, bridge := bridge.Accept(Component{0, 6})
	assert.True(t, accepted)
	assert.Equal(t, 6, bridge.Strength())
	accepted, bridge = bridge.Accept(Component{4, 6})
	assert.True(t, accepted)
	assert.Equal(t, 16, bridge.Strength())
	accepted, bridge = bridge.Accept(Component{4, 2})
	assert.True(t, accepted)
	assert.Equal(t, 22, bridge.Strength())
	accepted, _ = bridge.Accept(Component{9, 14})
	assert.False(t, accepted)
	accepted, bridge = bridge.Accept(Component{2, 6})
	accepted, bridge = bridge.Accept(Component{4, 6})
	assert.False(t, accepted)
}

func TestStrongestBridge(t *testing.T) {
	comps := ParseComponents(strings.NewReader(input))
	assert.Equal(t, 31, BuildStrongestBridge(comps))
}
