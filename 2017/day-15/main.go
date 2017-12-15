package main

import "fmt"

const divisor = 2147483647
const facA = 16807
const facB = 48271

type Generator struct {
	Factor uint64
	Last   uint64
	Mult   uint64
}

func NewGeneratorA(init uint64) Generator {
	return Generator{facA, init, 4}
}
func NewGeneratorB(init uint64) Generator {
	return Generator{facB, init, 8}
}

func (g *Generator) Next() string {
	result := (g.Last * g.Factor) % divisor
	// fmt.Printf("%d * %d %% %d => %d %% %d => %d\n", g.Last, g.Factor, divisor, g.Last*g.Factor, divisor, result)
	g.Last = result
	return fmt.Sprintf("%032b", result)
}
func (g *Generator) Chan(max int, c chan string) {
	for count := 0; count < max; {
		result := (g.Last * g.Factor) % divisor
		g.Last = result
		if result%g.Mult != 0 {
			continue
		}
		count++
		// fmt.Printf("%d * %d %% %d => %d %% %d => %d\n", g.Last, g.Factor, divisor, g.Last*g.Factor, divisor, result)
		c <- fmt.Sprintf("%032b", result)
		// name := "A"
		// if g.Factor == facB {
		// 	name = "B"
		// }
		// fmt.Printf("%s: %d\n", name, result)
	}
	// return fmt.Sprintf("%032b", result)
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

type Judge2 struct {
	genA, genB Generator
}

func (j Judge2) Count() int {
	max := /*1056*/ 5000000
	result := 0
	chanA := make(chan string)
	chanB := make(chan string)
	go j.genA.Chan(max, chanA)
	go j.genB.Chan(max, chanB)
	for i := 0; i < max; i++ {

		// if i%100000 == 0 {
		// fmt.Printf("%d (%f%%)\n", i, (float64(i)/float64(max))*100)
		// }
		numA := <-chanA
		numB := <-chanB
		// numB := j.genB.Next()
		lowestA := numA[len(numA)-16 : len(numA)]
		lowestB := numB[len(numB)-16 : len(numB)]
		// fmt.Printf("%s\n%s\n", lowestA, lowestB)
		if lowestA == lowestB {
			result++
		}
	}
	close(chanA)
	close(chanB)
	return result
}

func main() {
	fmt.Printf("After 40.000.000, the counter is %d\n", Judge{NewGeneratorA(722), NewGeneratorB(354)}.Count())
	fmt.Printf("After 5.000.000, the second counter is %d\n", Judge2{NewGeneratorA(722), NewGeneratorB(354)}.Count())
}
