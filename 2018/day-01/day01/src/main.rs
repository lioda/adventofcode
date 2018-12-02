use std::io::Read;
use std::io::BufRead;
use std::io::BufReader;
use std::fs::File;
use std::env;
use std::collections::HashMap;

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
        let result = find_first_frequency_appearing_twice(&changes);
        println!("{}", result);
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

fn find_first_frequency_appearing_twice(changes: &[i32]) -> i32 {
    // println!("changes to use {:?}", changes);
    let mut found = HashMap::new();
    let mut frequency = 0;
    found.insert(frequency, true);
    for i in 0..99999999 {
        let change = changes[i % changes.len()];
        // println!("frequency {} / {} + {} => {}", i % changes.len(), frequency, change, frequency + change);
        frequency += change;
        // if frequency == 394 {
        //     println!("{} : {:?}", i, frequency);
        // }else if i % 1000 ==0{
        //     println!("{} : {:?}", i, frequency);
        // }
        if found.contains_key(&frequency)  {
            return frequency;
        }
        found.insert(frequency, true);
    }
    0
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
        assert_eq!(read_changes(&mut input.as_bytes()), [-96, 25]);
    }

    #[test]
    fn test_read_find_first_frequency_appearing_twice_looping() {
        assert_eq!(find_first_frequency_appearing_twice(&[1, -2, 3, 1]), 2);
    }

    #[test]
    fn test_read_find_first_frequency_appearing_twice_all() {
        assert_eq!(find_first_frequency_appearing_twice(&[1, -1]), 0);
        assert_eq!(find_first_frequency_appearing_twice(&[3, 3, 4, -2, -4]), 10);
        assert_eq!(find_first_frequency_appearing_twice(&[-6, 3, 8, 5, -6]), 5);
        assert_eq!(find_first_frequency_appearing_twice(&[7, 7, -2, -7, -4]), 14);

    }
}
