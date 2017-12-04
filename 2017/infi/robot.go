package main

import (
	"regexp"
	"strconv"
)

type Robot struct {
	X, Y int
}

func NewRobot(token string) Robot {
	r, _ := regexp.Compile("\\[([^,]*),([^,]*)\\]")
	// fmt.Printf("%q\n", r.FindAllStringSubmatch(token, -1))
	strings := r.FindAllStringSubmatch(token, -1)
	x, _ := strconv.Atoi(strings[0][1])
	y, _ := strconv.Atoi(strings[0][2])
	return Robot{x, y}
}

func (r *Robot) Move(coordinates string) {
	re, _ := regexp.Compile("\\(([^,]*),([^,]*)\\)")
	strings := re.FindAllStringSubmatch(coordinates, -1)
	x, _ := strconv.Atoi(strings[0][1])
	y, _ := strconv.Atoi(strings[0][2])
	r.X = r.X + x
	r.Y = r.Y + y
}
