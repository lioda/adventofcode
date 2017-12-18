package main

import (
	"bufio"
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

type Chan struct {
	id    string
	queue []int64
}

func (c *Chan) Get() (int64, bool) {
	if len(c.queue) == 0 {
		return 0, false
	}
	result := c.queue[0]
	c.queue = c.queue[1:]
	// fmt.Printf("Get %s => %d (%v)\n", c.id, result, c.queue)
	return result, true
}
func (c *Chan) Put(value int64) {
	c.queue = append(c.queue, value)
	// fmt.Printf("Put %s => %v\n", c.id, c.queue)
}

type Instr func(string, string) (bool, bool)

func (p Program) operandStringToInt(operand string) int64 {
	value, err := strconv.Atoi(operand)
	result := int64(value)
	if err != nil {
		result = p.registers[operand]
	}
	return result
}

func (p *Program) Set(op1, op2 string) (executed bool, changedIp bool) {
	p.registers[op1] = p.operandStringToInt(op2)
	return true, false
}
func (p *Program) Add(op1, op2 string) (executed bool, changedIp bool) {
	p.registers[op1] = p.registers[op1] + p.operandStringToInt(op2)
	return true, false
}
func (p *Program) Mul(op1, op2 string) (executed bool, changedIp bool) {
	p.registers[op1] = p.registers[op1] * p.operandStringToInt(op2)
	return true, false
}
func (p *Program) Mod(op1, op2 string) (executed bool, changedIp bool) {
	p.registers[op1] = p.registers[op1] % p.operandStringToInt(op2)
	return true, false
}
func (p *Program) Jgz(op1, op2 string) (executed bool, changedIp bool) {
	// if op1 == "1" {
	// 	fmt.Printf("GARGL\n")
	// }
	cond := p.operandStringToInt(op1)
	if cond <= 0 {
		return true, false
	}
	offset := p.operandStringToInt(op2)
	p.ip = p.ip + int(offset)
	return true, true
}
func (p *Program) Snd(op1, op2 string) (executed bool, changedIp bool) {
	// p.lastSound = p.operandStringToInt(op1)
	value := p.operandStringToInt(op1)
	p.chanOut.Put(value)
	p.count++
	return true, false
}
func (p *Program) Rcv(op1, op2 string) (executed bool, changedIp bool) {
	// cond := p.operandStringToInt(op1)
	// if cond == 0 {
	// 	return
	// }
	// recover = &p.lastSound
	if value, get := p.chanIn.Get(); get {
		p.registers[op1] = value
		return true, false
	}
	return false, false
}

type ProgramInstr struct {
	instr  Instr
	opcode string
	op1    string
	op2    string
}

type Programs struct {
	Program0, Program1 *Program
}

type Program struct {
	id        int
	instrs    []ProgramInstr
	registers map[string]int64
	ip        int
	// lastSound int
	count   int
	chanIn  *Chan
	chanOut *Chan
}

func (p *Program) ExecuteInstrs() bool {
	result := false
	for p.ExecuteInstr() {
		result = true
	}
	// if result {
	// fmt.Printf("%s: %d ; %s: %d -- %d -- %v\n", p.chanIn.id, len(p.chanIn.queue), p.chanOut.id, len(p.chanOut.queue), p.count, p.registers)
	// }
	return result
}
func (p *Program) ExecuteInstr() bool {
	if p.ip >= len(p.instrs) {
		// fmt.Printf("GLOUPS")
		return false
	}
	instr := p.instrs[p.ip]
	// fmt.Printf("p%d => %v [%v]\n", p.id, instr, p.registers)
	result, movedIp := instr.instr(instr.op1, instr.op2)
	// fmt.Printf("    => %t / %t\n", result, movedIp)
	if result && !movedIp {
		p.ip++
	}
	// if p.id == 0 {
	// fmt.Printf("%s: %d ; %s: %d -- %d\n", p.chanIn.id, len(p.chanIn.queue), p.chanOut.id, len(p.chanOut.queue), p.count)
	// }
	return result
}

func (p *Programs) ExecuteUntilDeadlock() int {
	// var recover bool
	// for recover = p.ExecuteInstr(); recover == nil; recover = p.ExecuteInstr() {
	// 	// fmt.Printf("ip=%d, registers=%v, sound=%d\n", p.ip, p.registers, p.lastSound)
	// }
	max := 100000
	i := 0
	for (p.Program0.ExecuteInstrs() || p.Program1.ExecuteInstrs()) && i < max {
		i++
	}
	// return *recover
	return p.Program1.count
}
func NewPrograms(r io.Reader) Programs {
	chan0 := new(Chan)
	chan0.id = "1 -> 0"
	chan1 := new(Chan)
	chan1.id = "0 -> 1"
	reader := bufio.NewReader(r)
	instr0s := []ProgramInstr{}
	instr1s := []ProgramInstr{}
	program0 := Program{0, instr0s, map[string]int64{"p": 0}, 0, 0, chan0, chan1}
	program1 := Program{1, instr1s, map[string]int64{"p": 1}, 0, 0, chan1, chan0}
	for line, _, _ := reader.ReadLine(); line != nil; line, _, _ = reader.ReadLine() {
		split := strings.SplitN(string(line), " ", 3)
		if len(split) < 3 {
			split = append(split, "")
		}
		var instr0 Instr
		var instr1 Instr
		switch split[0] {
		case "set":
			instr0 = program0.Set
			instr1 = program1.Set
		case "add":
			instr0 = program0.Add
			instr1 = program1.Add
		case "mul":
			instr0 = program0.Mul
			instr1 = program1.Mul
		case "mod":
			instr0 = program0.Mod
			instr1 = program1.Mod
		case "snd":
			instr0 = program0.Snd
			instr1 = program1.Snd
		case "rcv":
			instr0 = program0.Rcv
			instr1 = program1.Rcv
		case "jgz":
			instr0 = program0.Jgz
			instr1 = program1.Jgz
		default:
			continue
		}
		instr0s = append(instr0s, ProgramInstr{instr0, split[0], split[1], split[2]})
		instr1s = append(instr1s, ProgramInstr{instr1, split[0], split[1], split[2]})
	}
	program0.instrs = instr0s
	program1.instrs = instr1s
	return Programs{&program0, &program1}
}

func main() {
	f, _ := os.Open("input.txt")
	programs := NewPrograms(f)
	result := programs.ExecuteUntilDeadlock()
	fmt.Printf("The program1 sent %d values\n", result)
}
