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

fn exo1(input: &[&str]) -> (i32, i32) {
    let mut grid = Grid::new(input);
    grid.display();
    let mut breaker = 0;

    while grid.is_playable() &&  breaker < 200 {
        grid.start_turn();
        while let Some(unit) = grid.next_unit_to_play() {
            if grid.can_attack(&unit) {
                grid.do_attack(&unit);
            }else {
                let goto = grid.find_move_step(&unit);
                grid.move_unit_from_to(&unit, &goto);
            }
            // break;
        }
        breaker += 1;
        println!("===================== step {:?}", breaker);
        grid.display();
    }

    (breaker-1, grid.hp_left())
}






#[cfg(test)]
mod tests {
    // Note this useful idiom: importing names from outer (for mod tests) scope.
    use super::*;

    #[test]
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
