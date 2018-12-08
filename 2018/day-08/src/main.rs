use std::borrow::Borrow;
use std::borrow::BorrowMut;
use std::cell::RefCell;
use std::collections::hash_map::Entry;
use std::collections::HashMap;
use std::collections::HashSet;
use std::collections::VecDeque;
use std::env;
use std::fs;
use std::io;
use std::rc::Rc;

fn main() -> io::Result<()> {
    let args: Vec<String> = env::args().collect();
    if args.len() < 2 {
        panic!("a or b ?");
    }
    let mode = &args[1];

    let f = fs::read_to_string("src/input.txt")?;
    let lines: Vec<&str> = f.split("\n").collect();

    if mode == "a" {
        println!("{:?}", count_metadata(&lines[0]));
    } else if mode == "b" {
    }

    Ok(())
}

fn count_metadata(input: &str) -> u32 {
    let vals: Vec<u32> = input
        .split("\n")
        .flat_map(|s| s.split(" "))
        .map(|s| u32::from_str_radix(s, 10))
        .filter_map(|n| match n {
            Err(_) => None,
            Ok(v) => Some(v),
        })
        .collect();
    read_node2(1, 0, &vals).0
}

fn read_node2(count: u32, start: usize, values: &[u32]) -> (u32, usize) {
    // println!("------------- {:?} = {:?} / {:?}", count, start, values);
    let mut curr = start;
    let mut result = 0;
    for _ in 0..count {
        let count_nodes = values[curr];
        curr += 1;
        let count_meta = values[curr] as usize;
        curr += 1;
        // println!("header {:?} / {}", count_nodes, count_meta);
        let children = read_node2(count_nodes, curr, values);
        curr = children.1;
        result += children.0;

        // println!(
        //     "meta from {:?} to {:?} => {:?}",
        //     curr,
        //     curr + count_meta,
        //     &values[curr..curr + count_meta]
        // );
        let meta: u32 = values[curr..curr + count_meta].iter().sum();
        result += meta;
        curr += count_meta;
    }
    (result, curr)
}

#[cfg(test)]
mod tests {
    // Note this useful idiom: importing names from outer (for mod tests) scope.
    use super::*;

    #[test]
    fn test_count_metadata() {
        assert_eq!(count_metadata("2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2\n"), 138);
    }

}
