package main

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestPassphraseValid(t *testing.T) {
	assert.True(t, IsValid("aa bb cc dd ee"))
}
func TestPassphraseInvalid(t *testing.T) {
	assert.False(t, IsValid("aa bb cc dd aa"))
}
func TestPassphraseWithSimilarWords(t *testing.T) {
	assert.True(t, IsValid("aa bb cc dd aaa"))
}
func TestPassphraseWithEmptyString(t *testing.T) {
	assert.False(t, IsValid(""))
}

func TestCountValids(t *testing.T) {
	assert.Equal(t, 2, CountValid([]string{
		"aa bb cc dd ee",
		"aa bb cc dd aa",
		"aa bb cc dd aaa",
		"",
	}))
}
