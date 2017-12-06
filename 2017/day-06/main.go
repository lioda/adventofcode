package main

import "fmt"

func main() {
	input := ParseFile("input.txt")
	result, size := Reallocate(input)
	fmt.Printf("Reallocation: %d\n", result)
	fmt.Printf("Reallocation: %d\n", size)
}
