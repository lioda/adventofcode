package main

import (
	"strings"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestParseInput(t *testing.T) {
	particles := NewParticles(strings.NewReader(`p=<3,0,0>, v=<2,0,0>, a=<-1,0,0>
p=<4,0,0>, v=<0,0,0>, a=<-2,0,0>
`))
	assert.Equal(t, Particle{P: &Coordinates{3, 0, 0}, V: &Coordinates{2, 0, 0}, A: &Coordinates{-1, 0, 0}}, particles.Particles[0])
	assert.Equal(t, Particle{P: &Coordinates{4, 0, 0}, V: &Coordinates{0, 0, 0}, A: &Coordinates{-2, 0, 0}}, particles.Particles[1])
}
func TestMovement(t *testing.T) {
	particle := NewParticles(strings.NewReader(`p=<3,0,0>, v=<2,0,0>, a=<-1,0,0>
`)).Particles[0]
	assert.Equal(t, Particle{P: &Coordinates{3, 0, 0}, V: &Coordinates{2, 0, 0}, A: &Coordinates{-1, 0, 0}}, particle)
	particle.Move()
	assert.Equal(t, Particle{P: &Coordinates{4, 0, 0}, V: &Coordinates{1, 0, 0}, A: &Coordinates{-1, 0, 0}}, particle)
	particle.Move()
	assert.Equal(t, Particle{P: &Coordinates{4, 0, 0}, V: &Coordinates{0, 0, 0}, A: &Coordinates{-1, 0, 0}}, particle)
	particle.Move()
	assert.Equal(t, Particle{P: &Coordinates{3, 0, 0}, V: &Coordinates{-1, 0, 0}, A: &Coordinates{-1, 0, 0}}, particle)
}
func TestDistanceOrigin(t *testing.T) {
	particle := NewParticles(strings.NewReader(`p=<3,0,0>, v=<2,0,0>, a=<-5,1,2>
`)).Particles[0]
	assert.Equal(t, 3, particle.DistanceOrigin())
	particle.Move()
	assert.Equal(t, 3, particle.DistanceOrigin())
	particle.Move()
	assert.Equal(t, 17, particle.DistanceOrigin())
	particle.Move()
	assert.Equal(t, 39, particle.DistanceOrigin())
}
func TestClosest(t *testing.T) {
	particles := NewParticles(strings.NewReader(`p=<3,0,0>, v=<2,0,0>, a=<-1,0,0>
p=<4,0,0>, v=<0,0,0>, a=<-2,0,0>
`))
	assert.Equal(t, 0, particles.Closest())
}
func TestCollides(t *testing.T) {
	particles := NewParticles(strings.NewReader(`p=<-6,0,0>, v=<3,0,0>, a=<0,0,0>
p=<-4,0,0>, v=<2,0,0>, a=<0,0,0>
p=<-2,0,0>, v=<1,0,0>, a=<0,0,0>
p=<3,0,0>, v=<-1,0,0>, a=<0,0,0>
`))
	assert.Equal(t, 1, particles.Collides())
}
