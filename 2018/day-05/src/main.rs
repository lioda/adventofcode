use std::env;
use std::fs;
use std::io;

fn main() -> io::Result<()> {
    let args: Vec<String> = env::args().collect();
    if args.len() < 2 {
        panic!("a or b ?");
    }
    let mode = &args[1];

    let input = fs::read_to_string("src/input.txt")?;

    if mode == "a" {
        println!("{:?}", full_reaction(&input));
    } else if mode == "b" {
        println!("{:?}", find_shortest_react(&input));
    }

    Ok(())
}

fn full_reaction(input: &str) -> u32 {
    let mut polys = (String::from(input), 1);
    while polys.1 > 0 {
        polys = reacting_polymers(&polys.0);
    }
    polys.0.len() as u32 - 1
}

fn reacting_polymers(input: &str) -> (String, u32) {
    let mut out = String::new();
    let mut count = 0;
    let mut last_char: char = 0 as char;

    for c in input.chars() {
        if c != last_char
            && (c == last_char.to_ascii_lowercase() || c == last_char.to_ascii_uppercase())
        {
            last_char = 0 as char;
            count += 1;
        } else {
            if last_char != 0 as char {
                out.push(last_char);
            }
            last_char = c;
        }
    }
    out.push('\n');
    (out, count)
}

fn remove_and_full_reaction(remove: char, input: &str) -> String {
    let mut polys = (
        String::from(input)
            .replace(&remove.to_lowercase().to_string(), "")
            .replace(&remove.to_uppercase().to_string(), ""),
        1,
    );
    while polys.1 > 0 {
        polys = reacting_polymers(&polys.0);
    }
    polys.0
}

fn find_shortest_react(input: &str) -> u32 {
    unique_chars(input)
        .iter()
        .map(|c| remove_and_full_reaction(*c, input))
        .map(|s| s.len() - 1)
        .min()
        .expect("find min") as u32
}

fn unique_chars(input: &str) -> Vec<char> {
    let mut vec = input
        .chars()
        .map(|c| c.to_ascii_lowercase())
        .collect::<Vec<char>>();
    vec.sort();
    vec.dedup();
    vec
}

#[cfg(test)]
mod tests {
    // Note this useful idiom: importing names from outer (for mod tests) scope.
    use super::*;

    #[test]
    fn test_reacting_polymers() {
        assert_eq!(
            reacting_polymers("dabAcCaCBAcCcaDA\n"),
            (String::from("dabAaCBAcaDA\n"), 2)
        );
    }
    #[test]
    fn test_reacting_polymers_no_match() {
        assert_eq!(reacting_polymers("aabAAB\n"), (String::from("aabAAB\n"), 0));
    }
    #[test]
    fn test_full_reaction() {
        assert_eq!(full_reaction("dabAcCaCBAcCcaDA\n"), 10);
    }
    #[test]
    fn test_remove_and_full_react() {
        assert_eq!(
            remove_and_full_reaction('a', "dabAcCaCBAcCcaDA\n"),
            String::from("dbCBcD\n")
        );
        assert_eq!(
            remove_and_full_reaction('b', "dabAcCaCBAcCcaDA\n"),
            String::from("daCAcaDA\n")
        );
        assert_eq!(
            remove_and_full_reaction('c', "dabAcCaCBAcCcaDA\n"),
            String::from("daDA\n")
        );
        assert_eq!(
            remove_and_full_reaction('d', "dabAcCaCBAcCcaDA\n"),
            String::from("abCBAc\n")
        );
    }

    #[test]
    fn test_find_shortest_react() {
        assert_eq!(find_shortest_react("dabAcCaCBAcCcaDA\n"), 4);
    }
}
