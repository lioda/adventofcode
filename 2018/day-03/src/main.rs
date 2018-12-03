extern crate regex;

use regex::Regex;
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
    let lines: Vec<&str> = f.split("\n").collect();

    if mode == "a" {
        println!("{}", compute_squares_inches(&lines));
    } else if mode == "b" {

    }

    Ok(())
}

#[derive(Debug)]
struct Rectangle {
    left: u32,
    top: u32,
    width: u32,
    height: u32,
}

impl std::cmp::PartialEq for Rectangle {
    fn eq(&self, other: &Rectangle) -> bool {
        self.left == other.left
            && self.top == other.top
            && self.width == other.width
            && self.height == other.height
    }
}

impl Rectangle {
    fn points(self: &Rectangle) -> Vec<(u32, u32)> {
        let mut result = vec![];
        for y in self.top..self.top + self.height {
            for x in self.left..self.left + self.width {
                result.push((x, y));
            }
        }

        result
    }
}

fn build_rectangle(line: &str) -> Rectangle {
    let re = Regex::new("([0-9]+),([0-9]+): ([0-9]+)x([0-9]+)").expect("build_rectangle");
    let c = re.captures(line);
    if c.is_none() {
        println!("{:?}", line);
    }
    let captures = c.expect("build_rectangle a");

    let left_str = captures.get(1).expect("build_rectangle b").as_str();
    let top_str = captures.get(2).expect("build_rectangle c").as_str();
    let width_str = captures.get(3).expect("build_rectangle d").as_str();
    let height_str = captures.get(4).expect("build_rectangle e").as_str();
    Rectangle {
        left: u32::from_str_radix(left_str, 10).expect("build_rectangle f"),
        top: u32::from_str_radix(top_str, 10).expect("build_rectangle g"),
        width: u32::from_str_radix(width_str, 10).expect("build_rectangle h"),
        height: u32::from_str_radix(height_str, 10).expect("build_rectangle i"),
    }
}

pub fn compute_squares_inches(lines: &[&str]) -> u32 {
    let mut fabric: HashMap<(u32, u32), u8> = HashMap::new();
    for line in lines {
        if line.len() == 0 {
            continue;
        }
        let points = build_rectangle(line).points();
        for point in points {
            let mut value: u8 = 1;
            if fabric.contains_key(&point) {
                value = *fabric.get(&point).expect("compute_squares_inches") + 1;
            }
            fabric.insert(point, value);
        }
    }
    let mut count = 0;
    for inch in fabric.values() {
        if *inch > 1 {
            count += 1;
        }
    }

    count
}

#[cfg(test)]
mod tests {
    // Note this useful idiom: importing names from outer (for mod tests) scope.
    use super::*;

    #[test]
    fn test_compute_squares_inches() {
        assert_eq!(
            compute_squares_inches(&["#1 @ 1,3: 4x4", "#2 @ 3,1: 4x4", "#3 @ 5,5: 2x2", ""]),
            4
        );
    }
    #[test]
    fn test_build_rectangle() {
        assert_eq!(
            build_rectangle("#1 @ 1,3: 4x5"),
            Rectangle {
                left: 1,
                top: 3,
                width: 4,
                height: 5,
            }
        );
    }
    #[test]
    fn test_iter_rectangle() {
        assert_eq!(
            build_rectangle("#1 @ 1,3: 3x2").points(),
            vec!((1, 3), (2, 3), (3, 3), (1, 4), (2, 4), (3, 4))
        );
    }
}
