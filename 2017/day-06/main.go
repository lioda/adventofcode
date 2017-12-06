package main

import "fmt"

func main() {
	input := ParseFile("input.txt")
	result := Reallocate(input)
	fmt.Printf("Reallocation: %d\n", result)
}
