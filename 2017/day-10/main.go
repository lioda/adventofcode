package main

import (
	"fmt"
	"strconv"
	"strings"
)

func parseLengths(s string) (lengths []int) {
	for _, i := range strings.Split(s, ",") {
		n, _ := strconv.Atoi(i)
		lengths = append(lengths, n)
	}
	return
}

func ints(length int) []int {
	result := make([]int, length)
	for i := 0; i < length; i++ {
		result[i] = i
	}
	return result
}

func hashMult(input []int, lengths []int) int {
	result := input
	curr := 0
	skipSize := 0
	// fmt.Printf("Start: result=%v, length=%v\n", result, lengths)
	for _, length := range lengths {
		// debug := append(result, 0)
		toReverse := sublist(result, curr, length)
		reversed := reverse(toReverse)
		replace(result, curr, reversed)
		// fmt.Printf("Length %d: before=%v => after=%v (%d), length=%v, toReverse=%v, reversed=%v\n", length, debug, result, curr, lengths, toReverse, reversed)
		curr = curr + length + skipSize
		skipSize++
	}
	return result[0] * result[1]
}

func sublist(list []int, curr int, length int) (sub []int) {
	sub = make([]int, length)
	for i := 0; i < length; i++ {
		sub[i] = list[(curr+i)%len(list)]
	}
	return
}

func reverse(list []int) (reversed []int) {
	length := len(list)
	reversed = make([]int, length)
	for i, item := range list {
		reversed[length-1-i] = item
	}
	return
}

func replace(input []int, start int, rep []int) {
	for i, item := range rep {
		input[(start+i)%len(input)] = item
	}
}

func main() {
	lengths := parseLengths("206,63,255,131,65,80,238,157,254,24,133,2,16,0,1,3")
	input := ints(256)
	fmt.Printf("Hash then multiply first two numbers: %d\n", hashMult(input, lengths))
}
