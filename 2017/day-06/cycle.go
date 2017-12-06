package main

func max(banks []int) (index int) {
	max := 0
	for i, blocks := range banks {
		if blocks > max {
			max = blocks
			index = i
		}
	}
	return
}

func Cycle(banks []int) []int {
	// result:= banks
	index := max(banks)
	toDistribute := banks[index]
	banks[index] = 0
	for i := index + 1; toDistribute > 0; toDistribute-- {
		banks[i%len(banks)]++
		i++
	}
	return banks
}
