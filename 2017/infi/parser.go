package main

import (
	"bufio"
	"errors"
	"io"
)

type Parser struct {
	Input  io.Reader
	parser *bufio.Scanner
}

func (p *Parser) Next() string {
	if p.parser == nil {
		p.parser = bufio.NewScanner(p.Input)
		p.parser.Split(func(data []byte, atEOF bool) (advance int, token []byte, err error) {
			if atEOF {
				return advance, token, errors.New("end of file")
			}
			parsingLimit := "]"
			advance = 0
			result := ""
			for read := ""; read != parsingLimit; {
				if advance >= len(data) {
					return 0, nil, nil
				}
				ad, t, _ := bufio.ScanRunes(data[advance:], atEOF)
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
	result := p.parser.Text()
	return result
}
