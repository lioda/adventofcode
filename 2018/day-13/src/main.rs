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

    loop {
        let (collision, new_carts) = tick(&grid, &carts);
        carts = new_carts;
        if collision.is_some() {
            return collision.unwrap();
        }
    }

    (0, 0)
}

fn init_grid(input: &[&str]) -> (Vec<Vec<String>>, HashMap<(usize, usize), Cart>) {
    let mut grid: Vec<Vec<String>> = Vec::new();
    let mut carts: HashMap<(usize, usize), Cart> = HashMap::new();
    for y in 0..input.len() {
        let mut row: Vec<String> = Vec::new();
        for x in 0..input[0].len() {
            row.push(
                match input[y] {
                    ">" | "<" => {
                        carts.insert(
                            (x, y),
                            Cart {
                                direction: input[y].to_string(),
                            },
                        );
                        "-"
                    }
                    "^" | "v" => {
                        carts.insert(
                            (x, y),
                            Cart {
                                direction: input[y].to_string(),
                            },
                        );
                        "|"
                    }
                    _ => input[y],
                }
                .to_string()
                .get(x..x + 1)
                .expect("get char in input")
                .to_string(),
            );
        }
        if row.len() == 0 {
            continue;
        }
        grid.push(row);
    }
    (grid, carts)
}

fn tick(
    grid: &Vec<Vec<String>>,
    carts: &HashMap<(usize, usize), Cart>,
) -> (Option<(usize, usize)>, HashMap<(usize, usize), Cart>) {
    let mut new_carts: HashMap<(usize, usize), Cart> = HashMap::new();

    for y in 0..grid.len() {
        for x in 0..grid[0].len() {
            let position = (x, y);
            if !carts.contains_key(&position) {
                continue;
            }
            let cart = carts.get(&position).expect("obtain cart");
            let (new_pos, new_cart, collision) = cart.next(position, grid);
            new_carts.insert(new_pos, new_cart);
            if collision {
                return (Some(new_pos), new_carts);
            }
        }
    }

    (None, new_carts)
}
#[derive(Clone, PartialEq, Eq, Debug)]
struct Cart {
    direction: String,
}

impl Cart {
    fn next(&self, pos: (usize, usize), grid: &Vec<Vec<String>>) -> ((usize, usize), Cart, bool) {
        let cell = &grid[pos.1][pos.0];

        let dir = self.direction.clone();

        let next_pos = match dir.as_str() {
            ">" => (pos.0 + 1, pos.1),
            "<" => (pos.0 - 1, pos.1),
            "v" => (pos.0, pos.1 + 1),
            _ => (pos.0, pos.1 - 1),
        };

        let next_cell = &grid[next_pos.1][next_pos.0];

        let next_direction = match next_cell.as_str() {
            r"\" => {
                match dir.as_str() {
                    ">" | "<" => {
                        let up = if next_pos.1 > 0 {
                            grid.get(next_pos.1 - 1)
                                .and_then(|row| row.get(next_pos.0).clone())
                                .map(|s| s.as_str())
                                .filter(|c| *c != " ")
                                .map(|_| "^")
                        } else {
                            None
                        };
                        let down = grid
                            .get(next_pos.1 + 1)
                            .and_then(|row| row.get(next_pos.0))
                            .map(|s| s.as_str())
                            .filter(|c| *c != " ")
                            .map(|_| "v");

                        println!("{:?} ou {:?} ? ", up, down);

                        up.or_else(|| down)
                            .expect(r"< | > \ : up or down")
                            .to_string()
                        // ""
                    }
                    _ => dir,
                }
                // ""
                // match self.direction.as_str() {
                //     ">" => "v"
                //     "<" => "v"
                //     "^" => "v"
                //     _ => "v"
                // }
                //         if self.direction == ">" {
                //             "v"
                //         }else if self.direction
                //          else {
                //             "<"
                //         }
                //     }
                //     r"/" => {
                //         if self.direction == "<" {
                //             "v"
                //         } else {
                //             ">"
                //         }
            }
            _ => dir,
            // }
        };
        println!("next dir : {:?}", next_direction);

        (
            next_pos,
            Cart {
                direction: /*self.direction.clone(),*/ next_direction.to_string(),
            },
            false,
        )
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
    fn test_next_cart_2() {
        assert_eq!(
            newcart(">").next((0, 0), &grid(&[&r"-\", &r" |"])),
            ((1, 0), newcart("v"), false)
        );
        assert_eq!(
            newcart("<").next((1, 1), &grid(&[&r"| ", &r"\-"])),
            ((0, 1), newcart("^"), false)
        );
    }

    // #[test]
    // fn test_generation_1() {
    //     assert_eq!(
    //         exo1(&[
    //             &r"/->-\",
    //             &r"|   |  /----\",
    //             &r"| /-+--+-\  |",
    //             &r"| | |  | v  |",
    //             &r"\-+-/  \-+--/",
    //             &r"  \------/",
    //         ]),
    //         (7, 3)
    //     );
    // }

}
