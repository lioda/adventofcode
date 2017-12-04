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
	}, IsValid))
}

func TestPassphraseAnagramsWithTwoSeparateWords(t *testing.T) {
	assert.True(t, IsValidAnagrams("abcde fghij"))
}
func TestPassphraseAnagramsWithOneAnagram(t *testing.T) {
	assert.False(t, IsValidAnagrams("abcde xyz ecdab"))
}
func TestPassphraseAnagramsTestCases(t *testing.T) {
	assert.True(t, IsValidAnagrams("a ab abc abd abf abj"))
	assert.True(t, IsValidAnagrams("iiii oiii ooii oooi oooo"))
	assert.False(t, IsValidAnagrams("oiii ioii iioi iiio"))
	assert.False(t, IsValidAnagrams(""))
}
func TestCountValidAnagrams(t *testing.T) {
	assert.Equal(t, 3, CountValid([]string{
		"abcde fghij",
		"abcde xyz ecdab",
		"a ab abc abd abf abj",
		"iiii oiii ooii oooi oooo",
		"oiii ioii iioi iiio",
		"",
	}, IsValidAnagrams))
}
