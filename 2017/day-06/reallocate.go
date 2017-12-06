package main

import "fmt"

func Reallocate(banks []int) (result int) {
	patterns := make(map[string]bool)
	// fmt.Sprintf("%v", banks)
	for _, ok := patterns[fmt.Sprintf("%v", banks)]; !ok; _, ok = patterns[fmt.Sprintf("%v", banks)] {
		patterns[fmt.Sprintf("%v", banks)] = true
		banks = Cycle(banks)
		result++
	}
	return
}
