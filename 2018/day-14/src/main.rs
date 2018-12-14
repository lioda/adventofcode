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
        println!("result : {:?}", exo1(637061));
    } else if mode == "b" {
        // println!("result : {:?}", exo2(&lines));
    }

    Ok(())
}
#[derive(Debug, PartialEq, Eq)]
struct Recipes {
    elf1: usize,
    elf2: usize,
    recipes: Vec<u32>,
}

impl Recipes {
    fn new() -> Recipes {
        Recipes {
            elf1: 0,
            elf2: 1,
            recipes: vec![3, 7],
        }
    }

    fn len(&self) -> usize {
        self.recipes.len()
    }

    fn next(&mut self) {
        let v1 = self.recipes[self.elf1];
        let v2 = self.recipes[self.elf2];

        let v = v1 + v2;
        let mut new_recipes: Vec<u32> = v
            .to_string()
            .chars()
            .map(|c| c.to_string().parse::<u32>().expect("atoi"))
            .collect();
        self.recipes.append(&mut new_recipes);

        self.elf1 = (self.elf1 + (v1 as usize + 1)) % self.recipes.len();
        self.elf2 = (self.elf2 + (v2 as usize + 1)) % self.recipes.len();
    }

    fn last_10(&self, index: usize) -> String {
        // let reverse = self.recipes.clone();
        // reverse.reverse();
        let last10: Vec<String> = self.recipes[index..index + 10]
            .iter()
            .map(|i| i.to_string())
            .collect();
        // last10.reverse();
        last10.join("")

        // .join()
        // String::new()
    }
}

fn exo1(recipe_num: usize) -> String {
    let mut breaker = 0;
    let mut recipes = Recipes::new();

    while recipes.len() < recipe_num + 10 && breaker < 999999999 {
        recipes.next();
        breaker += 1;
    }

    recipes.last_10(recipe_num)
}

#[cfg(test)]
mod tests {
    // Note this useful idiom: importing names from outer (for mod tests) scope.
    use super::*;

    #[test]
    fn test_exo1() {
        assert_eq!(exo1(9), "5158916779");
        assert_eq!(exo1(5), "0124515891");
        assert_eq!(exo1(18), "9251071085");
        assert_eq!(exo1(2018), "5941429882");
    }

    #[test]
    fn test_first_recipes() {
        let mut recipes = Recipes::new();
        recipes.next();
        assert_eq!(
            recipes,
            Recipes {
                elf1: 0,
                elf2: 1,
                recipes: vec![3, 7, 1, 0],
            }
        );
    }

    #[test]
    fn test_many_next() {
        let mut recipes = Recipes::new();
        recipes.next();
        recipes.next();
        recipes.next();
        recipes.next();
        assert_eq!(
            recipes,
            Recipes {
                elf1: 0,
                elf2: 6,
                recipes: vec![3, 7, 1, 0, 1, 0, 1, 2],
            }
        );
    }

    #[test]
    fn test_last_10() {
        let recipes = Recipes {
            elf1: 0,
            elf2: 6,
            recipes: vec![3, 7, 1, 0, 1, 0, 1, 2, 4, 8, 6],
        };
        assert_eq!(recipes.last_10(1), "7101012486");
    }

}
