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
        println!("coord : {:?}", find2(6548));
    }

    Ok(())
}

fn init(serial_number: u32) -> Vec<Vec<i32>> {
    let mut grid: Vec<Vec<i32>> = Vec::new();
    for y in 1..=300 {
        let mut row = Vec::new();
        for x in 1..=300 {
            row.push(compute_cell(x, y, serial_number));
        }
        grid.push(row);
    }
    grid
}

fn compute_cell(x: usize, y: usize, serial_number: u32) -> i32 {
    let rack_id: i32 = (x + 10) as i32;
    let computed = (((rack_id * y as i32) as i32 + serial_number as i32) * rack_id).to_string();
    let hundreds_digit = computed.chars().rev().nth(2).expect("hundreds digit");
    hundreds_digit.to_string().parse::<i32>().expect("parse") - 5
}

fn find1(serial_number: u32) -> (usize, usize) {
    let grid = init(serial_number);
    let coord = find_square(&grid, 3).0;
    (coord.0, coord.1)
}

fn find2(serial_number: u32) -> (usize, usize, usize) {
    let mut grid: Vec<Vec<i32>> = Vec::new();
    for y in 1..=300 {
        let mut row = Vec::new();
        for x in 1..=300 {
            row.push(compute_cell(x, y, serial_number));
        }
        grid.push(row);
    }
    let mut max = ((0, 0, 0), 0);
    let mut last = 0;
    for size in 1..300 {
        println!("size {:?}...", size);
        let max_for_size = find_square(&grid, size);
        println!("====> {:?}", max_for_size);
        if max_for_size.1 > max.1 {
            max = (
                ((max_for_size.0).0, (max_for_size.0).1, size),
                max_for_size.1,
            );
        } else if max_for_size.1 < last {
            break;
        }
        last = max_for_size.1;
    }
    max.0
}

fn find_square(grid: &Vec<Vec<i32>>, size: usize) -> ((usize, usize), i32) {
    let max_y = grid.len() - size;
    let max_x = grid[0].len() - size;

    let mut result = ((0, 0), 0);
    for y in 0..max_y {
        for x in 0..max_x {
            let value = grid[y..y + size]
                .iter()
                .fold(0, |r, row| r + sum_x(row, x, size));
            if value > result.1 {
                result = ((x + 1, y + 1), value);
            }
        }
    }
    result
}

fn sum_x(row: &Vec<i32>, x: usize, size: usize) -> i32 {
    row[x..x + size].iter().sum()
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
            find_square(
                &vec![
                    vec![-2, -4, 4, 4, 4],
                    vec![-4, 4, 4, 4, -5],
                    vec![4, 3, 3, 4, -4],
                    vec![1, 1, 2, 4, -3],
                    vec![-1, 0, 2, -5, -2],
                ],
                3
            ),
            ((2, 2), 29)
        );
    }

    #[test]
    fn test_find1() {
        assert_eq!(find1(18), (33, 45));
        assert_eq!(find1(42), (21, 61));
    }
    #[test]
    fn test_find2() {
        assert_eq!(find2(18), (90, 269, 16));
    }
}
