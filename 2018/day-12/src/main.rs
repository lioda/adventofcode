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
        // let pattern = find_pattern(10000000, 25, &lines);
        // println!("{:?}", pattern.0);
        // for line in pattern.1 {
        //     println!("{:?}", line);
        // }
        println!("result : {:?}", Plants::new(&lines).goto_generation(20));
    } else if mode == "b" {
        println!(
            "result : {:?}",
            Plants::new(&lines).goto_generation2(50000000000)
        );
    }

    Ok(())
}

#[derive(PartialEq, Eq, Debug)]
struct Plants {
    state: HashMap<i32, String>,
    patterns: HashMap<String, String>,
}

impl Plants {
    fn new(input: &[&str]) -> Plants {
        let initial_state = input[0].replace("initial state: ", "").replace("\n", "");
        let mut state: HashMap<i32, String> = HashMap::new();
        // for x in 0..initial_state.len() {
        //     state.insert(x as i32, String::from(initial_state.chars()[x]));
        // }
        let mut x: i32 = 0;
        initial_state.chars().for_each(|c| {
            state.insert(x, c.to_string());
            x += 1;
        });
        let mut pats: HashMap<String, String> = HashMap::new();
        for line in &input[1..] {
            if line.len() <= 1 {
                continue;
            }
            let replace = line.replace("\n", "");
            let mut splitted = replace.split(" => ");
            // println!("<{}> splitted : {:?} ", replace, splitted);
            let p = splitted.next().expect("pattern");
            // println!("============ <{}> ", p);
            let r = splitted.next().expect("replacement");
            // println!("============ <{}> ", r);
            pats.insert(String::from(p), String::from(r));
        }
        Plants {
            state: state,
            patterns: pats,
        }
    }

    fn goto_generation(&mut self, generation: u64) -> (String, i32) {
        // let mut new_state_display = String::new();
        // let mut count = 0;
        let mut result = (String::new(), 0);
        for igen in 0..generation {
            let gen = self.next_generation();
            self.state = gen.2;
            result = (gen.0, gen.1);
            if (igen) % 1000 == 0 {
                println!("gen {} : {:?}", igen + 1, result);
            }
        }
        result
        // (new_state_display, count)
    }
    fn goto_generation2(&mut self, generation: u64) -> i32 {
        // let mut new_state_display = String::new();
        // let mut count = 0;
        let mut result = 0;
        for igen in 0..generation {
            let gen = self.next_generation2();
            self.state = gen.1;
            result = gen.0;
            if (igen + 1) % 1000 == 0 || (igen + 1) == 20 {
                println!("\ngen {} : {:?}", igen + 1, result);
            }/* else {
                print!("{:?} ", igen);
            }*/
        }
        result
        // (new_state_display, count)
    }

    fn next_generation(&self) -> (String, i32, HashMap<i32, String>) {
        let min = self.state.iter().map(|e| e.0).min().expect("min") - 2;
        let max = self.state.iter().map(|e| e.0).max().expect("max") + 2;

        let mut new_state_display = String::new();
        let mut new_state: HashMap<i32, String> = HashMap::new();
        let mut count = 0;

        for i in min..=max {
            let l2 = self
                .state
                .get(&(i - 2))
                .map(|s| s.clone())
                .unwrap_or(String::from("."));
            let l1 = self
                .state
                .get(&(i - 1))
                .map(|s| s.clone())
                .unwrap_or(String::from("."));
            let curr = self
                .state
                .get(&i)
                .map(|s| s.clone())
                .unwrap_or(String::from("."));
            let r1 = self
                .state
                .get(&(i + 1))
                .map(|s| s.clone())
                .unwrap_or(String::from("."));
            let r2 = self
                .state
                .get(&(i + 2))
                .map(|s| s.clone())
                .unwrap_or(String::from("."));

            let mut pattern = String::new();
            pattern.push_str(&l2);
            pattern.push_str(&l1);
            pattern.push_str(&curr);
            pattern.push_str(&r1);
            pattern.push_str(&r2);

            let replacement = self
                .patterns
                .get(&pattern)
                .map(|s| s.clone())
                .unwrap_or(String::from("."));
            // .expect(&format!("find pattern {}", pattern));

            // self.state.entry(i); //.insert(i, replacement.clone());
            new_state_display.push_str(&replacement);
            // println!("{} / {:?}", i, replacement);
            if replacement == "#" {
                count += i;
            }
            new_state.insert(i, replacement);
        }
        // self.state = new_state;
        (
            String::from(new_state_display.trim_matches('.')),
            count,
            new_state,
        )
    }

