package main

import "fmt"

func Reallocate(banks []int) (result int, size int) {
	patterns := make(map[string]int)
	// fmt.Sprintf("%v", banks)
	index := 0
	for _, ok := patterns[fmt.Sprintf("%v", banks)]; !ok; _, ok = patterns[fmt.Sprintf("%v", banks)] {
		patterns[fmt.Sprintf("%v", banks)] = index
		banks = Cycle(banks)
		result++
		index++
	}
	size = len(patterns) - patterns[fmt.Sprintf("%v", banks)]
	return
}
