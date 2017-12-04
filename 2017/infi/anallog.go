package main

import "fmt"

type AnalLog struct {
	Log string
}

func (a *AnalLog) CountBottlenecks() int {
	parser := Parser{Input: a.Log}
	robots := []Robot{}
	for token := parser.Next(); token != "EOF"; token = parser.Next() {
		if string(token[0]) == "[" {
			robots = append(robots, NewRobot(token))
		}
	}
	fmt.Printf("%d Robots: %s\n", len(robots), robots)
	return 0
}
