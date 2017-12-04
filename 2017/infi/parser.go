package main

import (
	"bufio"
	"errors"
	"strings"
)

type Parser struct {
	Input  string
	parser *bufio.Scanner
}

func (p *Parser) Next() string {
	if p.parser == nil {
		p.parser = bufio.NewScanner(strings.NewReader(p.Input))
		p.parser.Split(func(data []byte, atEOF bool) (advance int, token []byte, err error) {
			if atEOF {
				return advance, token, errors.New("end of file")
			}
			parsingLimit := "]"
			advance = 0
			result := ""
			for read := ""; read != parsingLimit; {
				ad, t, err := bufio.ScanRunes(data[advance:], atEOF)
				if err != nil {
					return advance, token, err
				}
				read = string(t)
				if read == "(" {
					parsingLimit = ")"
				}
				result = result + read
				advance = advance + ad
			}
			return advance, []byte(result), err
		})
	}
	if p.parser.Scan() == false {
		return "EOF"
	}
	return p.parser.Text()
}
