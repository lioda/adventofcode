package main

import (
	"strings"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestWhenReadFileThenReturnsStringArray(t *testing.T) {
	input := strings.NewReader("abc\ndef\nghi")
	assert.Equal(t, []string{"abc", "def", "ghi"}, read(input))
}

func TestWhenChecksumThenReturnTwoAndThreeMultiplied(t *testing.T) {
	assert.Equal(t, 12, checksum([]string{"abcdef", "bababc", "abbcde", "abcccd", "aabcdd", "abcdee", "ababab"}))
}
