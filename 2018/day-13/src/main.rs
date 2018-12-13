use std::collections::{HashMap, LinkedList, VecDeque};
use std::env;
use std::fmt;
use std::fs;
use std::io;
use std::io::Write;

fn main() -> io::Result<()> {
    let args: Vec<String> = env::args().collect();
    if args.len() < 2 {
        panic!("a or b ?");
    }
    let mode = &args[1];

    let f = fs::read_to_string("src/input.txt")?;
    let lines: Vec<&str> = f.split("\n").collect();

    if mode == "a" {
        println!("result : {:?}", exo1(&lines));
    } else if mode == "b" {
        println!("result : {:?}", exo2(&lines));
        // println!(
        //     "result : {:?}",
        //     Plants::new(&lines).goto_generation2(50000000000)
        // );
    }

    Ok(())
}
fn exo1(input: &[&str]) -> (usize, usize) {
    let (grid, carts) = init_grid(input);
    let mut carts = carts;

    for _ in 0..1000 {
        let (collision, new_carts) = tick(&grid, &carts);
        carts = new_carts;
        if collision.is_some() {
            return collision.unwrap();
        }
    }

    (0, 0)
}
fn exo2(input: &[&str]) -> (usize, usize) {
    let (grid, carts) = init_grid(input);
    let mut carts = carts;

    for i in 0..1000000 {
        let new_carts = tick2(&grid, &carts);
        carts = new_carts;

        if i % 100 == 0 {
            println!("new carts {:?}", carts.len());
        }
        // if collision.is_some() {
        //     return collision.unwrap();
        // }
        if carts.len() == 1 {
            break;
        }
    }

    if carts.len() == 1 {
        return *carts.keys().nth(0).expect("result exo 2");
    } else {
        println!("{:?}", carts.len());
    }

    (0, 0)
}

fn init_grid(input: &[&str]) -> (Vec<Vec<String>>, HashMap<(usize, usize), Cart>) {
    let mut grid: Vec<Vec<String>> = Vec::new();
    let mut carts: HashMap<(usize, usize), Cart> = HashMap::new();
    for y in 0..input.len() {
        let line = input[y];
        let mut row: Vec<String> = Vec::new();
        // for x in 0..input[0].len() {
        // println!("char : {:?}", input[y]);
        for x in 0..line.len() {
            // for ch in line.chars() {
            let s = line.to_string();
            let ch = s.get(x..x + 1).expect("char");
            // println!("char : {:?}", ch);
            row.push(
                match ch {
                    ">" | "<" => {
                        carts.insert(
                            (x, y),
                            Cart {
                                direction: ch.to_string(),
                                intersection_count: 0,
                            },
                        );
                        "-"
                    }
                    "^" | "v" => {
                        carts.insert(
                            (x, y),
                            Cart {
                                direction: ch.to_string(),
                                intersection_count: 0,
                            },
                        );
                        "|"
                    }
                    _ => ch,
                }
                .to_string()
                // .get(x..x + 1)
                // .expect("get char in input")
                // .to_string(),
            );
        }
        if row.len() == 0 {
            continue;
        }
        grid.push(row);
    }
    // println!("init : {:?}\n{:?}", grid, carts);
    (grid, carts)
}

fn tick(
    grid: &Vec<Vec<String>>,
    carts: &HashMap<(usize, usize), Cart>,
) -> (Option<(usize, usize)>, HashMap<(usize, usize), Cart>) {
    // println!("========= tick ===========\n{:?}", carts);
    let mut old_carts: HashMap<(usize, usize), Cart> = carts.clone();
    let mut new_carts: HashMap<(usize, usize), Cart> = HashMap::new();

    for y in 0..grid.len() {
        for x in 0..grid[y].len() {
            let position = (x, y);
            if !carts.contains_key(&position) {
                continue;
            }
            let cart = carts.get(&position).expect("obtain cart");
            old_carts.remove(&position);
            let (new_pos, new_cart, _) = cart.next(position, grid);
            // println!(
            //     "move {:?}({:?}) => {:?}({:?})",
            //     cart, position, new_cart, new_pos
            // );
            let collision = old_carts.contains_key(&new_pos) || new_carts.contains_key(&new_pos);
            new_carts.insert(new_pos, new_cart);
            if collision {
                return (Some(new_pos), new_carts);
            }
        }
    }

    // println!("== end : {:?}", new_carts);
    (None, new_carts)
}

