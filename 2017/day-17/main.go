package main

import "fmt"

type CircularBuffer struct {
	buf     []int
	current int
}

func (buf CircularBuffer) Current() int {
	return buf.buf[buf.current]
}
func (buf CircularBuffer) Next() int {
	if buf.current == len(buf.buf)-1 {
		return buf.buf[0]
	}
	return buf.buf[buf.current+1]
}
func (buf *CircularBuffer) StepAndInsert(step int, insert int) int {
	buf.current = ((buf.current + step) % len(buf.buf)) + 1
	newBuf := make([]int, len(buf.buf)+1)
	copy(newBuf, buf.buf[0:buf.current])
	newBuf[buf.current] = insert
	if len(buf.buf) > 1 {
		copy(newBuf[buf.current+1:], buf.buf[buf.current:])
	}
	buf.buf = newBuf
	return buf.Next()
}
func (buf *CircularBuffer) StepAndInsert2(step int, insert int) {
	buf.current = ((buf.current + step) % len(buf.buf)) + 1
	if buf.current != 1 {
		buf.buf = append(buf.buf, insert)
		return
	}
	newBuf := make([]int, len(buf.buf)+1)
	copy(newBuf, buf.buf[0:buf.current])
	newBuf[buf.current] = insert
	if len(buf.buf) > 1 {
		copy(newBuf[buf.current+1:], buf.buf[buf.current:])
	}
	buf.buf = newBuf
}
func NewCircularBuffer() *CircularBuffer {
	return &CircularBuffer{[]int{0}, 0}
}

type Spinlock struct {
	steps int
	buf   *CircularBuffer
}

func NewSpinlock(steps int, buf *CircularBuffer) *Spinlock {
	return &Spinlock{steps, buf}
}

func (s Spinlock) SpinUntil(last int) int {
	for i := 1; i <= last; i++ {
		if i%10000 == 0 {
			fmt.Printf("%d\n", i)
		}
		s.buf.StepAndInsert(s.steps, i)
		if s.buf.current == 1 {
			fmt.Printf("inserted in 1: %d (%d)\n", i, len(s.buf.buf))
		}
	}
	return s.buf.Next()
}
func (s Spinlock) SpinUntil2(last int) int {
	for i := 1; i <= last; i++ {
		if i%10000 == 0 {
			fmt.Printf("%d\n", i)
		}
		s.buf.StepAndInsert2(s.steps, i)
		if s.buf.current == 1 {
			fmt.Printf("inserted in 1: %d (%d)\n", i, len(s.buf.buf))
		}
	}
	return s.buf.buf[1]
}

func main() {
	buf := NewCircularBuffer()
	spinlock := NewSpinlock(303, buf)
	// after := spinlock.spinUntil(2017)
	// fmt.Printf("Value after 2017 is %d\n", after)
	after := spinlock.SpinUntil2(50000000)
	fmt.Printf("Value after 50000000 is %d\n", after)
}
