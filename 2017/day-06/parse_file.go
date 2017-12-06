package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
	"strconv"
)

func ParseFile(name string) (result []int) {
	f, _ := os.Open(name)
	reader := bufio.NewReader(f)
	bytes, _, _ := reader.ReadLine()
	r, _ := regexp.Compile("([-0-9]*)")
	// fmt.Printf("%q\n", r.FindAllStringSubmatch(token, -1))
	strings := r.FindAllString(string(bytes), -1)
	fmt.Printf("%v\n", strings)
	result = make([]int, len(strings))
	for i, s := range strings {
		result[i], _ = strconv.Atoi(s)
	}
	return
}
