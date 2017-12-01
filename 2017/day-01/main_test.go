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

func TestHalf1212(t *testing.T) {
	assert.Equal(t, 6, CaptchaHalf("1212"))
}
func TestHalf1221(t *testing.T) {
	assert.Equal(t, 0, CaptchaHalf("1221"))
}
func TestHalf123425(t *testing.T) {
	assert.Equal(t, 4, CaptchaHalf("123425"))
}
func TestHalf123123(t *testing.T) {
	assert.Equal(t, 12, CaptchaHalf("123123"))
}
func TestHalf12131415(t *testing.T) {
	assert.Equal(t, 4, CaptchaHalf("12131415"))
}
