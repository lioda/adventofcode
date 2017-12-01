package main

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func Test1122(t *testing.T) {
	assert.Equal(t, 3, Captcha("1122"))
}
func Test1111(t *testing.T) {
	assert.Equal(t, 4, Captcha("1111"))
}
func Test1234(t *testing.T) {
	assert.Equal(t, 0, Captcha("1234"))
}
func Test91212129(t *testing.T) {
	assert.Equal(t, 9, Captcha("91212129"))
}
