package main

import (
	"bufio"
	"fmt"
	"os"
	"reflect"
	"regexp"
	"strconv"
)

type Cpu struct {
	Registers map[string]int
}

func (cpu *Cpu) Process(instr string) {
	re := regexp.MustCompile("([a-z]+) (inc|dec) ([-0-9]+) if ([a-z]+) (<|>|<=|>=|==|!=) ([-0-9]+)")
	parsed := re.FindAllStringSubmatch(instr, -1)
	// fmt.Printf("%v\n", parsed[0])
	destReg := parsed[0][1]
	destOp := parsed[0][2]
	destOperand, _ := strconv.Atoi(parsed[0][3])
	srcReg := parsed[0][4]
	srcOp := parsed[0][5]
	srcComp, _ := strconv.Atoi(parsed[0][6])
	// fmt.Printf("%s will be %s by %d, only if %s is %s than %d\n", destReg, destOp, destOperand, srcReg, srcOp, srcComp)
	if cpu.evaluateCond(srcReg, srcOp, srcComp) {
		switch destOp {
		case "inc":
			cpu.Registers[destReg] = cpu.Registers[destReg] + destOperand
		default:
			cpu.Registers[destReg] = cpu.Registers[destReg] - destOperand
		}
	}
}
func (cpu *Cpu) evaluateCond(reg string, op string, comp int) bool {
	switch op {
	case "==":
		return cpu.Registers[reg] == comp
	case "!=":
		return cpu.Registers[reg] != comp
	case "<":
		return cpu.Registers[reg] < comp
	case "<=":
		return cpu.Registers[reg] <= comp
	case ">":
		return cpu.Registers[reg] > comp
	case ">=":
		return cpu.Registers[reg] >= comp
	}
	return false
}

func (cpu Cpu) FindLargest() int {
	largest := cpu.Registers[reflect.ValueOf(cpu.Registers).MapKeys()[0].String()]
	for _, v := range cpu.Registers {
		if largest < v {
			largest = v
		}
	}
	return largest
}

func NewCpu() *Cpu {
	return &Cpu{make(map[string]int)}
}
func main() {
	cpu := NewCpu()
	f, _ := os.Open("input.txt")
	reader := bufio.NewReader(f)
	for line, _, _ := reader.ReadLine(); line != nil; line, _, _ = reader.ReadLine() {
		if string(line) == "" {
			continue
		}
		cpu.Process(string(line))
	}
	fmt.Printf("Largest value: %d\n", cpu.FindLargest())
}
