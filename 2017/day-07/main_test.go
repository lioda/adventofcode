package main

import (
	"strings"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestLineWithLeaves(t *testing.T) {
	root, weight, leaves := ParseLine("ddswb (34)")
	assert.Equal(t, "ddswb", root)
	assert.Equal(t, 34, weight)
	assert.Empty(t, leaves)
}
func TestLineWithHoldings(t *testing.T) {
	root, weight, leaves := ParseLine("bqyqwn (68) -> wscqe, cwxspl, syogw, xnxudsh")
	assert.Equal(t, "bqyqwn", root)
	assert.Equal(t, 68, weight)
	assert.Equal(t, []string{"wscqe", "cwxspl", "syogw", "xnxudsh"}, leaves)
}
func TestFindBottom(t *testing.T) {
	input := `pbga (66)
xhth (57)
ebii (61)
havc (66)
ktlj (57)
fwft (72) -> ktlj, cntj, xhth
qoyq (66)
padx (45) -> pbga, havc, qoyq
tknk (41) -> ugml, padx, fwft
jptl (61)
ugml (68) -> gyxo, ebii, jptl
gyxo (61)
cntj (57)
`
	bottom, _ := FindBottom(strings.NewReader(input))
	assert.Equal(t, "tknk", bottom)
}

func TestEquililbrate(t *testing.T) {
	input := `pbga (66)
xhth (57)
ebii (61)
havc (66)
ktlj (57)
fwft (72) -> ktlj, cntj, xhth
qoyq (66)
padx (45) -> pbga, havc, qoyq
tknk (41) -> ugml, padx, fwft
jptl (61)
ugml (68) -> gyxo, ebii, jptl
gyxo (61)
cntj (57)
`
	_, equilibrate := FindBottom(strings.NewReader(input))
	assert.Equal(t, 60, equilibrate)
}
