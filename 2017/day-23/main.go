package main

import (
	"bufio"
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

type Instr func(string, string) bool

func (p Program) operandStringToInt(operand string) int {
	value, err := strconv.Atoi(operand)
	if err != nil {
		value = p.registers[operand]
	}
	return value
}

func (p *Program) Set(op1, op2 string) (changedIp bool) {
	p.registers[op1] = p.operandStringToInt(op2)
	return
}
func (p *Program) Sub(op1, op2 string) (changedIp bool) {
	p.registers[op1] = p.registers[op1] - p.operandStringToInt(op2)
	return
}
func (p *Program) Mul(op1, op2 string) (changedIp bool) {
	p.registers[op1] = p.registers[op1] * p.operandStringToInt(op2)
	p.mulCounter++
	return
}
func (p *Program) Jnz(op1, op2 string) (changedIp bool) {
	cond := p.operandStringToInt(op1)
	if cond == 0 {
		return
	}
	offset := p.operandStringToInt(op2)
	p.ip = p.ip + offset
	return true
}

type ProgramInstr struct {
	instr Instr
	op1   string
	op2   string
}

type Program struct {
	instrs     []ProgramInstr
	registers  map[string]int
	ip         int
	lastSound  int
	mulCounter int
}

func (p *Program) ExecuteInstr() bool {
	if p.ip >= len(p.instrs) {
		return false
	}
	instr := p.instrs[p.ip]
	movedIp := instr.instr(instr.op1, instr.op2)
	if !movedIp {
		p.ip++
	}
	return true
}

func (p *Program) ExecuteUntilEnd() int {
	for executed := p.ExecuteInstr(); executed; executed = p.ExecuteInstr() {
		// fmt.Printf("ip=%d, registers=%v, sound=%d\n", p.ip, p.registers, p.lastSound)
	}
	return p.mulCounter
}
func NewProgram(r io.Reader) *Program {
	reader := bufio.NewReader(r)
	instrs := []ProgramInstr{}
	result := Program{instrs, map[string]int{}, 0, 0, 0}
	for line, _, _ := reader.ReadLine(); line != nil; line, _, _ = reader.ReadLine() {
		split := strings.SplitN(string(line), " ", 3)
		if len(split) < 3 {
			split = append(split, "")
		}
		var instr Instr
		switch split[0] {
		case "set":
			instr = result.Set
		case "sub":
			instr = result.Sub
		case "mul":
			instr = result.Mul
		case "jnz":
			instr = result.Jnz
		default:
			continue
		}
		instrs = append(instrs, ProgramInstr{instr, split[1], split[2]})
	}
	result.instrs = instrs
	return &result
}

func main() {
	f, _ := os.Open("input.txt")
	p := NewProgram(f)
	fmt.Printf("Mul has been called %d times\n", p.ExecuteUntilEnd())
}
