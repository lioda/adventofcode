package main

import (
	"fmt"
	"io"
	"reflect"
	"strings"
)

type AnalLog struct {
	Log        io.Reader
	robots     []Robot
	robotIndex int
	grid       [][]string
}

func NewAnalLog(reader io.Reader) *AnalLog {
	maxX := 50
	maxY := 30
	grid := make([][]string, maxY)
	for i, _ := range grid {
		grid[i] = make([]string, maxX)
		for j, _ := range grid[i] {
			grid[i][j] = " "
		}
	}
	return &AnalLog{Log: reader, grid: grid}
}

func (a AnalLog) findBottleneck() bool {
	if a.robotIndex%len(a.robots) != 0 {
		return false
	}
	for i, r1 := range a.robots {
		for j, r2 := range a.robots {
			if i != j && reflect.DeepEqual(r1, r2) {
				a.grid[r1.Y][r1.X] = "X"
				return true
			}
		}
	}
	return false
}

func (a *AnalLog) createRobot(init string) {
	if a.robots == nil {
		a.robots = []Robot{}
	}
	a.robots = append(a.robots, NewRobot(init))
}

func (a *AnalLog) moveRobot(coordinates string) {
	index := a.robotIndex % len(a.robots)
	a.robots[index].Move(coordinates)
	a.robotIndex++
}

func (a *AnalLog) CountBottlenecks() (result int) {
	parser := Parser{Input: a.Log}
	for token := parser.Next(); token != "EOF"; token = parser.Next() {
		if string(token[0]) == "[" {
			a.createRobot(token)
			continue
		}
		a.moveRobot(token)
		if a.findBottleneck() {
			result++
		}
	}
	fmt.Println("Display AI Message:")
	for _, row := range a.grid {
		fmt.Println(strings.Join(row, " "))
	}
	return result
}
