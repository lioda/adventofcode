use std::collections::HashMap;
use std::env;
use std::fs;
use std::io;

fn main() -> io::Result<()> {
    let args: Vec<String> = env::args().collect();
    if args.len() < 2 {
        panic!("a or b ?");
    }
    let mode = &args[1];

    let f = fs::read_to_string("src/input.txt")?;
    let ids: Vec<&str> = f.split("\n").collect();

    if mode == "a" {
        let result = checksum(&ids);
        println!("{}", result);
    } else if mode == "b" {

    }

    Ok(())
}

pub fn checksum(ids: &[&str]) -> u32 {
    let mut twos = 0;
    let mut threes = 0;

    for id in ids {
        let mult = has_letter_mult(id);
        twos += mult.0;
        threes += mult.1;
    }

    twos * threes
}

fn has_letter_mult(id: &str) -> (u32, u32) {
    let mut occurences = HashMap::new();
    for c in id.chars() {
        if !occurences.contains_key(&c) {
            occurences.insert(c, 1);
        } else {
            let new_value = occurences[&c] + 1;
            occurences.insert(c, new_value);
        }
    }

    let mut result = (0, 0);
    for (_, occ) in occurences {
        if occ == 2 {
            result = (1, result.1);
        }
        if occ == 3 {
            result = (result.0, 1);
        }
    }

    result
}

#[cfg(test)]
mod tests {
    // Note this useful idiom: importing names from outer (for mod tests) scope.
    use super::*;

    #[test]
    fn test_checksum() {
        assert_eq!(
            checksum(&["abcdef", "bababc", "abbcde", "abcccd", "aabcdd", "abcdee", "ababab"]),
            12
        );
    }

}
