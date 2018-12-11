extern crate regex;
use regex::Regex;
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
        let pattern = find_pattern(10000000, 25, &lines);
        // println!("{:?}", pattern.0);
        // for line in pattern.1 {
        //     println!("{:?}", line);
        // }
        println!("second : {}", pattern);
    } else if mode == "b" {
    }

    Ok(())
}

#[derive(PartialEq, Eq, Debug)]
struct Point {
    x: i32,
    y: i32,
}

#[derive(PartialEq, Eq, Debug, Clone)]
struct Velocity {
    add_x: i32,
    add_y: i32,
}

#[derive(PartialEq, Eq, Debug)]
struct GridCell {
    p: Point,
    v: Velocity,
}

impl GridCell {
    fn tick(&self) -> Self {
        GridCell {
            p: Point {
                x: self.p.x + self.v.add_x,
                y: self.p.y + self.v.add_y,
            },
            v: self.v.clone(),
        }
    }
}

fn parse_line(line: &str) -> GridCell {
    let pattern =
        Regex::new("position=<[ ]*([-0-9]+),[ ]*([-0-9]+)> velocity=<[ ]*([-0-9]+),[ ]*([-0-9]+)>")
            .expect("pattern");

    let captures = pattern.captures(line).expect("capture");

    let point = Point {
        x: captures
            .get(1)
            .expect("group 1")
            .as_str()
            .parse::<i32>()
            .expect("parse 1"),
        y: captures
            .get(2)
            .expect("group 2")
            .as_str()
            .parse::<i32>()
            .expect("parse 2"),
    };
    let velocity = Velocity {
        add_x: captures
            .get(3)
            .expect("group 3")
            .as_str()
            .parse::<i32>()
            .expect("parse 3"),
        add_y: captures
            .get(4)
            .expect("group 4")
            .as_str()
            .parse::<i32>()
            .expect("parse 4"),
    };
    GridCell {
        p: point,
        v: velocity,
    }
}

fn find_pattern(max: u32, threshold: u32, input: &[&str]) -> u32 {
    //, Vec<String>) {
    // let mut velocities = Vec::new();
    // let mut points = Vec::new();
    let mut grid = Vec::new();
    for line in input {
        if line.len() == 0 {
            continue;
        }
        // println!("parse line {:?}", line);
        let parsed = parse_line(line);
        grid.push(parsed);
        // points.push(parsed.0);
        // velocities.push(parsed.1);
    }

    let mut seconds = 0;
    for i in 1..=max {
        if seconds % 10 == 0 {
            println!("seconde {:?}", seconds);
        }
        // println!("second {} : \n{}", seconds, display(&grid).join("\n"));
        // let max_x = grid.iter().map(|cell| cell.p.x).max().expect("max x");
        // let count = grid.iter().filter(|cell| cell.p.x == max_x).count();
        // println!("second {} : max_x {:?} / count {}", seconds, max_x, count);
        let mut m: HashMap<i32, u32> = HashMap::new();
        m = grid.iter().fold(m, |mut map, item| {
            map.entry(item.p.x).and_modify(|x| *x += 1).or_insert(1);
            map
        });
        let max = m.iter().max_by_key(|(k, v)| *v).expect("max on one x");
        // let max.1 = 0;
        if *max.1 > threshold {
            break;
        }
        seconds = i;
        grid = grid.iter().map(|cell| cell.tick()).collect();
    }

    display(&grid);

    seconds //, display(&grid))
}

