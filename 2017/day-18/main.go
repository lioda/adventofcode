package main

import (
	"bufio"
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

type Instr func(string, string) (*int, bool)

func (p Program) operandStringToInt(operand string) int {
	value, err := strconv.Atoi(operand)
	if err != nil {
		value = p.registers[operand]
	}
	return value
}

func (p *Program) Set(op1, op2 string) (recover *int, changedIp bool) {
	p.registers[op1] = p.operandStringToInt(op2)
	return
}
func (p *Program) Add(op1, op2 string) (recover *int, changedIp bool) {
	p.registers[op1] = p.registers[op1] + p.operandStringToInt(op2)
	return
}
func (p *Program) Mul(op1, op2 string) (recover *int, changedIp bool) {
	p.registers[op1] = p.registers[op1] * p.operandStringToInt(op2)
	return
}
func (p *Program) Mod(op1, op2 string) (recover *int, changedIp bool) {
	p.registers[op1] = p.registers[op1] % p.operandStringToInt(op2)
	return
}
func (p *Program) Jgz(op1, op2 string) (recover *int, changedIp bool) {
	cond := p.operandStringToInt(op1)
	if cond == 0 {
		return
	}
	offset := p.operandStringToInt(op2)
	p.ip = p.ip + offset
	return nil, true
}
func (p *Program) Snd(op1, op2 string) (recover *int, changedIp bool) {
	p.lastSound = p.operandStringToInt(op1)
	return
}
func (p *Program) Rcv(op1, op2 string) (recover *int, changedIp bool) {
	cond := p.operandStringToInt(op1)
	if cond == 0 {
		return
	}
	recover = &p.lastSound
	return
}

type ProgramInstr struct {
	instr Instr
	op1   string
	op2   string
}

type Program struct {
	instrs    []ProgramInstr
	registers map[string]int
	ip        int
	lastSound int
}

func (p *Program) ExecuteInstr() *int {
	instr := p.instrs[p.ip]
	result, movedIp := instr.instr(instr.op1, instr.op2)
	if !movedIp {
		p.ip++
	}
	return result
}

func (p *Program) ExecuteUntilRcv() int {
	var recover *int
	for recover = p.ExecuteInstr(); recover == nil; recover = p.ExecuteInstr() {
		// fmt.Printf("ip=%d, registers=%v, sound=%d\n", p.ip, p.registers, p.lastSound)
	}
	return *recover
}
func NewProgram(r io.Reader) *Program {
	reader := bufio.NewReader(r)
	instrs := []ProgramInstr{}
	result := Program{instrs, map[string]int{}, 0, 0}
	for line, _, _ := reader.ReadLine(); line != nil; line, _, _ = reader.ReadLine() {
		split := strings.SplitN(string(line), " ", 3)
		if len(split) < 3 {
			split = append(split, "")
		}
		var instr Instr
		switch split[0] {
		case "set":
			instr = result.Set
		case "add":
			instr = result.Add
		case "mul":
			instr = result.Mul
		case "mod":
			instr = result.Mod
		case "snd":
			instr = result.Snd
		case "rcv":
			instr = result.Rcv
		case "jgz":
			instr = result.Jgz
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
	program := NewProgram(f)
	frequency := program.ExecuteUntilRcv()
	fmt.Printf("The first frequence recovered was %d\n", frequency)
}
