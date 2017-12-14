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
func parseLengths2(s string) (lengths []int) {
	for _, i := range s {
		lengths = append(lengths, int(i))
	}
	lengths = append(lengths, 17, 31, 73, 47, 23)
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

func KnotHash(input string) string {
	return knotHash(ints(256), parseLengths2(input))
}

func knotHash(input []int, lengths []int) string {
	sparseHash := input
	curr := 0
	skipSize := 0
	// fmt.Printf("Start: sparseHash=%v, length=%v\n", sparseHash, lengths)
	for round := 0; round < 64; round++ {
		for _, length := range lengths {
			// debug := append(sparseHash, 0)
			toReverse := sublist(sparseHash, curr, length)
			reversed := reverse(toReverse)
			replace(sparseHash, curr, reversed)
			// fmt.Printf("Length %d: before=%v => after=%v (%d), length=%v, toReverse=%v, reversed=%v\n", length, debug, sparseHash, curr, lengths, toReverse, reversed)
			curr = curr + length + skipSize
			skipSize++
		}
	}
	denseHash := xor16(sparseHash)
	result := hex(denseHash)
	return result
}

func xor16(input []int) []int {
	result := []int{}
	for i := 0; i < len(input); i = i + 16 {
		// fmt.Printf("%v[%d:%d]\n", input, i, i+16)
		arr := input[i : i+16]
		reduce := arr[0]
		for j := 1; j < 16; j++ {
			// fmt.Printf("%d ^ %d\n", reduce, arr[j])
			reduce = reduce ^ arr[j]
			// reduce = reduce | j
		}
		result = append(result, reduce)
	}
	return result
}

func hex(input []int) string {
	result := ""
	for _, item := range input {
		result = result + fmt.Sprintf("%02x", item)
	}
	return result
}

// func main() {
// 	lengths := parseLengths("206,63,255,131,65,80,238,157,254,24,133,2,16,0,1,3")
// 	fmt.Printf("Hash then multiply first two numbers: %d\n", hashMult(ints(256), lengths))
// 	fmt.Printf("Knot hash: %s\n", knotHash(ints(256), parseLengths2("206,63,255,131,65,80,238,157,254,24,133,2,16,0,1,3")))
// }
