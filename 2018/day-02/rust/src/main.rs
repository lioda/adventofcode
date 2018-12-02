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
        let words = find_words_with_one_difference(&ids);
        let common = common_str(words.0, words.1);
        println!("{:?}", common);
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

pub fn find_words_with_one_difference<'a>(ids: &[&'a str]) -> (&'a str, &'a str) {
    for curr in 0..ids.len() {
        let s1 = ids[curr];
        for i in curr + 1..ids.len() {
            let s2 = ids[i];
            if count_differences(s1, s2) == 1 {
                return (s1, s2);
            }
        }
    }
    ("", "")
}

fn count_differences(s1: &str, s2: &str) -> u32 {
    // println!("count_differences {}/{}", s1, s2);
    let mut count = 0;
    // for c1 in s1.chars() {
    //     for c2 in s2.chars() {
    //         println!("{}/{}", c1, c2);
    //         if !c1.eq(&c2) {
    //             count += 1;
    //         }
    //     }
    // }

    // let chars1 = s1.chars();
    // let chars2 = s2.chars();
    for i in 0..s1.len() {
        if !s1.chars().nth(i).eq(&s2.chars().nth(i)) {
            // println!("{:?}/{:?}", s1.chars().nth(i), s2.chars().nth(i));
            count += 1;
        }
    }
    // println!("{}/{} => {}", s1, s2, count);
    count
}

pub fn common_str <'a>(s1: &'a str, s2: &'a str) -> String {
    let mut result = String::new();
    for i in 0..s1.len() {
        if s1.chars().nth(i).eq(&s2.chars().nth(i)) {
            result .push( s1.chars().nth(i).unwrap());
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

    #[test]
    fn test_find_words_with_one_difference() {
        assert_eq!(
            find_words_with_one_difference(&[
                "abcde", "fghij", "klmno", "pqrst", "fguij", "axcye", "wvxyz"
            ]),
            ("fghij", "fguij")
        );
    }

    #[test]
    fn test_common_str() {
        assert_eq!(
            common_str("fghij", "fguij"),
            "fgij"
        );
    }
}
