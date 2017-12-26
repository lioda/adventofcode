package main

import (
	"fmt"
	"math"
)

func main() {
	a := 65*100 + 100000
	b := a + 17000
	result := 0

	for ; a <= b; a = a + 17 {
		if IsPrimeSqrt(a) {
			continue
		}
		result++
	}
	fmt.Printf("result: %d\n", result)
}

func IsPrimeSqrt(value int) bool {
	for i := 2; i <= int(math.Floor(math.Sqrt(float64(value)))); i++ {
		if value%i == 0 {
			return false
		}
	}
	return value > 1
}
