// use fighter::{Character, Unit};
// use fighter::Character;
// use fighter::Unit;
use fighter::{Character, GridCell};
use position::Position;
use std::collections::HashSet;
// use std::any::Any;
use unitsinturn::UnitsInTurn;

pub struct Grid {
    grid: Vec<Vec<Box<GridCell>>>,
    units_in_turn: UnitsInTurn,
}

impl Grid {
    pub fn new(input: &[&str]) -> Grid {
        let mut grid: Vec<Vec<Box<GridCell>>> = Vec::new();
        for y in 0..input.len() {
            let mut grid_row: Vec<Box<GridCell>> = Vec::new();
            let row = input[y].to_string();
            for x in 0..row.len() {
                let cell: Box<GridCell> = match row.get(x..x + 1).expect("parse char") {
                    "#" => Box::new(GridCell::Wall),
                    "G" => Box::new(GridCell::Unit {
                        character: Character::Gobelin,
                        hp: 200,
                    }),
                    "E" => Box::new(GridCell::Unit {
                        character: Character::Elf,
                        hp: 200,
                    }),
                    _ => Box::new(GridCell::Empty),
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
        // let positions: Vec<Position> = self
        //     .grid
        //     .iter()
        //     .enumerate()
        //     .flat_map(|(y, row)| {
        //         let create_pos = move |x| Position::new(x, y);
        //         row.iter()
        //             .enumerate()
        //             .map(move |(x, cell)| match cell.is_unit() {
        //                 true => Some(create_pos(x)),
        //                 false => None,
        //             })
        //     })
        //     .filter(|c| c.is_some())
        //     .map(|o| o.unwrap())
        //     .collect();

        let positions = self.filtered_positions(|c| c.is_unit());
        self.units_in_turn = UnitsInTurn::new(positions);
    }

    fn filtered_positions(&self, predicate: impl Fn(&Box<GridCell>) -> bool) -> Vec<Position> {
        let result: Vec<Position> = self
            .grid
            .iter()
            .enumerate()
            .flat_map(|(y, row)| {
                let create_pos = move |x| Position::new(x, y);
                let positions: Vec<Position> = row
                    .iter()
                    .enumerate()
                    // .map(|(x, cell)| Some(create_pos(x)))
                    .filter_map(|(x, cell)| match predicate(cell) {
                        true => Some(create_pos(x)),
                        false => None,
                    })
                    .collect();
                // .collect();
                positions
            })
            // .map(|o| o.unwrap())
            .collect();
        result
    }

    fn next_unit_to_play(&mut self) -> Option<Position> {
        // Some(Position::new(0, 0))
        //Some(self.units_in_turn[0].clone())
        self.units_in_turn.next()
    }

    fn is_reachable(&self, from: &Position, to: &Position) -> bool {
        let mut breaker = 99;
        let mut visited: HashSet<Position> = HashSet::new();
        let mut nodes = vec![to.clone()];
        while nodes.len() > 0 && breaker > 0 {
            let node = nodes.pop().expect("where is my node ?");
            let reachables = self.get_in_range(&node);
            let new_nodes: Vec<&Position> =
                reachables.iter().filter(|p| !visited.contains(p)).collect();
            // visited.append();
            // new_nodes.iter()
            if new_nodes.contains(&from) {
                return true;
            }
            for pos in new_nodes {
                // nodes.append(&mut new_nodes);
                nodes.push(pos.clone());
                visited.insert(pos.clone());
            }
            breaker -= 1;
        }
        if breaker <= 0 {
            panic!("BROKEN ARROW");
        }
        false
    }

    fn find_move_step(&self, from: Position) -> Position {
        let unit = self.get(&from);

        let foes = self.filtered_positions(|c| c.is_foe(unit));
        let foes: Vec<Position> = foes
            .iter()
            .flat_map(|foe| self.get_in_range(foe))
            .filter(|p| self.is_reachable(p, &from))
            .collect();
        let mut nearest = Position::new(999999, 999999);
        let mut shortest_distance = 999999999;
        for p in foes {
            let dist = p.distance(&from);
            // println!("dist {:?} / {:?} == {}", from, p, dist);
            if dist <= shortest_distance && p.before(&nearest) {
                nearest = p;
                shortest_distance = dist;
            }
        }

        let target = nearest;
        println!("go from {:?} to {:?}", from, target);
        let mut result = Position::new(999999, 999999);
        let mut shortest = 99999999;
        for step in self.get_in_range(&from) {
            let dist = step.distance(&target);
            // println!(
            //     "{:?} / {:?} : {} ({}) && {:?} < {:?} == {}",
            //     target,
            //     step,
            //     dist,
            //     shortest,
            //     step,
            //     result,
            //     step.before(&result)
            // );
            if dist <= shortest && step.before(&result) {
                // println!("====== {:?}", true);
                result = step;
                shortest = dist;
            }
        }

        // Position::new(0, 0)
        result
    }

    fn get_in_range(&self, pos: &Position) -> Vec<Position> {
        vec![pos.add_y(-1), pos.add_y(1), pos.add_x(-1), pos.add_x(1)]
            .iter()
            .filter(|&p| self.get(p).is_empty())
            .map(|p| p.clone())
            .collect()
    }

    fn get(&self, p: &Position) -> &Box<GridCell> {
        &self.grid[p.y][p.x]
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

    #[test]
    fn in_range() {
        let grid = Grid::new(&vec!["#######", "#.E...#", "#.....#", "#...G.#", "#######"]);
        assert_eq!(
            grid.get_in_range(&Position::new(4, 3)),
            vec![
                Position::new(4, 2),
                Position::new(3, 3),
                Position::new(5, 3)
            ]
        );
    }

    #[test]
    fn find_move_step() {
        let grid = Grid::new(&vec!["#######", "#.E...#", "#.....#", "#...G.#", "#######"]);
        assert_eq!(
            grid.find_move_step(Position::new(2, 1)),
            Position::new(3, 1)
        );
    }
    //fn find_move_step_with_unreachable(){}
    #[test]
    fn find_move_step_with_unreachable() {
        let grid = Grid::new(&vec![
            "#######", //
            "#.E#.G#", //
            "#...#.#", //
            "#...G.#", //
            "#######",
        ]);
        assert_eq!(
            grid.find_move_step(Position::new(2, 1)),
            Position::new(2, 2)
        );
    }

    // #[test]
    // fn test_exo1() {}

}
