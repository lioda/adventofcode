extern crate regex;

use regex::Regex;
use std::ops::Add;
use std::rc::Rc;
use std::str::FromStr;

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
        println!("{:?}", order_steps(&lines));
    } else if mode == "b" {
        println!("{:?}", split_steps(&lines, 60, 5));
    }

    Ok(())
}

#[derive(Debug)]
struct Link {
    before: String,
    after: String,
}

#[derive(Debug)]
struct Steps {
    steps: HashSet<String>,
    links: Vec<Link>,
}

impl Steps {
    fn new() -> Steps {
        Steps {
            steps: HashSet::new(),
            links: Vec::new(),
        }
    }
    fn add(self: &mut Steps, before: String, after: String) {
        self.steps.insert(before.clone());
        self.steps.insert(after.clone());
        self.links.push(Link {
            before: before,
            after: after,
        });
    }

    fn heads(self: &Steps, used: &str) -> Vec<String> {
        let afters: Vec<String> = self.links.iter().map(|link| link.after.clone()).collect();
        let heads: Vec<String> = self
            .steps
            .iter()
            .filter(|step| !afters.contains(step))
            .filter(|s| !used.contains(*s))
            .map(|s| s.clone())
            .collect();
        heads
    }

    fn next(self: &Steps, last: String, used: &str) -> Vec<String> {
        let mut heads = self.heads(used);
        if last.len() == 0 {
            return heads;
        }
        let mut nexts: Vec<String> = self
            .links
            .iter()
            .filter(|link| link.before == last)
            .map(|link| link.after.clone())
            .filter(|step| !used.contains(step))
            .collect();
        heads.append(&mut nexts);
        heads
    }

    fn heads_with_working(self: &Steps, used: &str, working: &[String]) -> Vec<String> {
        let afters: Vec<String> = self.links.iter().map(|link| link.after.clone()).collect();
        let heads: Vec<String> = self
            .steps
            .iter()
            .filter(|step| !afters.contains(step))
            .filter(|s| !used.contains(*s))
            .filter(|s| !working.contains(*s))
            .map(|s| s.clone())
            .collect();
        heads
    }

    fn next_with_working(
        self: &Steps,
        last: String,
        used: &str,
        working: Vec<String>,
    ) -> Vec<String> {
        println!(
            "next for {:?}, used: {}, working: {:?}",
            last, used, working
        );
        let mut heads = self.heads_with_working(used, &working[..]);
        if last.len() == 0 {
            return heads;
        }
        let mut nexts: Vec<String> = self
            .links
            .iter()
            .filter(|link| link.before == last)
            .map(|link| link.after.clone())
            .filter(|step| !used.contains(step))
            .filter(|step| !working.contains(step))
            .collect();
        heads.append(&mut nexts);
        heads
    }

    fn is_unavailable(self: &Steps, step: &str, used: &str) -> bool {
        let count_before = self
            .links
            .iter()
            .filter(|link| link.after == step)
            .map(|link| link.before.clone())
            .filter(|step| !used.contains(step))
            .count();
        count_before != 0
    }

    fn len(self: &Steps) -> usize {
        self.steps.len()
    }
}

fn order_steps(input: &[&str]) -> String {
    let mut result = String::new();

    let re = Regex::new("Step ([A-Z]+) must be finished before step ([A-Z]+) can begin.")
        .expect("regex");
    let mut steps = Steps::new();
    for line in input {
        if line.len() == 0 {
            continue;
        }
        let captures = re.captures(line).expect("captures");
        let step_before = captures.get(1).expect("before").as_str();
        let step_after = captures.get(2).expect("after").as_str();
        // println!("{:?} -> {:?}", step_before, step_after);

        steps.add(String::from(step_before), String::from(step_after));
    }

    let mut i = 0; // emergency circuit breaker
    let mut possibilities = steps.next(String::new(), &result);
    while possibilities.len() > 0 && i < 100 {
        possibilities.sort();
        possibilities.dedup();
        // println!("possibilities {:?}", possibilities);
        let mut j = 0;
        let mut next = possibilities[j].clone();
        // println!("try {:?}", next);

        while steps.is_unavailable(&next, &result) {
            // println!("{:?} is unavailable", next);
            j += 1;
            next = possibilities[j].clone();
        }
        result.push_str(&next);
        // println!("result : {:?}", result);
        possibilities.remove(j);
        possibilities.append(&mut steps.next(next, &result).clone());

        i += 1;
    }

    result
}

struct Task {
    step: String,
    duration: u32,
}

