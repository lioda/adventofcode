package main

import (
	"strings"
	"testing"

	"github.com/stretchr/testify/assert"
)

type FakeMoveObserver struct {
	Moves []string
}

func (m *FakeMoveObserver) DoMove(move string) {
	m.Moves = append(m.Moves, move)
}
func (m *FakeMoveObserver) Order() string {
	return ""
}

func TestParse(t *testing.T) {
	input := `abc,def,gh/i,j/kl
  `
	callback := &FakeMoveObserver{[]string{}}
	parser := NewParser(strings.NewReader(input), callback)
	parser.Parse()
	assert.Equal(t, []string{"abc", "def", "gh/i", "j/kl"}, callback.Moves)
}

func TestCreateDancers(t *testing.T) {
	dancers := NewDancers(5)
	assert.Equal(t, "abcde", dancers.Order())
}
func TestMoveSpin(t *testing.T) {
	dancers := NewDancers(5)
	dancers.DoMove("s1")
	assert.Equal(t, "eabcd", dancers.Order())
}
func TestMoveExchange(t *testing.T) {
	dancers := NewDancers(5)
	dancers.DoMove("x3/4")
	assert.Equal(t, "abced", dancers.Order())
}
func TestMovePartner(t *testing.T) {
	dancers := NewDancers(5)
	dancers.DoMove("pe/b")
	assert.Equal(t, "aecdb", dancers.Order())
}

func TestMoveSpinLarge(t *testing.T) {
	dancers := NewDancers(16)
	dancers.DoMove("s10")
	assert.Equal(t, "ghijklmnopabcdef", dancers.Order())
}
func TestMoveExchangeLarge(t *testing.T) {
	dancers := NewDancers(16)
	dancers.DoMove("x10/12")
	assert.Equal(t, "abcdefghijmlknop", dancers.Order())
}

func TestParseSample(t *testing.T) {
	input := `s1,x3/4,pe/b
  `
	dancers := NewDancers(5)
	parser := NewParser(strings.NewReader(input), dancers)
	parser.Parse()
	assert.Equal(t, "baedc", dancers.Order())
}

func TestParseSampleManyTimes(t *testing.T) {
	input := `s1,x3/4,pe/b
  `
	dancers := NewDancers(5)
	parser := NewParser(strings.NewReader(input), dancers)
	parser.Parsex(2)
	assert.Equal(t, "ceadb", dancers.Order())
}
