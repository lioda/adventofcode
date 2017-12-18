package main

import (
	"strings"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestProgramExecuteUntilDeadlock(t *testing.T) {
	input := `snd 1
snd 2
snd p
rcv a
rcv b
rcv c
rcv d
`
	programs := NewPrograms(strings.NewReader(input))
	assert.Equal(t, 3, programs.ExecuteUntilDeadlock())
}

// var instr Instr
//
// func TestInstrSet(t *testing.T) {
// 	program := NewProgram(strings.NewReader(`set a 2`))
// 	program.ExecuteInstr()
// 	assert.Equal(t, 2, program.registers["a"])
// 	program = NewProgram(strings.NewReader(`set b 3
// set a b`))
// 	program.ExecuteInstr()
// 	program.ExecuteInstr()
// 	assert.Equal(t, 3, program.registers["a"])
// }
// func TestInstrAdd(t *testing.T) {
// 	program := NewProgram(strings.NewReader(`add a 2
// add a 6
// set b 8
// add a b`))
// 	program.ExecuteInstr()
// 	program.ExecuteInstr()
// 	program.ExecuteInstr()
// 	program.ExecuteInstr()
// 	assert.Equal(t, 16, program.registers["a"])
// }
// func TestInstrMul(t *testing.T) {
// 	program := NewProgram(strings.NewReader(`set a 7
// mul a 2
// set b 8
// mul a b`))
// 	program.ExecuteInstr()
// 	program.ExecuteInstr()
// 	program.ExecuteInstr()
// 	program.ExecuteInstr()
// 	assert.Equal(t, 112, program.registers["a"])
// }
// func TestInstrMod(t *testing.T) {
// 	program := NewProgram(strings.NewReader(`set a 7
// mod a 2`))
// 	program.ExecuteInstr()
// 	program.ExecuteInstr()
// 	assert.Equal(t, 1, program.registers["a"])
// 	////////////////////
// 	program = NewProgram(strings.NewReader(`set a 7
// set b 4
// mod a b`))
// 	program.ExecuteInstr()
// 	program.ExecuteInstr()
// 	program.ExecuteInstr()
// 	assert.Equal(t, 3, program.registers["a"])
// }
//
// func TestInstrSnd(t *testing.T) {
// 	program := NewProgram(strings.NewReader(`snd 8`))
// 	program.ExecuteInstr()
// 	assert.Equal(t, 8, program.lastSound)
// 	////////////////
// 	program = NewProgram(strings.NewReader(`set a 1
// snd a`))
// 	program.ExecuteInstr()
// 	program.ExecuteInstr()
// 	assert.Equal(t, 1, program.lastSound)
// }
//
// func TestInstrRcv(t *testing.T) {
// 	program := NewProgram(strings.NewReader(`snd 8
// rcv 1`))
// 	program.ExecuteInstr()
// 	recover := program.ExecuteInstr()
// 	assert.Equal(t, 8, *recover)
// 	///////////////////
// 	program = NewProgram(strings.NewReader(`snd 8
// rcv 0`))
// 	program.ExecuteInstr()
// 	recover = program.ExecuteInstr()
// 	assert.Nil(t, recover)
// 	///////////////////
// 	program = NewProgram(strings.NewReader(`set a 1
// snd 7
// rcv a`))
// 	program.ExecuteInstr()
// 	program.ExecuteInstr()
// 	recover = program.ExecuteInstr()
// 	assert.Equal(t, 7, *recover)
// 	///////////////////
// 	program = NewProgram(strings.NewReader(`set a 0
// snd 7
// rcv a`))
// 	program.ExecuteInstr()
// 	program.ExecuteInstr()
// 	recover = program.ExecuteInstr()
// 	assert.Nil(t, recover)
// }
// func TestInstrJgz(t *testing.T) {
// 	program := NewProgram(strings.NewReader(`jgz 8 2
// set a 5
// set a 9`))
// 	program.ExecuteInstr()
// 	program.ExecuteInstr()
// 	assert.Equal(t, 9, program.registers["a"])
// 	///////////////////
// 	program = NewProgram(strings.NewReader(`jgz 0 2
// set a 5
// set a 9`))
// 	program.ExecuteInstr()
// 	program.ExecuteInstr()
// 	assert.Equal(t, 5, program.registers["a"])
// 	///////////////////
// 	program = NewProgram(strings.NewReader(`set a 6
// jgz a 2
// set a 5
// set a 9`))
// 	program.ExecuteInstr()
// 	program.ExecuteInstr()
// 	program.ExecuteInstr()
// 	assert.Equal(t, 9, program.registers["a"])
// 	///////////////////
// 	program = NewProgram(strings.NewReader(`set a 0
// jgz a 2
// set a 5
// set a 9`))
// 	program.ExecuteInstr()
// 	program.ExecuteInstr()
// 	program.ExecuteInstr()
// 	assert.Equal(t, 5, program.registers["a"])
// 	///////////////////
// 	program = NewProgram(strings.NewReader(`add a -1
// jgz a -1
// set a 5
// set a 9`))
// 	program.ExecuteInstr()
// 	program.ExecuteInstr()
// 	program.ExecuteInstr()
// 	assert.Equal(t, -2, program.registers["a"])
// 	///////////////////
// }
