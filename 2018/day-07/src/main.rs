extern crate regex;

use regex::Regex;
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
    }

    Ok(())
}

#[derive(Debug, PartialEq, Eq, Hash)]
struct Step {
    name: String,
    next: Vec<Step>,
}

#[derive(Debug)]
struct Steps {
    steps: HashMap<String, Step>,
}

impl Steps {
    fn after(self: &mut Steps, name: String) -> &Step {
        let def = Step {
            name: name.clone(),
            next: Vec::new(),
        };
        let step = self.steps.entry(name).or_insert(def);
        // let step = self.steps.get(&name).unwrap_or(def.0);
        step
        // &def
    }
    fn add(self: &mut Steps, name: String, after: Step) {
        //*self.steps.get(&name).expect("get after")
        self.steps
            .entry(name.clone())
            .or_insert(Step {
                name: name,
                next: Vec::new(),
            })
            .next
            .push(after);
    }
}

fn order_steps(input: &[&str]) -> String {
    let result = String::new();

    let re = Regex::new("Step ([A-Z]+) must be finished before step ([A-Z]+) can begin.")
        .expect("regex");
    // let mut steps: HashMap<&str, Step> = HashMap::new();
    let mut steps = Steps {
        steps: HashMap::new(),
    };
    for line in input {
        if line.len() == 0 {
            continue;
        }
        let captures = re.captures(line).expect("captures");
        let step_before = captures.get(1).expect("before").as_str();
        let step_after = captures.get(2).expect("after").as_str();
        println!("{:?} -> {:?}", step_before, step_after);

        // let after = steps.get(step_after); //.or_insert(Step{name: step_after, next: Vec::new()});
        let after = steps.after(String::from(step_after));

        // steps.entry(step_before).or_insert(Step {
        //     name: step_before,
        //     next: Vec::new(),
        // });

        let def = Step {
            name: String::from(step_after),
            next: Vec::new(),
        };

        // let after = steps.after()

        steps.add(String::from(step_before), def)
    }

    println!("{:?}", steps);

    result
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
}
