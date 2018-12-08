// use std::borrow::Borrow;
// use std::borrow::BorrowMut;
// use std::cell::RefCell;
// use std::collections::hash_map::Entry;
// use std::collections::HashMap;
// use std::collections::HashSet;
// use std::collections::VecDeque;
use std::env;
use std::fs;
use std::io;
// use std::rc::Rc;

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
        println!("{:?}", count_metadata_nodes(&lines[0]));
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
    read_node(1, 0, &vals).0
}

fn read_node(count: u32, start: usize, values: &[u32]) -> (u32, usize) {
    // println!("------------- {:?} = {:?} / {:?}", count, start, values);
    let mut curr = start;
    let mut result = 0;
    for _ in 0..count {
        let count_nodes = values[curr];
        curr += 1;
        let count_meta = values[curr] as usize;
        curr += 1;
        // println!("header {:?} / {}", count_nodes, count_meta);
        let children = read_node(count_nodes, curr, values);
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

fn count_metadata_nodes(input: &str) -> u32 {
    let vals: Vec<u32> = input
        .split("\n")
        .flat_map(|s| s.split(" "))
        .map(|s| u32::from_str_radix(s, 10))
        .filter_map(|n| match n {
            Err(_) => None,
            Ok(v) => Some(v),
        })
        .collect();
    // node_values(1, 0, &vals).0
    read_one_node(0, &vals).0
}

fn node_values(count: u32, start: usize, values: &[u32]) -> (u32, usize, Vec<u32>) {
    let mut children: Vec<u32> = Vec::new();
    let mut curr = start;
    let mut result = 0;
    for _ in 0..count {
        let count_nodes = values[curr];
        curr += 1;
        let count_meta = values[curr] as usize;
        curr += 1;

        let c = node_values(count_nodes, curr, values);
        curr = c.1;
        if count_nodes == 0 {
            let meta: u32 = values[curr..curr + count_meta].iter().sum();
            result += meta;
        } else {

        }
        curr += count_meta;
    }
    (result, curr, children)
}

fn read_one_node(start: usize, values: &[u32]) -> (u32, usize) {
    let mut curr = start;
    let mut result = 0;
    let count_nodes = values[curr];
    curr += 1;
    let count_meta = values[curr] as usize;
    curr += 1;

    let mut children: Vec<u32> = Vec::new();

    for _ in 0..count_nodes {
        let child = read_one_node(curr, values);
        curr = child.1;
        children.push(child.0);
    }

    let start_meta = curr;
    curr += count_meta;
    if count_nodes == 0 {
        let meta: u32 = values[start_meta..curr].iter().sum();
        result = meta;
    } else {
        // println!("children : {:?} / {:?}", children, &values[start_meta..curr]);
        let child_values: u32 = values[start_meta..curr]
            .iter()
            .map(|index| index - 1)
            .map(|meta| {
                // println!("meta {:?} : {:?} => {:?}",children, meta, children.get(meta as usize));
                match children.get(meta as usize) {
                    None => 0,
                    Some(value) => *value,
                }
            })
            .sum();
        // println!(" == {:?}", child_values);
        result = child_values;
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
    #[test]
    fn test_count_metadata_nodes_1() {
        assert_eq!(count_metadata_nodes("0 2 1 3\n"), 4);
    }
    #[test]
    fn test_count_metadata_nodes_2() {
        assert_eq!(count_metadata_nodes("1 3 0 1 8 1 1 3\n"), 16);
    }
    #[test]
    fn test_count_metadata_nodes() {
        assert_eq!(
            count_metadata_nodes("2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2\n"),
            66
        );
    }

}