fn tick2(
    grid: &Vec<Vec<String>>,
    carts: &HashMap<(usize, usize), Cart>,
) -> HashMap<(usize, usize), Cart> {
    // println!("========= tick ===========\n{:?}", carts);
    let mut old_carts: HashMap<(usize, usize), Cart> = carts.clone();
    let mut new_carts: HashMap<(usize, usize), Cart> = HashMap::new();

    let mut collisions = Vec::new();

    for y in 0..grid.len() {
        for x in 0..grid[y].len() {
            let position = (x, y);
            if !carts.contains_key(&position) || collisions.contains(&position) {
                continue;
            }
            let cart = carts.get(&position).expect("obtain cart");
            old_carts.remove(&position);
            let (new_pos, new_cart, _) = cart.next(position, grid);
            // println!(
            //     "move {:?}({:?}) => {:?}({:?})",
            //     cart, position, new_cart, new_pos
            // );
            let collision = old_carts.contains_key(&new_pos) || new_carts.contains_key(&new_pos);
            if collision {
                // return (Some(new_pos), new_carts);
                collisions.push(new_pos);
                new_carts.remove(&new_pos);
            } else {
                new_carts.insert(new_pos, new_cart);
            }
        }
    }

    // println!("== end : {:?}", new_carts);
    // (None, new_carts)
    new_carts
}

#[derive(Clone, PartialEq, Eq, Debug)]
struct Cart {
    direction: String,
    intersection_count: u32,
}

impl Cart {
    fn next(&self, pos: (usize, usize), grid: &Vec<Vec<String>>) -> ((usize, usize), Cart, bool) {
        // let cell = &grid[pos.1][pos.0];

        let dir = self.direction.clone();

        let next_pos = match dir.as_str() {
            ">" => (pos.0 + 1, pos.1),
            "<" => (pos.0 - 1, pos.1),
            "v" => (pos.0, pos.1 + 1),
            _ => (pos.0, pos.1 - 1),
        };

        if grid[next_pos.1].len() < next_pos.0 {
            panic!(format!("IMPOSSIBLE{:?}\n{:?}", next_pos, grid[next_pos.1]));
        }
        let next_cell = &grid[next_pos.1][next_pos.0];
        let mut next_intersection_count = self.intersection_count;

        let next_direction = match next_cell.as_str() {
            r"\" => match dir.as_str() {
                ">" | "<" => self.up_or_down(next_pos.0, next_pos.1, grid),
                "v" | "^" => self.left_or_right(next_pos.0, next_pos.1, grid),
                _ => dir,
            },
            r"/" => match dir.as_str() {
                ">" | "<" => self.up_or_down(next_pos.0, next_pos.1, grid),
                "v" | "^" => self.left_or_right(next_pos.0, next_pos.1, grid),
                _ => dir,
            },
            "+" => {
                next_intersection_count += 1;
                self.resolve_intersection()
            }
            _ => dir,
        };
        // println!("next dir {:?} : {:?}", next_cell, next_direction);

        (
            next_pos,
            Cart {
                direction: next_direction.to_string(),
                intersection_count: next_intersection_count,
            },
            false,
        )
    }

    fn up_or_down(&self, x: usize, y: usize, grid: &Vec<Vec<String>>) -> String {
        let filter = |c: &&str| *c == "|" || *c == "+";

        let up = if y > 0 {
            grid.get(y - 1)
                .and_then(|row| row.get(x).clone())
                .map(|s| s.as_str())
                .filter(filter)
                .map(|_| "^")
        } else {
            None
        };
        let down = grid
            .get(y + 1)
            .and_then(|row| row.get(x))
            .map(|s| s.as_str())
            .filter(filter)
            .map(|_| "v");

        // println!("up or down {}, {} => {:?} ou {:?} ? ", x, y, up, down);

        up.or_else(|| down)
            .expect(r"< | > : up or down")
            .to_string()
    }

    fn left_or_right(&self, x: usize, y: usize, grid: &Vec<Vec<String>>) -> String {
        let filter = |c: &&str| *c == "-" || *c == "+";

        let left = if x > 0 {
            grid.get(y)
                .and_then(|row| row.get(x - 1).clone())
                .map(|s| s.as_str())
                .filter(filter)
                .map(|_| "<")
        } else {
            None
        };
        let right = grid
            .get(y)
            .and_then(|row| row.get(x + 1))
            .map(|s| s.as_str())
            .filter(filter)
            .map(|_| ">");

        // println!("left or right {}, {} => {:?} ou {:?} ? ", x, y, left, right);

        left.or_else(|| right)
            .expect(r"^ | v : left or right")
            .to_string()
    }

    fn resolve_intersection(&self) -> String {
        let left = vec![(">", "^"), ("^", "<"), ("<", "v"), ("v", ">")];
        let right = vec![(">", "v"), ("^", ">"), ("<", "^"), ("v", "<")];
        let curr = self.direction.clone();
        if self.intersection_count % 3 == 1 {
            curr
        } else {
            if self.intersection_count % 3 == 0 {
                left
            } else {
                right
            }
            .iter()
            .filter(|tuple| tuple.0 == curr)
            .map(|t| t.1)
            .nth(0)
            .expect("resolve_intersection")
            .to_string()
        }

        // "^".to_string()
    }
}

#[cfg(test)]
mod tests {
    // Note this useful idiom: importing names from outer (for mod tests) scope.
    use super::*;

    fn grid(raw: &[&str]) -> Vec<Vec<String>> {
        // let mut grid: Vec<Vec<String>> = Vec::new();
        // let mut carts: HashMap<(usize, usize), Cart> = HashMap::new();
        // for y in 0..raw.len() {
        //     let mut row: Vec<String> = Vec::new();
        //     for x in 0..raw[0].len() {
        //         row.push(raw[y].to_string().get(x..x + 1));
        //     }
        //     grid.push(row);
        // }
        // grid
        init_grid(raw).0
    }

