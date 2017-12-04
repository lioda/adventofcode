package main

import (
	"io"
	"reflect"
)

type AnalLog struct {
	Log        io.Reader
	robots     []Robot
	robotIndex int
}

func NewAnalLog(reader io.Reader) *AnalLog {
	return &AnalLog{Log: reader}
}

func (a AnalLog) findBottleneck() bool {
	if a.robotIndex%len(a.robots) != 0 {
		return false
	}
	for i, r1 := range a.robots {
		for j, r2 := range a.robots {
			// fmt.Printf("Compare %d / %s with %d / %s\n", i, r1, j, r2)
			if i != j && reflect.DeepEqual(r1, r2) {
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
	// fmt.Printf("%d Robots: %s, Index: %d, Move: %s\n", len(a.robots), a.robots, index, coordinates)
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
	return result
}
