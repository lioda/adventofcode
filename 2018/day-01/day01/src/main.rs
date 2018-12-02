use std::io::Read;
use std::io::BufRead;
use std::io::BufReader;
use std::fs::File;
use std::env;

fn main() {
    let args: Vec<String> = env::args().collect();
    if args.len() < 2 {
        panic!("a or b ?");
    }

    let mode = &args[1];

    let open = File::open("src/input.txt");
    if open.is_err() {
        panic!("file not found");
    }
    let mut f = open.unwrap();
    let changes = read_changes(&mut f);
    if mode == "a" {
        let result = apply_on_0(&changes);
        println!("{}", result);
    } else if mode == "b" {
        
    }
}

fn apply_on_0(changes: &[i32]) -> i32 {
    let mut result = 0;
    for change in changes.iter() {
        result += change;
    }
    result
}

fn read_changes<'a>(input: &'a mut Read) -> Vec<i32> {
    let buf = BufReader::new(input);
    let mut result = Vec::new();
    for line in buf.lines() {
        result.push(i32::from_str_radix(&line.unwrap(), 10).unwrap());
    }
    result
}

#[cfg(test)]
mod tests {
    // Note this useful idiom: importing names from outer (for mod tests) scope.
    use super::*;

    #[test]
    fn test_apply_on_0() {
        assert_eq!(apply_on_0(&[-5, 4, -9]), -10);
    }

    #[test]
    fn test_read_changes() {
        let input = "-96\n+25";
        // let i = Read.for(input.as_bytes())
        assert_eq!(read_changes(&mut input.as_bytes()), [-96, 25]);
    }
}
