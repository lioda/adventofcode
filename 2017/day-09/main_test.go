package main

import (
	"strings"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestSimpleEmptyGroup(t *testing.T) {
	assert.Equal(t, 1, ComputeScore(strings.NewReader("{}")))
}
func TestContainingGroups(t *testing.T) {
	assert.Equal(t, 6, ComputeScore(strings.NewReader("{{{}}}")))
}
func TestSiblingGroups(t *testing.T) {
	assert.Equal(t, 5, ComputeScore(strings.NewReader("{{},{}}")))
}
func TestContainingAndSiblingGroups(t *testing.T) {
	assert.Equal(t, 16, ComputeScore(strings.NewReader("{{{},{},{{}}}}")))
}
func TestContainingGarbage(t *testing.T) {
	assert.Equal(t, 1, ComputeScore(strings.NewReader("{<a>,<a>,<a>,<a>}")))
}
func TestContainingGroupsAndGarbage(t *testing.T) {
	assert.Equal(t, 9, ComputeScore(strings.NewReader("{{<ab>},{<ab>},{<ab>},{<ab>}}")))
}
func TestGarbageContainingGroup(t *testing.T) {
	assert.Equal(t, 3, ComputeScore(strings.NewReader("{{<ab{}{b>}}")))
}
func TestGarbageContainingCancelMark(t *testing.T) {
	assert.Equal(t, 3, ComputeScore(strings.NewReader("{{<ab!>{}{b>}}")))
	assert.Equal(t, 3, ComputeScore(strings.NewReader("{{<a!>},{<a!>},{<a!>},{<ab>}}")))
}
func TestGarbageCancelTheCancel(t *testing.T) {
	assert.Equal(t, 9, ComputeScore(strings.NewReader("{{<!!>},{<!!>},{<!!>},{<!!>}}")))
}

func TestCountEmptyGarbage(t *testing.T) {
	assert.Equal(t, 0, CountGarbage(strings.NewReader("<>")))
}
func TestCountFullGarbage(t *testing.T) {
	assert.Equal(t, 17, CountGarbage(strings.NewReader("<random characters>")))
}
func TestCountFakeGarbageOpener(t *testing.T) {
	assert.Equal(t, 3, CountGarbage(strings.NewReader("<<<<>")))
}
func TestCountIgnoreCanceledCharacters(t *testing.T) {
	assert.Equal(t, 2, CountGarbage(strings.NewReader("<{!>}>")))
}
func TestCountOnlyIgnoredCharacters(t *testing.T) {
	assert.Equal(t, 0, CountGarbage(strings.NewReader("<!!>")))
	assert.Equal(t, 0, CountGarbage(strings.NewReader("<!!!>>")))
}
func TestCountCompleteSequence(t *testing.T) {
	assert.Equal(t, 10, CountGarbage(strings.NewReader(`<{o"i!a,<{i<a>`)))
}
func TestCountWithGroupe(t *testing.T) {
	assert.Equal(t, 17, CountGarbage(strings.NewReader(`{{<a!>},{<a!>},{<a!>},{<ab>}}`)))
}