    fn newcart(dir: &str) -> Cart {
        Cart {
            direction: dir.to_string(),
            intersection_count: 0,
        }
    }

    #[test]
    fn test_next_cart_1() {
        assert_eq!(
            newcart(">").next((0, 0), &grid(&[&r"--",])),
            ((1, 0), newcart(">"), false)
        );
        assert_eq!(
            newcart("<").next((1, 0), &grid(&[&r"--",])),
            ((0, 0), newcart("<"), false)
        );
        assert_eq!(
            newcart("v").next((0, 0), &grid(&[&r"|", &r"|"])),
            ((0, 1), newcart("v"), false)
        );
        assert_eq!(
            newcart("^").next((0, 1), &grid(&[&r"|", &r"|"])),
            ((0, 0), newcart("^"), false)
        );
    }

    #[test]
    fn test_next_cart_horizontal() {
        assert_eq!(
            newcart(">").next((0, 0), &grid(&[&r"-\", &r" |"])),
            ((1, 0), newcart("v"), false)
        );
        assert_eq!(
            newcart("<").next((1, 1), &grid(&[&r"| ", &r"\-"])),
            ((0, 1), newcart("^"), false)
        );
        assert_eq!(
            newcart(">").next((0, 1), &grid(&[&r" |", &r"-/"])),
            ((1, 1), newcart("^"), false)
        );
        assert_eq!(
            newcart("<").next((1, 0), &grid(&[&r"/-", &r"| "])),
            ((0, 0), newcart("v"), false)
        );
    }

    #[test]
    fn test_next_cart_vertical() {
        assert_eq!(
            newcart("v").next((1, 0), &grid(&[&r" |", &r"-/"])),
            ((1, 1), newcart("<"), false)
        );
        assert_eq!(
            newcart("^").next((0, 1), &grid(&[&r"/-", &r"| "])),
            ((0, 0), newcart(">"), false)
        );
        assert_eq!(
            newcart("v").next((0, 0), &grid(&[&r"| ", &r"\-"])),
            ((0, 1), newcart(">"), false)
        );
        assert_eq!(
            newcart("^").next((1, 1), &grid(&[&r"-\", &r" | "])),
            ((1, 0), newcart("<"), false)
        );
    }

    fn cart(s: &str, intersect: u32) -> Cart {
        Cart {
            direction: s.to_string(),
            intersection_count: intersect,
        }
    }

    #[test]
    fn test_next_cart_intersection() {
        assert_eq!(
            newcart(">").next((0, 1), &grid(&[&r" | ", &r"-+-", &r" | "])),
            ((1, 1), cart("^", 1), false)
        );
    }

    #[test]
    fn test_next_cart_resolve_intersections() {
        assert_eq!(cart(">", 0).resolve_intersection(), "^");
        assert_eq!(cart(">", 1).resolve_intersection(), ">");
        assert_eq!(cart(">", 2).resolve_intersection(), "v");
        assert_eq!(cart(">", 3).resolve_intersection(), "^");

        assert_eq!(cart("<", 0).resolve_intersection(), "v");
        assert_eq!(cart("<", 1).resolve_intersection(), "<");
        assert_eq!(cart("<", 2).resolve_intersection(), "^");
        assert_eq!(cart("<", 3).resolve_intersection(), "v");

        assert_eq!(cart("^", 0).resolve_intersection(), "<");
        assert_eq!(cart("^", 1).resolve_intersection(), "^");
        assert_eq!(cart("^", 2).resolve_intersection(), ">");
        assert_eq!(cart("^", 3).resolve_intersection(), "<");

        assert_eq!(cart("v", 0).resolve_intersection(), ">");
        assert_eq!(cart("v", 1).resolve_intersection(), "v");
        assert_eq!(cart("v", 2).resolve_intersection(), "<");
        assert_eq!(cart("v", 3).resolve_intersection(), ">");
    }

    // #[test]
    // fn test_next_makes_crash() {
    //     assert_eq!(
    //         newcart(">").next((0, 0), &grid(&[&r"---"])),
    //         ((1, 1), newcart("^"), false)
    //     );
    // }

    #[test]
    fn test_exo1_1() {
        assert_eq!(
            exo1(&[
                &r"/->-\",
                &r"|   |  /----\",
                &r"| /-+--+-\  |",
                &r"| | |  | v  |",
                &r"\-+-/  \-+--/",
                &r"  \------/",
            ]),
            (7, 3)
        );
    }

    #[test]
    fn test_exo2_1() {
        assert_eq!(
            exo2(&[
                &r"/>-<\  ",
                &r"|   |  ",
                &r"| /<+-\",
                &r"| | | v",
                &r"\>+</ |",
                &r"  |   ^",
                &r"  \<->/",
            ]),
            (6, 4)
        );
    }

}
