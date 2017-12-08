package main

import (
	"bufio"
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func ParseLine(line string) (root string, weight int, holdings []string) {
	splitted := strings.Split(line, " -> ")
	root = string(splitted[0][:strings.Index(splitted[0], " ")])
	w := splitted[0][strings.Index(splitted[0], "(")+1 : len(splitted[0])-1]
	// fmt.Println(w)
	weight, _ = strconv.Atoi(w)
	if len(splitted) == 1 {
		return
	}
	holdings = strings.Split(splitted[1], ", ")
	return
}

type tree struct {
	bottom bool
	weight int
	top    []string
}

func FindBottom(input io.Reader) (string, int) {
	trees := make(map[string]tree)
	buf := bufio.NewReader(input)
	for line, _, _ := buf.ReadLine(); line != nil; line, _, _ = buf.ReadLine() {
		root, weight, branches := ParseLine(string(line))
		for _, branchName := range branches {
			//holded = append(holded, holding)
			branch, ok := trees[branchName]
			if ok {
				// fmt.Printf("A: %s\n", branchName)
				trees[branchName] = tree{false, branch.weight, branch.top}
				// trees[branchName].bottom = false
				// fmt.Printf("-- A: %v\n", trees[branchName].bottom)
			} else {
				// fmt.Printf("B: %s\n", branchName)
				trees[branchName] = tree{false, 0, nil}
			}
		}
		_, ok := trees[root]
		if !ok {
			// fmt.Printf("C: %s (%v)\n", root, len(branches) != 0)
			trees[root] = tree{len(branches) != 0, weight, branches}
		} else {
			// fmt.Printf("D: %s\n", root)
			trees[root] = tree{false, weight, branches}
			// branch.bottom = false
			// branch.top = branches
		}
	}
	// fmt.Printf("%v\n", trees)
	for key, branch := range trees {
		if branch.bottom {
			return key, equilibrate(trees, key)
		}
	}

	return "", 0
}

type equilibration struct {
	name             string
	weight, standard int
}

func findEquilibrate(trees map[string]tree, root string) equilibration {
	weights := make(map[string]int)
	weights["_"] = -1
	standard := "_"
	concurrent := "_"
	// toEquilibrate := ""
	for _, branch := range trees[root].top {
		w := weight(trees, branch)
		weights[branch] = w
		if weights[standard] == -1 {
			standard = branch
		} else if weights[standard] != w && weights[concurrent] == -1 {
			concurrent = branch
		} else if weights[standard] != w && weights[concurrent] == w {
			concurrent = standard
			standard = branch
		}
		// fmt.Printf("Branch %s weight %d\n", branch, w)
	}
	return equilibration{concurrent, weights[concurrent], weights[standard]}
}

func equilibrate(trees map[string]tree, root string) int {
	toEquilibrate := findEquilibrate(trees, root)
	if toEquilibrate.weight == -1 {
		return -1
	}
	fmt.Printf("Must equilibrate %s weight %d (%d)\n", toEquilibrate.name, toEquilibrate.weight, toEquilibrate.standard)
	if childEq := equilibrate(trees, toEquilibrate.name); childEq == -1 {
		fmt.Printf("Equilibrate %s weight %d - (%d - %d)\n", toEquilibrate.name, trees[toEquilibrate.name].weight, toEquilibrate.weight, toEquilibrate.standard)
		return trees[toEquilibrate.name].weight - (toEquilibrate.weight - toEquilibrate.standard)
	} else {
		return childEq
	}
}

func weight(trees map[string]tree, branch string) int {
	result := trees[branch].weight
	for _, child := range trees[branch].top {
		result += weight(trees, child)
	}
	return result
}

func main() {
	f, _ := os.Open("input.txt")
	bottom, equilibrate := FindBottom(f)
	fmt.Printf("Bottom: %s\n", bottom)
	fmt.Printf("Equilibrate: %v\n", equilibrate)
}
