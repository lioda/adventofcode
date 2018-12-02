package main

import (
	"bufio"
	"fmt"
	"io"
	"os"
	"strings"
)

func main() {
	if len(os.Args) < 2 {
		panic("a or b ?")
	}
	exo := os.Args[1:2][0]
	input, _ := os.Open("input.txt")
	ids := read(input)
	if exo == "a" {
		fmt.Println(checksum(ids))
	} else if exo == "b" {
		s1, s2 := findWordsWithOneDifference(ids)
		fmt.Println(commonLetters(s1, s2))
	}
}

func read(input io.Reader) []string {
	result := make([]string, 0)
	scanner := bufio.NewScanner(input)
	for scanner.Scan() {
		result = append(result, scanner.Text())
	}
	return result
}

func checksum(ids []string) int {
	twos := 0
	threes := 0
	for _, id := range ids {
		two, three := hasLetterTwice(id)
		twos += two
		threes += three
	}
	return twos * threes
}

func hasLetterTwice(s string) (two int, three int) {
	occurences := make(map[string]int)
	for _, c := range strings.Split(s, "") {
		occurences[c]++
	}
	for _, occurence := range occurences {
		if occurence == 2 {
			two = 1
		} else if occurence == 3 {
			three = 1
		}
		if two == 1 && three == 1 {
			return
		}
	}
	return
}

func findWordsWithOneDifference(ids []string) (string, string) {
	for curr, s1 := range ids {
		for i := curr + 1; i < len(ids)-1; i++ {
			s2 := ids[i]
			if countDifferences(s1, s2) == 1 {
				return s1, s2
			}
		}
	}
	return "", ""
}

func countDifferences(s1, s2 string) int {
	// fmt.Println("count ", s1, "/", s2)
	count := 0
	for i := 0; i < len(s1); i++ {
		// fmt.Println("compare ", s1[i], "/", s2[i])
		if s1[i] != s2[i] {
			count++
		}
	}
	// fmt.Println(count)
	return count
}

func commonLetters(s1, s2 string) string {
	result := ""
	for i := 0; i < len(s1); i++ {
		if s1[i] == s2[i] {
			result += string(s1[i])
		}
	}
	return result
}
