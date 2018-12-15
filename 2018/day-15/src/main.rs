mod position;
mod unitsinturn;
mod grid;
mod fighter;

// use std::collections::{HashMap, LinkedList, VecDeque};
use std::env;
// use std::fmt;
use std::fs;
use std::io;
// use std::io::Write;
// use std::iter::FromIterator;
// use std::ops::Index;

use grid::{Grid};


fn main() -> io::Result<()> {
    let args: Vec<String> = env::args().collect();
    if args.len() < 2 {
        panic!("a or b ?");
    }
    let mode = &args[1];

    let f = fs::read_to_string("src/input.txt")?;
    let lines: Vec<&str> = f.split("\n").collect();

    if mode == "a" {
        let outcome = exo1(&lines);
        println!("result : {:?} => {}", outcome, outcome.0 * outcome.1);
    } else if mode == "b" {
        // println!("result : {:?}", exo2("637061", 20000000));
    }

    Ok(())
}

fn exo1(input: &[&str]) -> (u32, u32) {
    let grid = Grid::new(input);
    (0, 0)
}






#[cfg(test)]
mod tests {
    // Note this useful idiom: importing names from outer (for mod tests) scope.
    use super::*;

    #[test]
    #[ignore]
    fn test_exo1() {
        let input = &vec![
            "#######",
            "#.G...#",
            "#...EG#",
            "#.#.#G#",
            "#..G#E#",
            "#.....#",
            "#######",
            ];
            assert_eq!(exo1(input), (47 , 590))
    }

}