    fn next_generation2(&self) -> (i32, HashMap<i32, String>) {
        let min = self.state.iter().map(|e| e.0).min().expect("min") - 2;
        let max = self.state.iter().map(|e| e.0).max().expect("max") + 2;

        // let mut new_state_display = String::new();
        let mut new_state: HashMap<i32, String> = HashMap::new();
        let mut count = 0;

        for i in min..=max {
            let l2 = self
                .state
                .get(&(i - 2))
                .map(|s| s.clone())
                .unwrap_or(String::from("."));
            let l1 = self
                .state
                .get(&(i - 1))
                .map(|s| s.clone())
                .unwrap_or(String::from("."));
            let curr = self
                .state
                .get(&i)
                .map(|s| s.clone())
                .unwrap_or(String::from("."));
            let r1 = self
                .state
                .get(&(i + 1))
                .map(|s| s.clone())
                .unwrap_or(String::from("."));
            let r2 = self
                .state
                .get(&(i + 2))
                .map(|s| s.clone())
                .unwrap_or(String::from("."));

            let mut pattern = String::new();
            pattern.push_str(&l2);
            pattern.push_str(&l1);
            pattern.push_str(&curr);
            pattern.push_str(&r1);
            pattern.push_str(&r2);

            let replacement = self
                .patterns
                .get(&pattern)
                .map(|s| s.clone())
                .unwrap_or(String::from("."));
            // .expect(&format!("find pattern {}", pattern));

            // self.state.entry(i); //.insert(i, replacement.clone());
            // new_state_display.push_str(&replacement);
            // println!("{} / {:?}", i, replacement);
            if replacement == "#" {
                count += i;
            }
            new_state.insert(i, replacement);
        }
        // self.state = new_state;
        (
            // String::from(new_state_display.trim_matches('.')),
            count, new_state,
        )
    }
}

#[cfg(test)]
mod tests {
    // Note this useful idiom: importing names from outer (for mod tests) scope.
    use super::*;

    fn patterns(ps: &[(&str, &str)]) -> HashMap<String, String> {
        let mut result = HashMap::new();

        for pattern in ps {
            result.insert(String::from(pattern.0), String::from(pattern.1));
        }

        result
    }

    #[test]
    fn test_generation_1() {
        let mut plants = Plants::new(&[
            "initial state: #..#.#..##......###...###\n",
            "\n",
            "...## => #\n",
            "..#.. => #\n",
            ".#... => #\n",
            ".#.#. => #\n",
            ".#.## => #\n",
            ".##.. => #\n",
            ".#### => #\n",
            "#.#.# => #\n",
            "#.### => #\n",
            "##.#. => #\n",
            "##.## => #\n",
            "###.. => #\n",
            "###.# => #\n",
            "####. => #\n",
        ]);
        assert_eq!(
            plants.goto_generation(1),
            // (String::from("#....##....#####...#######....#.#..##"), 325)
            (String::from("#...#....#.....#..#..#..#"), 91)
        );
    }

    #[test]
    fn test_generation_3() {
        let mut plants = Plants::new(&[
            "initial state: #..#.#..##......###...###\n",
            "\n",
            "...## => #\n",
            "..#.. => #\n",
            ".#... => #\n",
            ".#.#. => #\n",
            ".#.## => #\n",
            ".##.. => #\n",
            ".#### => #\n",
            "#.#.# => #\n",
            "#.### => #\n",
            "##.#. => #\n",
            "##.## => #\n",
            "###.. => #\n",
            "###.# => #\n",
            "####. => #\n",
        ]);
        assert_eq!(
            plants.goto_generation(3),
            // (String::from("#....##....#####...#######....#.#..##"), 325)
            (String::from("#.#...#..#.#....#..#..#...#"), 102)
        );
    }

    #[test]
    fn test_parse() {
        let plants = Plants::new(&[
            "initial state: #..#.#\n",
            "\n",
            "...## => #\n",
            ".##.. => .\n",
            "#.#.# => #\n",
        ]);
        let mut state: HashMap<i32, String> = HashMap::new();
        state.insert(0, String::from("#"));
        state.insert(1, String::from("."));
        state.insert(2, String::from("."));
        state.insert(3, String::from("#"));
        state.insert(4, String::from("."));
        state.insert(5, String::from("#"));
        assert_eq!(
            plants,
            Plants {
                state: state,
                patterns: patterns(&[("...##", "#"), (".##..", "."), ("#.#.#", "#"),]),
            }
        );
    }

    #[test]
    fn test_exo_1() {
        let mut plants = Plants::new(&[
            "initial state: #..#.#..##......###...###\n",
            "\n",
            "...## => #\n",
            "..#.. => #\n",
            ".#... => #\n",
            ".#.#. => #\n",
            ".#.## => #\n",
            ".##.. => #\n",
            ".#### => #\n",
            "#.#.# => #\n",
            "#.### => #\n",
            "##.#. => #\n",
            "##.## => #\n",
            "###.. => #\n",
            "###.# => #\n",
            "####. => #\n",
        ]);
        assert_eq!(
            plants.goto_generation(20),
            (String::from("#....##....#####...#######....#.#..##"), 325)
        );
    }
}
