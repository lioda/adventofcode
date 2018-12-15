use std::collections::{HashMap, LinkedList, VecDeque};
use std::env;
use std::fmt;
use std::fs;
use std::io;
use std::io::Write;
use std::iter::FromIterator;
use std::ops::Index;

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
    (0, 0)
}

#[derive(Debug, PartialEq, Eq, Clone)]
struct Position {
    x: usize,
    y: usize,
}
impl Position {
    fn new(x: usize, y: usize) -> Position {
        Position { x: x, y: y }
    }
}

#[derive(Debug, PartialEq, Eq)]
enum Character {
    Elf,
    Gobelin,
}

impl Character {
    fn is_foe(&self, c: &Character) -> bool {
        self != c
    }
}

struct Unit {
    character: Character,
}
impl GridCell for Unit {
    fn is_wall(&self) -> bool {
        false
    }
    fn is_empty(&self) -> bool {
        false
    }
    fn is_unit(&self) -> bool {
        true
    }
}
impl Unit {
    fn new(c: Character) -> Unit {
        Unit { character: c }
    }
}

trait GridCell {
    fn is_wall(&self) -> bool;
    fn is_empty(&self) -> bool;
    fn is_unit(&self) -> bool;
}

struct Grid {
    grid: Vec<Vec<Box<GridCell>>>,
    units_in_turn: UnitsInTurn,
}

impl Grid {
    fn new(input: &[&str]) -> Grid {
        let mut grid: Vec<Vec<Box<GridCell>>> = Vec::new();
        for y in 0..input.len() {
            let mut grid_row: Vec<Box<GridCell>> = Vec::new();
            let row = input[y].to_string();
            for x in 0..row.len() {
                let cell: Box<GridCell> = match row.get(x..x + 1).expect("parse char") {
                    "#" => Box::new(Wall {}),
                    "G" => Box::new(Unit::new(Character::Gobelin)),
                    "E" => Box::new(Unit::new(Character::Elf)),
                    _ => Box::new(EmptyCell {}),
                };
                grid_row.push(cell);
            }
            grid.push(grid_row);
        }
        Grid {
            grid: grid,
            units_in_turn: UnitsInTurn::empty(),
        }
    }

    fn start_turn(&mut self) {
        let positions: Vec<Position> = self
            .grid
            .iter()
            .enumerate()
            .flat_map(|(y, row)| {
                let create_pos = move |x| Position::new(x, y);
                row.iter()
                    .enumerate()
                    .map(move |(x, cell)| match cell.is_unit() {
                        true => Some(create_pos(x)),
                        false => None,
                    })
            })
            .filter(|c| c.is_some())
            .map(|o| o.unwrap())
            .collect();
        self.units_in_turn = UnitsInTurn::new(positions);
    }

    fn next_unit_to_play(&mut self) -> Option<Position> {
        // Some(Position::new(0, 0))
        //Some(self.units_in_turn[0].clone())
        self.units_in_turn.next()
    }
}

struct Wall {}
impl GridCell for Wall {
    fn is_wall(&self) -> bool {
        true
    }
    fn is_empty(&self) -> bool {
        false
    }
    fn is_unit(&self) -> bool {
        false
    }
}
struct EmptyCell {}
impl GridCell for EmptyCell {
    fn is_wall(&self) -> bool {
        false
    }
    fn is_empty(&self) -> bool {
        true
    }
    fn is_unit(&self) -> bool {
        false
    }
}

#[derive(Debug)]
struct UnitsInTurn {
    curr: usize,
    vec: Vec<Position>,
}
impl UnitsInTurn {
    fn empty() -> UnitsInTurn {
        UnitsInTurn {
            curr: 0,
            vec: Vec::new(),
        }
    }

    fn new(vec: Vec<Position>) -> UnitsInTurn {
        UnitsInTurn { curr: 0, vec: vec }
    }

    fn next(&mut self) -> Option<Position> {
        let index = self.curr;
        self.curr = self.curr + 1;
        self.vec.get(index).map(|p| p.clone())
    }
}

#[cfg(test)]
mod tests {
    // Note this useful idiom: importing names from outer (for mod tests) scope.
    use super::*;

    #[test]
    fn play_order() {
        let mut grid = Grid::new(&vec!["#######", "#.G.E.#", "#E.G.E#", "#.G.E.#", "#######"]);
        grid.start_turn();
        assert_eq!(grid.next_unit_to_play(), Some(Position::new(2, 1)));
        assert_eq!(grid.next_unit_to_play(), Some(Position::new(4, 1)));
        assert_eq!(grid.next_unit_to_play(), Some(Position::new(1, 2)));
        assert_eq!(grid.next_unit_to_play(), Some(Position::new(3, 2)));
        assert_eq!(grid.next_unit_to_play(), Some(Position::new(5, 2)));
        assert_eq!(grid.next_unit_to_play(), Some(Position::new(2, 3)));
        assert_eq!(grid.next_unit_to_play(), Some(Position::new(4, 3)));
        assert_eq!(grid.next_unit_to_play(), None);
    }

    // #[test]
    // fn test_exo1() {}

}
