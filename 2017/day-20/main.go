package main

import (
	"bufio"
	"fmt"
	"io"
	"math"
	"os"
	"strconv"
	"strings"
)

func main() {
	f, _ := os.Open("input.txt")
	particles := NewParticles(f)
	fmt.Printf("Closest particle: %d\n", particles.Closest())
}

type Coordinates struct {
	X, Y, Z int
}

func (c Coordinates) Impact(coordinates *Coordinates) {
	coordinates.X = c.X + coordinates.X
	coordinates.Y = c.Y + coordinates.Y
	coordinates.Z = c.Z + coordinates.Z
}

type Particle struct {
	P, V, A *Coordinates
}

func (p *Particle) Move() {
	p.A.Impact(p.V)
	p.V.Impact(p.P)
}
func (p Particle) DistanceOrigin() int {
	distance := math.Abs(float64(p.P.X)) + math.Abs(float64(p.P.Y)) + math.Abs(float64(p.P.Z))
	return int(distance)
}

type Particles struct {
	Particles []Particle
}

func NewParticles(r io.Reader) Particles {
	reader := bufio.NewReader(r)
	particles := []Particle{}
	for line, _, _ := reader.ReadLine(); line != nil; line, _, _ = reader.ReadLine() {
		rawCoord := strings.Split(string(line), ", ")
		particle := Particle{parseCoord(rawCoord[0]), parseCoord(rawCoord[1]), parseCoord(rawCoord[2])}
		particles = append(particles, particle)
	}
	return Particles{particles}
}
func parseCoord(s string) *Coordinates {
	input := s[3 : len(s)-1]
	splitted := strings.Split(input, ",")
	x, _ := strconv.Atoi(splitted[0])
	y, _ := strconv.Atoi(splitted[1])
	z, _ := strconv.Atoi(splitted[2])
	return &Coordinates{x, y, z}
}
func (ps Particles) Closest() int {
	count := 0
	lastClosest := -1
	for count < 99999 {
		minDist := -1
		closest := -1
		for i, p := range ps.Particles {
			p.Move()
			// fmt.Printf("i=%d, dist=%d\n", i, p.DistanceOrigin())
			if dist := p.DistanceOrigin(); minDist < 0 || minDist > dist {
				minDist = dist
				closest = i
			}
		}
		if closest == lastClosest {
			count++
		} else {
			lastClosest = closest
			count = 0
		}
		// fmt.Printf("Closest: %d, (p=%#v, v=%#v, a=%#v)\n", lastClosest, ps.Particles[lastClosest].P, ps.Particles[lastClosest].V, ps.Particles[lastClosest].A)
	}
	return lastClosest
}