fn split_steps(input: &[&str], add: u32, count_workers: u32) -> (u32, String) {
    let mut seconds = 0;
    let mut result = String::new();

    let re = Regex::new("Step ([A-Z]+) must be finished before step ([A-Z]+) can begin.")
        .expect("regex");
    let mut steps = Steps::new();
    for line in input {
        if line.len() == 0 {
            continue;
        }
        let captures = re.captures(line).expect("captures");
        let step_before = captures.get(1).expect("before").as_str();
        let step_after = captures.get(2).expect("after").as_str();
        // println!("{:?} -> {:?}", step_before, step_after);

        steps.add(String::from(step_before), String::from(step_after));
    }

    let mut workers: Vec<Option<(u32, String)>> = Vec::new();
    for _ in 0..count_workers {
        workers.push(None);
    }

    // let mut working: Vec<String> = Vec::new();
    let mut possibilities: Vec<String> = Vec::new();
    let mut last: Vec<String> = vec![String::from("")];

    while result.len() < steps.len() && seconds < 20 {
        println!("==== second {:?}", seconds);

        workers = workers
            .iter()
            .map(|o| match o {
                None => None,
                Some(t) => {
                    let task = (t.0 - 1, t.clone().1);
                    // task.0 -= 1;
                    println!("working on {:?} => {:?}", t, task);
                    if task.0 == 0 {
                        println!("-- task complete",);
                        last.push(task.1.clone());
                        result.push_str(&task.1);
                        return None;
                    }
                    println!("-- task still running",);
                    return Some(task);
                }
            })
            .collect();

        for l in last.clone() {
            possibilities.append(
                &mut steps.next_with_working(
                    l.clone(),
                    &result,
                    workers
                        .iter()
                        .filter(|o| o.is_some())
                        .map(|w| w.clone().expect("none").1)
                        .collect(),
                ),
            );
        }
        last.clear();
        possibilities.sort();
        possibilities.dedup();

        println!("possibilities {:?}", possibilities);
        workers = workers
            .iter()
            .map(|o| match o {
                Some(t) => {
                    // let task = (t.0 - 1, t.clone().1);
                    // // task.0 -= 1;
                    // println!("working on {:?} => {:?}", t, task);
                    // if task.0 == 0 {
                    //     println!("-- task complete",);
                    //     last.push(task.1.clone());
                    //     result.push_str(&task.1);
                    //     return None;
                    // }
                    // println!("-- task still running",);
                    // return Some(task);
                    return Some(t.clone());
                }
                None => {
                    if possibilities.is_empty() {
                        println!("worker has nothing to do");
                        return None;
                    }
                    let step = possibilities.remove(0).clone();
                    let duration = step.chars().next().expect("char") as u32 - 'A' as u32 + 1;
                    let task = (duration, step);
                    println!("worker start {:?}", task);
                    return Some(task);
                    // return Some(&'static mut Task {
                    //     duration: 1,
                    //     step: possibilities.remove(0).clone(),
                    // });
                    // return None;
                }
            })
            .collect();
        println!("workers {:?}", workers);
        seconds += 1;
    }

    (seconds, result)
}

#[cfg(test)]
mod tests {
    // Note this useful idiom: importing names from outer (for mod tests) scope.
    use super::*;

    #[test]
    fn test_parse_points() {
        assert_eq!(
            order_steps(&[
                "Step C must be finished before step A can begin.",
                "Step C must be finished before step F can begin.",
                "Step A must be finished before step B can begin.",
                "Step A must be finished before step D can begin.",
                "Step B must be finished before step E can begin.",
                "Step D must be finished before step E can begin.",
                "Step F must be finished before step E can begin.",
                ""
            ]),
            "CABDFE"
        );
    }

    #[test]
    fn test_split_steps() {
        assert_eq!(
            split_steps(
                &[
                    "Step C must be finished before step A can begin.",
                    "Step C must be finished before step F can begin.",
                    "Step A must be finished before step B can begin.",
                    "Step A must be finished before step D can begin.",
                    "Step B must be finished before step E can begin.",
                    "Step D must be finished before step E can begin.",
                    "Step F must be finished before step E can begin.",
                    ""
                ],
                0,
                2
            ),
            (15, String::from("CABFDE"))
        );
    }

    #[test]
    fn test_parse_points_many_heads() {
        assert_eq!(
            order_steps(&[
                "Step C must be finished before step A can begin.",
                "Step C must be finished before step F can begin.",
                "Step A must be finished before step B can begin.",
                "Step A must be finished before step D can begin.",
                "Step B must be finished before step E can begin.",
                "Step D must be finished before step E can begin.",
                "Step F must be finished before step E can begin.",
                "Step G must be finished before step B can begin.",
                ""
            ]),
            "CADFGBE"
        );
    }
}
