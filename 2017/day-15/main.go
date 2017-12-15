package main

import "fmt"

const divisor = 2147483647
const facA = 16807
const facB = 48271

type Generator struct {
	Factor uint64
	Last   uint64
}

func NewGeneratorA(init uint64) Generator {
	return Generator{facA, init}
}
func NewGeneratorB(init uint64) Generator {
	return Generator{facB, init}
}

func (g *Generator) Next() string {
	result := (g.Last * g.Factor) % divisor
	// fmt.Printf("%d * %d %% %d => %d %% %d => %d\n", g.Last, g.Factor, divisor, g.Last*g.Factor, divisor, result)
	g.Last = result
	return fmt.Sprintf("%032b", result)
}

type Judge struct {
	genA, genB Generator
}

func (j Judge) Count() int {
	result := 0
	for i := 0; i < 40000000; i++ {
		// if i%100000 == 0 {
		// 	fmt.Printf("%d (%f%%)\n", i, (float64(i)/40000000)*100)
		// }
		numA := j.genA.Next()
		numB := j.genB.Next()
		lowestA := numA[len(numA)-16 : len(numA)]
		lowestB := numB[len(numB)-16 : len(numB)]
		if lowestA == lowestB {
			result++
		}
	}
	return result
}

func main() {
	genA := NewGeneratorA(722)
	genB := NewGeneratorB(354)
	fmt.Printf("After 40.000.000, the counter is %d\n", Judge{genA, genB}.Count())
}
