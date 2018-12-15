mod fighter;
mod grid;
mod position;
mod unitsinturn;

// use std::collections::{HashMap, LinkedList, VecDeque};
use std::env;
// use std::fmt;
use std::fs;
use std::io;
// use std::io::Write;
// use std::iter::FromIterator;
// use std::ops::Index;

use grid::Grid;

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

fn exo1(input: &[&str]) -> (i32, i32, i32) {
    let mut grid = Grid::new(input);
    // grid.display();
    let max = 5000;
    let mut breaker = 0;

    while grid.is_playable() && breaker < max {
        println!("===================== after {:?}", breaker);
        if breaker % 10 == 0 || breaker == 76 {
            grid.display();
        }
        grid.start_turn();
        let mut will_attack = Vec::new();
        while let Some(unit) = grid.next_unit_to_play() {
            if grid.can_attack(&unit) {
                // println!("will attack {:?}", unit);
                will_attack.push(unit);
            } else {
                let goto = grid.find_move_step(&unit);
                if goto.is_some() {
                    let goto = goto.expect("move to do");
                    grid.move_unit_from_to(&unit, &goto);
                    if grid.can_attack(&goto) {
                        //grid.do_attack(&goto);
                        will_attack.push(goto);
                    }
                }
            }
            // break;
        }

        // println!("will attack => {:?}", will_attack);
        let mut incomplete = false;
        for attacker in will_attack {
            if !grid.can_attack(&attacker) {
                // target is already dead
                // println!("{:?} cannot attack, already dead", attacker);
                if !grid.is_playable() {
                    // println!("incomplete turn {:?}", breaker);
                    incomplete = true;
                    break;
                }
                continue;
            }
            grid.do_attack(&attacker);
        }

        if !incomplete {
            breaker += 1;
        }
    }

    println!("==============END=========");
    grid.display();
    (breaker, grid.hp_left(), breaker * grid.hp_left())
}

#[cfg(test)]
mod tests {
    // Note this useful idiom: importing names from outer (for mod tests) scope.
    use super::*;

    #[test]
    fn test_exo1() {
        let input = &vec![
            "#######", //
            "#.G...#", //
            "#...EG#", //
            "#.#.#G#", //
            "#..G#E#", //
            "#.....#", //
            "#######", //
        ];
        assert_eq!(exo1(input), (47, 590, 27730))
    }

    #[test]
    fn test_exo1_2() {
        let input = &vec![
            "#######", //
            "#G..#E#", //
            "#E#E.E#", //
            "#G.##.#", //
            "#...#E#", //
            "#...E.#", //
            "#######", //
        ];
        assert_eq!(exo1(input), (37, 982, 36334))
    }
    #[test]
    #[ignore]
    fn test_exo1_3() {
        let input = &vec![
            "#######", //
            "#E..EG#", //
            "#.#G.E#", //
            "#E.##E#", //
            "#G..#.#", //
            "#..E#.#", //
            "#######", //
        ];
        assert_eq!(exo1(input), (46, 859, 39514))
    }

    #[test]
    fn test_exo1_4() {
        let input = &vec![
            "#######", //
            "#E.G#.#", //
            "#.#G..#", //
            "#G.#.G#", //
            "#G..#.#", //
            "#...E.#", //
            "#######", //
        ];
        assert_eq!(exo1(input), (35, 793, 27755))
    }
    #[test]
    fn test_exo1_5() {
        let input = &vec![
            "#######", //
            "#.E...#", //
            "#.#..G#", //
            "#.###.#", //
            "#E#G#G#", //
            "#...#G#", //
            "#######", //
        ];
        assert_eq!(exo1(input), (54, 536, 28944))
    }
    #[test]
    fn test_exo1_6() {
        let input = &vec![
            "#########", //
            "#G......#", //
            "#.E.#...#", //
            "#..##..G#", //
            "#...##..#", //
            "#...#...#", //
            "#.G...G.#", //
            "#.....G.#", //
            "#########", //
        ];
        assert_eq!(exo1(input), (20, 937, 18740))
    }

}
