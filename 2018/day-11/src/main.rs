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

    // let f = fs::read_to_string("src/input.txt")?;
    // let lines: Vec<&str> = f.split("\n").collect();

    if mode == "a" {
        println!("coord : {:?}", find1(6548));
    } else if mode == "b" {
    }

    Ok(())
}

fn find1(serial_number: u32) -> (usize, usize) {
    let mut grid: Vec<Vec<i32>> = Vec::new();
    for y in 1..=300 {
        let mut row = Vec::new();
        for x in 1..=300 {
            row.push(compute_cell(x, y, serial_number));
        }
        grid.push(row);
    }
    find_square_3_3(grid)
}

fn compute_cell(x: usize, y: usize, serial_number: u32) -> i32 {
    let rack_id: i32 = (x + 10) as i32;
    let computed = (((rack_id * y as i32) as i32 + serial_number as i32) * rack_id).to_string();
    let hundreds_digit = computed.chars().rev().nth(2).expect("hundreds digit");
    hundreds_digit.to_string().parse::<i32>().expect("parse") - 5
}

fn find_square_3_3(grid: Vec<Vec<i32>>) -> (usize, usize) {
    let max_y = grid.len() - 3;
    let max_x = grid[0].len() - 3;

    let mut result = ((0, 0), 0);
    for y in 0..max_y {
        for x in 0..max_x {
            let row1 = &grid[y];
            let row2 = &grid[y + 1];
            let row3 = &grid[y + 2];
            let value = sum(row1, x) + sum(row2, x) + sum(row3, x);
            if value > result.1 {
                result = ((x + 1, y + 1), value);
            }
        }
    }
    result.0
}

fn sum(row: &Vec<i32>, x: usize) -> i32 {
    row[x] + row[x + 1] + row[x + 2]
}

#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn test_compute_cell() {
        assert_eq!(compute_cell(3, 5, 8), 4);
        assert_eq!(compute_cell(122, 79, 57), -5);
        assert_eq!(compute_cell(217, 196, 39), 0);
        assert_eq!(compute_cell(101, 153, 71), 4);
    }

    #[test]
    fn test_find_square() {
        assert_eq!(
            find_square_3_3(vec![
                vec![-2, -4, 4, 4, 4],
                vec![-4, 4, 4, 4, -5],
                vec![4, 3, 3, 4, -4],
                vec![1, 1, 2, 4, -3],
                vec![-1, 0, 2, -5, -2],
            ]),
            (2, 2)
        );
    }

    #[test]
    fn test_find1_1() {
        assert_eq!(find1(18), (33, 45));
        assert_eq!(find1(42), (21, 61));
    }
}
