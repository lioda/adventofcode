package main

import (
	"bufio"
	"fmt"
	"os"
	"sort"
	"strings"
)

func IsValid(passphrase string) bool {
	words := strings.Split(passphrase, " ")
	sort.Strings(words)
	var last string
	for _, word := range words {
		if word == last {
			return false
		}
		last = word
	}
	return true
}

func IsValidAnagrams(passphrase string) bool {
	words := strings.Split(passphrase, " ")
	anagrams := []string{}
	for _, word := range words {
		letters := strings.Split(word, "")
		sort.Strings(letters)
		anagrams = append(anagrams, strings.Join(letters, ""))
	}
	sort.Strings(anagrams)
	var last string
	for _, word := range anagrams {
		if word == last {
			return false
		}
		last = word
	}
	return true
}

func CountValid(passphrases []string, validator func(string) bool) int {
	result := 0
	for _, passphrase := range passphrases {
		if validator(passphrase) {
			result++
		}
	}
	return result
}

func main() {
	file, _ := os.Open("input.txt")
	reader := bufio.NewReader(file)
	lines := []string{}
	for line, _, _ := reader.ReadLine(); line != nil; line, _, _ = reader.ReadLine() {
		lines = append(lines, string(line))
	}
	fmt.Printf("%s\n", strings.Join(lines, "\n"))
	fmt.Printf("%d are valids\n", CountValid(lines, IsValid))
	fmt.Printf("%d are valids accroding to anagrams rule\n", CountValid(lines, IsValidAnagrams))
}