fn display(grid: &[GridCell]) /*-> Vec<String>*/
{
    // vec![String::from("a"), String::from("b")]
    //let mut result = Vec::new();
    let mut out = fs::File::create("yolo.txt").expect("create file");

    let min_x = grid.iter().map(|c| c.p.x).min().expect("display min x");
    let max_x = grid.iter().map(|c| c.p.x).max().expect("display max x");
    let min_y = grid.iter().map(|c| c.p.y).min().expect("display min y");
    let max_y = grid.iter().map(|c| c.p.y).max().expect("display max y");
    println!("{:?}->{}/{}->{}", min_x, max_x, min_y, max_y);

    let offset_x = -min_x;
    let offset_y = -min_y;

    let mut map: HashMap<(i32, i32), bool> = HashMap::new();
    // map = grid
    map = grid.iter().fold(map, |mut m, c| {
        m.insert((c.p.x, c.p.y), true);
        m
    });

    for y in min_y..=max_y {
        // let mut line: Vec<String> = vec![String::from("."); (max_x - min_x + 1) as usize];
        for x in min_x..=max_x {
            write!(
                out,
                "{}",
                match map.get(&(x, y)) {
                    None => ".",
                    Some(_) => "#",
                }
            );
        }
        writeln!(out);
        // grid.iter()
        //     .filter(|c| c.p.y == y)
        //     .for_each(|c| line[(c.p.x + offset) as usize] = String::from("#"));
        // result.push(line.join(""));
        // result.push(line);
    }

    // grid.iter().for_each(|c| {
    //     result[(c.p.y + offset_y) as usize][(c.p.x + offset_x) as usize] = String::from("#");
    // });

    // result.iter().map(|v| v.join("")).collect()
}

#[cfg(test)]
mod tests {
    // Note this useful idiom: importing names from outer (for mod tests) scope.
    use super::*;

    #[test]
    fn test_parse_line() {
        assert_eq!(
            parse_line("position=<-3, 11> velocity=< 1, -2>"),
            GridCell {
                p: Point { x: -3, y: 11 },
                v: Velocity {
                    add_x: 1,
                    add_y: -2,
                },
            }
        );
    }
    #[test]
    fn test_tick() {
        let mut cell = GridCell {
            p: Point { x: 3, y: 9 },
            v: Velocity {
                add_x: 1,
                add_y: -2,
            },
        };
        cell = cell.tick();
        cell = cell.tick();
        assert_eq!(
            cell.tick(),
            GridCell {
                p: Point { x: 6, y: 3 },
                v: Velocity {
                    add_x: 1,
                    add_y: -2,
                },
            }
        );
    }

    #[test]
    fn test_find_pattern() {
        assert_eq!(
            find_pattern(
                4,
                6,
                &[
                    "position=< 9,  1> velocity=< 0,  2>",
                    "position=< 7,  0> velocity=<-1,  0>",
                    "position=< 3, -2> velocity=<-1,  1>",
                    "position=< 6, 10> velocity=<-2, -1>",
                    "position=< 2, -4> velocity=< 2,  2>",
                    "position=<-6, 10> velocity=< 2, -2>",
                    "position=< 1,  8> velocity=< 1, -1>",
                    "position=< 1,  7> velocity=< 1,  0>",
                    "position=<-3, 11> velocity=< 1, -2>",
                    "position=< 7,  6> velocity=<-1, -1>",
                    "position=<-2,  3> velocity=< 1,  0>",
                    "position=<-4,  3> velocity=< 2,  0>",
                    "position=<10, -3> velocity=<-1,  1>",
                    "position=< 5, 11> velocity=< 1, -2>",
                    "position=< 4,  7> velocity=< 0, -1>",
                    "position=< 8, -2> velocity=< 0,  1>",
                    "position=<15,  0> velocity=<-2,  0>",
                    "position=< 1,  6> velocity=< 1,  0>",
                    "position=< 8,  9> velocity=< 0, -1>",
                    "position=< 3,  3> velocity=<-1,  1>",
                    "position=< 0,  5> velocity=< 0, -1>",
                    "position=<-2,  2> velocity=< 2,  0>",
                    "position=< 5, -2> velocity=< 1,  2>",
                    "position=< 1,  4> velocity=< 2,  1>",
                    "position=<-2,  7> velocity=< 2, -2>",
                    "position=< 3,  6> velocity=<-1, -1>",
                    "position=< 5,  0> velocity=< 1,  0>",
                    "position=<-6,  0> velocity=< 2,  0>",
                    "position=< 5,  9> velocity=< 1, -2>",
                    "position=<14,  7> velocity=<-2,  0>",
                    "position=<-3,  6> velocity=< 2, -1>",
                ]
            ),
            3
        );
    }

}
