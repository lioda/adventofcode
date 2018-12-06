use std::collections::hash_map::Entry;
use std::collections::HashMap;
use std::collections::HashSet;
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
        println!("{:?}", find_max_size(&lines));
    } else if mode == "b" {
        println!("{:?}", find_closest_region(10000, &lines));
    }

    Ok(())
}

#[derive(Debug, PartialEq, Eq, Hash, Clone)]
struct Point {
    x: i32,
    y: i32,
}

impl Point {
    fn distance(self: &Point, p: &Point) -> u32 {
        (self.x - p.x).abs() as u32 + (self.y - p.y).abs() as u32
    }
}

#[derive(Debug, PartialEq)]
struct Boundaries {
    min_x: i32,
    max_x: i32,
    min_y: i32,
    max_y: i32,
}

fn find_max_size(input: &[&str]) -> u32 {
    let dangers = parse_points(input);
    let bounds = boundaries(&dangers);

    let mut cells: HashMap<Point, Vec<Point>> = HashMap::new();
    let mut infinites: HashSet<Point> = HashSet::new();
    for x in bounds.min_x..=bounds.max_x {
        for y in bounds.min_y..=bounds.max_y {
            let p = Point { x: x, y: y };
            if dangers.contains(&p) {
                continue;
            }
            let c = dangers
                .iter()
                .fold((1000000, &Point { x: 0, y: 0 }), |r, danger| {
                    let d = p.distance(danger);
                    /*if d == 0 {
                        return r;
                    } else */
                    if d < r.0 {
                        return (d, danger);
                    }
                    r
                });
            let closest = c.1;
            // println!("closest {}/{} => {:?}", x, y, closest);
            cells.entry(closest.clone()).or_insert(Vec::new()).push(p);
            if x == bounds.min_x || x == bounds.max_x || y == bounds.min_y || y == bounds.max_y {
                infinites.insert(closest.clone());
            }
        }
    }

    // println!("{:?}", infinites);
    // println!("{:?}", cells.keys());

    // cells
    //     .iter()
    //     .filter(|(k, v)| {
    //         if infinites.contains(k) {
    //             return false;
    //         }
    //         true
    //     })
    //     .max_by_key(|(k, v)| v.len())
    //     .map(|(k, v)| {
    //         println!("============== {:?} => {:?}", k, v);
    //         1
    //     });

    cells
        .iter()
        .filter_map(|(k, v)| {
            if infinites.contains(k) {
                return None;
            }
            Some(v)
        })
        .map(|v| v.len())
        .max()
        .expect("no max") as u32
        + 1
    //     .max_by_key(|v| v.len())
    //     .map(|v| {
    //         // println!("winner {:?}", v);
    //         v.len()
    //     })
    //     .expect("no max") as u32
    //     + 1

    // cells.values().map(|v| v.len()).max().expect("no max") as u32 + 1
}

fn find_closest_region(total_distance: u32, input: &[&str]) -> u32 {
    let dangers = parse_points(input);
    let bounds = boundaries(&dangers);

    // let mut cells: HashMap<Point, Vec<Point>> = HashMap::new();
    let mut distances: HashMap<Point, u32> = HashMap::new();
    for x in bounds.min_x..=bounds.max_x {
        for y in bounds.min_y..=bounds.max_y {
            let p = Point { x: x, y: y };
            // if dangers.contains(&p) {
            //     continue;
            // }

            let total: u32 = dangers.iter().map(|location| p.distance(location)).sum();
            println!("{:?} : {}", p, total);
            if total < total_distance {
                distances.insert(p, total);
            }
            // let c = dangers
            //     .iter()
            //     .fold((1000000, &Point { x: 0, y: 0 }), |r, danger| {
            //         let d = p.distance(danger);
            //         /*if d == 0 {
            //             return r;
            //         } else */
            //         if d < r.0 {
            //             return (d, danger);
            //         }
            //         r
            //     });
            // let closest = c.1;
            // println!("closest {}/{} => {:?}", x, y, closest);
            // cells.entry(closest.clone()).or_insert(Vec::new()).push(p);
        }
    }

    // distances.values().filter(|d| d < &&total_distance).count() as u32
    distances.values().count() as u32

    // 0
}

fn parse_points(input: &[&str]) -> Vec<Point> {
    let mut result = Vec::new();
    for line in input {
        if line.len() == 0 {
            continue;
        }
        let mut p = line.split(", ");
        let point = Point {
            x: i32::from_str_radix(p.next().expect("split 0"), 10).unwrap(),
            y: i32::from_str_radix(p.next().expect("split 1"), 10).unwrap(),
        };
        result.push(point);
    }
    result
}

fn boundaries(points: &Vec<Point>) -> Boundaries {
    let mut min_x = 9000000;
    let mut max_x = -9999999;
    let mut min_y = 9999999;
    let mut max_y = -9999999;

    for point in points {
        if point.x < min_x {
            min_x = point.x;
        }
        if point.x > max_x {
            max_x = point.x;
        }
        if point.y < min_y {
            min_y = point.y;
        }
        if point.y > max_y {
            max_y = point.y;
        }
    }

    Boundaries {
        min_x: min_x - 1,
        max_x: max_x + 1,
        min_y: min_y - 1,
        max_y: max_y + 1,
    }
}

#[cfg(test)]
mod tests {
    // Note this useful idiom: importing names from outer (for mod tests) scope.
    use super::*;

    #[test]
    fn test_parse_points() {
        assert_eq!(
            parse_points(&["1, 1", "1, 6", "8, 3", ""]),
            vec![
                Point { x: 1, y: 1 },
                Point { x: 1, y: 6 },
                Point { x: 8, y: 3 }
            ]
        );
    }

    #[test]
    fn test_boundaries() {
        assert_eq!(
            boundaries(&vec![
                Point { x: 1, y: 1 },
                Point { x: 1, y: 6 },
                Point { x: 8, y: 3 },
                Point { x: 3, y: 4 },
                Point { x: 5, y: 5 },
                Point { x: 8, y: 9 },
            ]),
            Boundaries {
                min_x: 0,
                max_x: 9,
                min_y: 0,
                max_y: 10,
            }
        );
    }

    #[test]
    fn test_distance() {
        assert_eq!(Point { x: 2, y: 4 }.distance(&Point { x: 1, y: 6 }), 3);
    }

    #[test]
    fn test_find_max_size() {
        assert_eq!(
            find_max_size(&["1, 1", "1, 6", "8, 3", "3, 4", "5, 5", "8, 9", ""]),
            17
        );
    }
    #[test]
    fn test_find_closest_region() {
        assert_eq!(
            find_closest_region(32, &["1, 1", "1, 6", "8, 3", "3, 4", "5, 5", "8, 9", ""]),
            16
        );
    }
}
