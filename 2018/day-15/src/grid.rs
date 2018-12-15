// use fighter::{Character, Unit};
// use fighter::Character;
// use fighter::Unit;
use fighter::{Character, GridCell};
use position::Position;
use std::collections::{HashMap, HashSet};
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

    pub fn start_turn(&mut self) {
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
                    .filter_map(|(x, cell)| match predicate(cell) {
                        true => Some(create_pos(x)),
                        false => None,
                    })
                    .collect();
                positions
            })
            .collect();
        result
    }

    pub fn next_unit_to_play(&mut self) -> Option<Position> {
        self.units_in_turn.next()
    }

    fn is_reachable(&self, from: &Position, to: &Position) -> bool {
        let mut breaker = 99999;
        let mut visited: HashSet<Position> = HashSet::new();
        let mut nodes = vec![to.clone()];
        while nodes.len() > 0 && breaker > 0 {
            let node = nodes.pop().expect("where is my node ?");
            let reachables = self.get_in_range(&node);
            let new_nodes: Vec<&Position> =
                reachables.iter().filter(|p| !visited.contains(p)).collect();
            if new_nodes.contains(&from) {
                return true;
            }
            for pos in new_nodes {
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

    pub fn find_move_step(&self, from: &Position) -> Option<Position> {
        let unit = self.get(&from);

        let foes = self.filtered_positions(|c| c.is_foe(unit));
        let reachable_nearests: Vec<Position> = foes
            .iter()
            .flat_map(|foe| self.get_in_range(foe))
            .filter(|p| self.is_reachable(p, &from))
            .collect();

        if reachable_nearests.len() == 0 {
            return None;
        }

        let target = from.closest(&reachable_nearests);
        let result = self.find_shortests_steps(from, &target);
        // println!("go from {:?} to {:?} by {:?}", from, target, result);
        Some(result)
    }

    fn find_shortests_steps(&self, from: &Position, to: &Position) -> Position {
        let mut scores: HashMap<Position, u32> = HashMap::new();
        scores.insert(to.clone(), 0);
        let mut nodes = vec![(to.clone(), 0)];

        while nodes.len() > 0 {
            let node = nodes.pop().expect("node in nodes for steps");
            let mut new_nodes = Vec::new();
            let reachables = self.get_in_range(&node.0);
            let score = node.1 + 1;
            for reachable in reachables {
                if scores.contains_key(&reachable) {
                    let current_score = scores.get_mut(&reachable).expect("current score");
                    if *current_score > score {
                        *current_score = score;
                        new_nodes.push((reachable, score));
                    }
                } else {
                    scores.insert(reachable.clone(), score);
                    new_nodes.push((reachable, score));
                }
            }
            nodes.append(&mut new_nodes);
        }

        let steps = self.get_in_range(from);
        let mut result = Position::new(999999, 999999);
        let mut min = 99999999;
        for step in steps {
            // println!(
            //     "----- {:?} move to {:?} ? => {:?}",
            //     from,
            //     step,
            //     scores.get(&step)
            // );
            match scores.get(&step) {
                None => (),
                Some(score) => {
                    if *score < min || (*score == min && step.before(&result)) {
                        // result.push(step);
                        result = step;
                        min = *score;
                    }
                }
            }
        }
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

    pub fn move_unit_from_to(&mut self, from: &Position, to: &Position) {
        let unit = self.grid[from.y][from.x].clone();
        self.grid[from.y][from.x] = Box::new(GridCell::Empty);
        self.grid[to.y][to.x] = unit;
    }

    fn get_foes_in_range(&self, pos: &Position) -> Vec<Position> {
        let me = self.get(pos);
        vec![pos.add_y(-1), pos.add_y(1), pos.add_x(-1), pos.add_x(1)]
            .iter()
            .filter(|&p| self.get(p).is_foe(me))
            .map(|p| p.clone())
            .collect()
    }

    pub fn can_attack(&self, pos: &Position) -> bool {
        self.get_foes_in_range(pos).len() > 0
    }
    pub fn do_attack(&mut self, pos: &Position) {
        // println!("{:?} is attacking", pos);
        let foes_pos = self.get_foes_in_range(pos);
        let mut foe_pos = Position::new(999999, 999999);
        let mut min_hp = 99999999;
        for foe in foes_pos {
            let hp = self.get(&foe).get_hp();
            if hp < min_hp || (hp == min_hp && foe.before(&foe_pos)) {
                min_hp = hp;
                foe_pos = foe;
            }
        }
        let foe = &mut self.grid[foe_pos.y][foe_pos.x];
        foe.hit();
        // println!("foe {:?} is hit {}", foe_pos, foe.get_hp());
        if foe.is_dead() {
            // println!("foe {:?} is dead", foe_pos);
            *foe = Box::new(GridCell::Empty);
            self.units_in_turn.remove(&foe_pos);
        }
    }

    pub fn is_playable(&self) -> bool {
        self.grid
            .iter()
            .flat_map(|row| row)
            .any(|c| c.is_character(Character::Elf))
            && self
                .grid
                .iter()
                .flat_map(|row| row)
                .any(|c| c.is_character(Character::Gobelin))
        // false
    }

    pub fn hp_left(&self) -> i32 {
        self.grid
            .iter()
            .flat_map(|row| row)
            .map(|c| c.get_hp())
            .sum()
    }

    /////////////////// display //////////////////
    pub fn display(&self) {
        self.grid.iter().for_each(|row| {
            let mut hps = String::new();
            row.iter().for_each(|c| {
                // match c {
                //     GridCell::Empty => (),
                //     _ => (),
                // }
                // let a = *c;
                // c.is_empty();
                print!("{}", c.display());
                hps.push_str(c.display_hitpoints().as_str());
            });
            println!(" {}", hps);
        });
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
            grid.find_move_step(&Position::new(2, 1)),
            Some(Position::new(3, 1))
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
            grid.find_move_step(&Position::new(2, 1)),
            Some(Position::new(2, 2))
        );
    }

    #[test]
    fn find_move_step_with_trap() {
        let grid = Grid::new(&vec![
            "#######", //
            "#..E.##", //
            "#...#G#", //
            "#.....#", //
            "#######",
        ]);
        assert_eq!(
            grid.find_move_step(&Position::new(3, 1)),
            Some(Position::new(3, 2))
        );
    }

    #[test]
    fn find_move_step_many_shorts() {
        let grid = Grid::new(&vec![
            "#######", //
            "#.E...#", //
            "#.....#", //
            "#...G.#", //
            "#######",
        ]);
        assert_eq!(
            grid.find_move_step(&Position::new(2, 1)),
            Some(Position::new(3, 1))
        );
    }

    #[test]
    fn find_no_move_step() {
        let grid = Grid::new(&vec![
            "#######", //
            "#.E#..#", //
            "###.#.#", //
            "#...G.#", //
            "#######",
        ]);
        assert_eq!(grid.find_move_step(&Position::new(2, 1)), None);
    }
    #[test]
    fn can_attack() {
        let grid = Grid::new(&vec![
            "##########", //
            "#.EG.E.GG#", //
            "##########", //
        ]);
        assert_eq!(grid.can_attack(&Position::new(2, 1)), true);
        assert_eq!(grid.can_attack(&Position::new(3, 1)), true);
        assert_eq!(grid.can_attack(&Position::new(5, 1)), false);
        assert_eq!(grid.can_attack(&Position::new(7, 1)), false);
        assert_eq!(grid.can_attack(&Position::new(8, 1)), false);
    }

    // #[test]
    // fn test_exo1() {}

}
