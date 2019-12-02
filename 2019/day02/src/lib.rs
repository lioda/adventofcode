pub fn exo01(code: &str, replace: bool) -> usize {
    let mut memory: Vec<usize> = code
        .split(",")
        .map(|s| usize::from_str_radix(s, 10).unwrap())
        .collect();
    if replace {
        memory[1] = 12;
        memory[2] = 2;
    }
    let mut done = false;
    let mut pc: usize = 0;
    while !done {
        let opcode = memory[pc];
        if opcode == 99 {
            done = true;
        } else if opcode == 1 {
            let mem_a = memory[pc + 1];
            let mem_b = memory[pc + 2];
            let result = memory[mem_a] + memory[mem_b];
            let mem_dest = memory[pc + 3];
            memory[mem_dest] = result;
            pc += 4;
        } else if opcode == 2 {
            let mem_a = memory[pc + 1];
            let mem_b = memory[pc + 2];
            let result = memory[mem_a] * memory[mem_b];
            let mem_dest = memory[pc + 3];
            memory[mem_dest] = result;
            pc += 4;
        } else {
            panic!(format!("opcode unknown: <{}>", opcode));
        }
    }
    memory[0]
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::fs::File;
    use std::io::prelude::*;
    use std::io::BufReader;

    fn read_input() -> String {
        let file = File::open("src/input.txt").unwrap();
        let mut buf_reader = BufReader::new(file);
        let mut contents = String::new();
        buf_reader.read_to_string(&mut contents).unwrap();
        contents.clone()
    }

    #[test]
    fn it_works() {
        assert_eq!(2 + 2, 4);
    }

    #[test]
    fn it_can_add_and_stop() {
        let pos0 = exo01("1,5,6,0,99,3,4", false);
        assert_eq!(pos0, 7);
    }

    #[test]
    fn it_can_mult_and_stop() {
        let pos0 = exo01("2,5,6,0,99,3,4", false);
        assert_eq!(pos0, 12);
    }

    #[test]
    fn it_add_and_mult() {
        let pos0 = exo01("1,9,10,3,2,3,11,0,99,30,40,50", false);
        assert_eq!(pos0, 3500);
        let pos0 = exo01("1,1,1,4,99,5,6,0,99", false);
        assert_eq!(pos0, 30);
    }

    #[test]
    fn do_exo01() {
        let input = read_input();
        assert_eq!(exo01(&input, true), 4930687);
    }
}
