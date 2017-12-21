package main

import (
	"bufio"
	"fmt"
	"io"
	"os"
	"strings"
)

func main() {
	f, _ := os.Open("input.txt")
	rules := NewRules(f)
	prog := NewProgram(rules)
	prog.Iterate(5)
	fmt.Printf("%d on after 5 iterations\n", prog.Count())
}

type Program struct {
	rules *Rules
	State [][]string
}

func NewProgram(rules *Rules) *Program {
	return &Program{rules, [][]string{{".", "#", "."}, {".", ".", "#"}, {"#", "#", "#"}}}
}
func (p *Program) Count() int {
	result := 0
	for _, row := range p.State {
		for _, cell := range row {
			if cell == "#" {
				result++
			}
		}
	}
	return result
}
func (p *Program) Iterate(count int) {
	for i := 0; i < count; i++ {
		size := len(p.State)
		if size%2 == 0 {
			squares := Square(p.State, 2)
			newSquares := make([][][][]string, len(squares))
			for i := 0; i < size/2; i++ {
				newSquares[i] = make([][][]string, len(squares[i]))
				for j := 0; j < size/2; j++ {
					pattern := squares[i][j]
					replace := p.rules.Get(pattern)
					newSquares[i][j] = replace
				}
			}
			p.State = Unsquare(newSquares, 3)
		} else if size%3 == 0 {
			squares := Square(p.State, 3)
			newSquares := make([][][][]string, len(squares))
			for i := 0; i < size/3; i++ {
				newSquares[i] = make([][][]string, len(squares[i]))
				for j := 0; j < size/3; j++ {
					pattern := squares[i][j]
					replace := p.rules.Get(pattern)
					newSquares[i][j] = replace
				}
			}
			p.State = Unsquare(newSquares, 4)
		}
	}
}

func Flip(matrix [][]string) [][]string {
	size := len(matrix)
	result := make([][]string, size)
	for i, _ := range result {
		result[i] = make([]string, size)
	}
	for i, row := range matrix {
		for j, cell := range row {
			result[j][size-1-i] = cell
		}
	}
	return result
}
func Rotate(matrix [][]string) [][]string {
	size := len(matrix)
	result := make([][]string, size)
	for i, row := range matrix {
		newRow := make([]string, len(row))
		for j, cell := range row {
			// result[j][size-1-i] = cell
			newRow[len(row)-1-j] = cell
		}
		result[i] = newRow
	}
	return result
}

func Split(s string) [][]string {
	rows := strings.Split(s, "/")
	result := make([][]string, len(rows))
	for i, row := range rows {
		cells := strings.Split(row, "")
		result[i] = cells
	}
	return result
}
func Join(matrix [][]string) string {
	result := make([]string, len(matrix))
	for i, row := range matrix {
		result[i] = strings.Join(row, "")
	}
	return strings.Join(result, "/")
}

func Square(matrix [][]string, splitSize int) [][][][]string {
	size := len(matrix) / splitSize
	result := make([][][][]string, size)
	for i, _ := range result {
		result[i] = make([][][]string, size)
		for j := 0; j < size; j++ {
			result[i][j] = make([][]string, splitSize)
			for k := 0; k < splitSize; k++ {
				result[i][j][k] = matrix[i*splitSize+k][j*splitSize : j*splitSize+splitSize]
			}
		}
	}
	return result
}
func Unsquare(matrix [][][][]string, joinSize int) [][]string {
	result := make([][]string, len(matrix)*joinSize)
	for i, _ := range result {
		result[i] = make([]string, len(matrix)*joinSize)
	}

	for i, _ := range matrix {
		for j, _ := range matrix[i] {
			for k, _ := range matrix[i][j] {
				for l, cell := range matrix[i][j][k] {
					result[i*joinSize+k][j*joinSize+l] = cell
				}
			}
		}
	}
	// 	result[i] = make([][][]string, joinSize)
	// row := []string{}
	// for j := 0; j < joinSize; j++ {
	// row = append(row, matrix[i][j][0][0])
	// result[i] = matrix[]
	// 		result[i][j] = make([][]string, joinSize)
	// 		for k := 0; k < joinSize; k++ {
	// 			result[i][j][k] = matrix[i*joinSize+k][j*joinSize : j*joinSize+joinSize]
	// 		}
	// }
	// result[i] = row
	// }
	return result
}

type Rules struct {
	patterns map[string]string
}

func NewRules(r io.Reader) *Rules {
	patterns := map[string]string{}
	buf := bufio.NewReader(r)
	for line, _, _ := buf.ReadLine(); line != nil; line, _, _ = buf.ReadLine() {
		splitted := strings.Split(string(line), " => ")
		patterns[splitted[0]] = splitted[1]
	}
	return &Rules{patterns}
}
func (r Rules) Get(pattern [][]string) [][]string {
	arr := pattern
	for i := 0; i < 4; i++ {
		if result, ok := r.patterns[Join(arr)]; ok {
			return Split(result)
		}
		if result, ok := r.patterns[Join(Rotate(arr))]; ok {
			return Split(result)
		}
		arr = Flip(arr)
	}
	return nil
}
