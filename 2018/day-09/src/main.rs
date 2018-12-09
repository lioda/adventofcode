use std::collections::{HashMap, LinkedList, VecDeque};
use std::env;
use std::fmt;
use std::fs;
use std::io;

fn main() -> io::Result<()> {
    let args: Vec<String> = env::args().collect();
    if args.len() < 2 {
        panic!("a or b ?");
    }
    let mode = &args[1];

    // let input = fs::read_to_string("src/input.txt")?;

    if mode == "a" {
        println!("{:?}", play1(470, 72170));
    } else if mode == "b" {
        println!("{:?}", play1(470, 72170 * 100));
    }

    Ok(())
}

// struct Circle {
//     len: usize,
//     list: Vec<(u32, usize, usize)>,
// }

struct MarbleCircle {
    player: u32,
    curr: usize,
    head: usize,
    circle: Vec<(u32, usize, usize)>,
}
impl MarbleCircle {
    fn new() -> MarbleCircle {
        let mut circle = MarbleCircle {
            player: 0,
            curr: 0,
            head: 0,
            circle: Vec::with_capacity(999999999),
        };
        // circle.circle.push(0);
        // circle.circle.len += 1;
        circle.circle.push((0, 0, 0));
        circle
    }

    fn skip(&self, skip: i32) -> usize {
        let mut curr = self.curr;
        let mut skipped: i32 = 0;
        let add = if skip < 0 { -1 } else { 1 };
        while skipped.abs() < skip.abs() {
            let node = self.circle[curr];
            curr = if skip < 0 { node.1 } else { node.2 };
            skipped += add;
        }
        curr
    }

    fn insert(&mut self, index: usize, marble: u32) -> usize {
        let node = self.circle[index];
        let next_index = self.circle.len();

        if index == node.1 {
            let new_node = (marble, index, index);
            let node = (node.0, next_index, next_index);
            self.circle[index] = node;
            self.circle.push(new_node);
        } else if node.1 == node.2 {
            let previous = self.circle[node.1];
            let previous = (previous.0, previous.1, next_index);
            let new_node = (marble, node.1, index);
            let after = (node.0, next_index, node.2);
            self.circle[node.1] = previous;
            self.circle[index] = after;
            self.circle.push(new_node);
        } else {
            let previous = self.circle[node.1];
            let previous = (previous.0, previous.1, next_index);
            let new_node = (marble, node.1, index);
            let after = (node.0, next_index, node.2);
            self.circle[node.1] = previous;
            self.circle[index] = after;
            self.circle.push(new_node);
        }

        // println!(
        //     "inserted {} in {} : {:?} / new curr: {}",
        //     marble, index, self.circle, next_index
        // );

        next_index
    }

    // fn push(&mut self, marble: u32) {
    // let node = self.circle.list[self.head];
    // let node = (node.0, index, node.2);
    // let new_node = (marble, node.1, index);
    // self.circle.list.push(node);
    // self.circle.list.push(new_node);
    // self.insert(0, marble);
    //     let head = self.circle.list[self.head];
    //     let head = (head.0, self.circle.list.len() + 1, head.2);
    //     let new_node = (marble, self.head);
    // }

    fn add(&mut self, player: u32, marble: u32) -> u32 {
        self.player = player;
        if marble % 23 == 0 {
            return self.add_23(marble);
        }
        let index = self.skip(2);
        self.curr = self.insert(index, marble);
        0
    }
    //
    fn add_23(&mut self, add: u32) -> u32 {
        let remove_index: usize = self.skip(-7);
        // println!(
        //     "add_23 : remove index {:?} in {:?}",
        //     self.circle[remove_index], self.circle
        // );
        let value = self.remove(remove_index);
        // self.curr = remove_index % self.circle.len();
        // println!("add_23 : removed circle ({}) {:?}", self.curr, self.circle);
        add + value
    }

    fn remove(&mut self, index: usize) -> u32 {
        let to_remove = self.circle[index];
        let previous = self.circle[to_remove.1];
        let previous = (previous.0, previous.1, to_remove.2);
        let after = self.circle[to_remove.2];
        let after = (after.0, to_remove.1, after.2);

        self.circle[to_remove.1] = previous;
        self.circle[to_remove.2] = after;

        // println!("====== new curr {:?}", to_remove.2);
        self.curr = to_remove.2;

        to_remove.0
    }

    // fn remove_index(&self) -> usize {
    //     if self.curr >= 7 {
    //         self.curr - 7
    //     } else {
    //         self.circle.len() - 7 + self.curr
    //     }
    // }

    fn printable(&self) -> Vec<u32> {
        let mut curr = self.head;
        let mut result = Vec::new();
        // result.push(self.circle.list[curr])
        let mut breaker = 0;
        loop {
            breaker += 1;
            if breaker > 100 {
                panic!("breaker");
            }
            let node = self.circle[curr];
            // println!("print {} => {:?}", curr, node);
            result.push(node.0);
            if node.2 == 0 {
                break;
            }
            curr = node.2;
        }
        result
    }

    fn printable_curr(&self) -> usize {
        let mut real_curr = 0;
        let mut curr = self.head;
        let curr_marble = self.circle[self.curr].0;
        // let mut result = Vec::new();
        // result.push(self.circle.list[curr])
        let mut breaker = 0;
        loop {
            breaker += 1;
            if breaker > 10 {
                panic!("breaker");
            }
            let node = self.circle[curr];
            // println!("print {} => {:?} (search {})", curr, node, curr_marble);
            // result.push(node.0);
            if node.0 == curr_marble {
                break;
            }
            curr = node.2;
            real_curr += 1;
        }
        real_curr
    }
}
impl std::fmt::Debug for MarbleCircle {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "[{}] ", self.player).expect(&format!("writing player {}", self.player));
        let printable = self.printable();
        let selected = self.circle[self.curr].0;
        printable.iter().for_each(|marble| {
            let marble = if *marble == selected {
                format!("({})", marble)
            } else {
                marble.to_string()
            };
            write!(f, " {} ", marble).expect(&format!("writing marble {}", marble));
        });
        Ok(())
    }
}

fn play1(players: u32, marbles: u32) -> u32 {
    let mut scores: HashMap<u32, u32> = HashMap::new();
    let mut circle = MarbleCircle::new();
    for marble in 1..=marbles {
        // if marble % 10000 == 0 {
        //     println!("{:?} / {}", marble, marbles);
        // }
        let player = marble % players + 1;
        // println!(
        //     "player {} puts marble {} in \n ======= {:?}",
        //     player, marble, circle
        // );
        let value = circle.add(player, marble);
        // println!(" ======= {:?}\n => {}", circle, value);
        scores
            .entry(player)
            .and_modify(|e| *e = *e + value)
            .or_insert(value);
    }
    // println!("{:?}", scores);
    *scores.values().max().expect("maximum")
}

#[cfg(test)]
mod tests {
    // Note this useful idiom: importing names from outer (for mod tests) scope.
    use super::*;

    #[test]
    fn test_circle_add_first() {
        let mut circle = MarbleCircle::new();
        circle.add(1, 1);
        assert_eq!(circle.printable_curr(), 1);
        assert_eq!(&circle.printable(), &vec![0, 1]);
    }
    #[test]
    fn test_circle_add_many() {
        let mut circle = MarbleCircle::new();
        circle.add(1, 1);
        circle.add(2, 2);
        circle.add(3, 3);
        circle.add(1, 4);
        println!("{:?}", circle);
        assert_eq!(&circle.printable(), &vec![0, 4, 2, 1, 3]);
        assert_eq!(circle.printable_curr(), 1);
    }
    #[test]
    fn test_circle_add_23() {
        let mut circle = MarbleCircle::new();
        circle.add(1, 1);
        circle.add(2, 2);
        circle.add(3, 3);
        circle.add(3, 4);
        circle.add(4, 5);
        circle.add(5, 6);
        circle.add(6, 7);
        circle.add(7, 8);
        assert_eq!(&circle.printable(), &vec![0, 8, 4, 2, 5, 1, 6, 3, 7]);
        println!("{:?}", circle);
        assert_eq!(circle.add(1, 23), 23 + 2);
        // println!("{:?}", circle);
        assert_eq!(&circle.printable(), &vec![0, 8, 4, 5, 1, 6, 3, 7]);
        assert_eq!(circle.printable_curr(), 3);
    }

    #[test]
    fn test_circle_add_46() {
        let mut circle = MarbleCircle::new();
        circle.add(1, 1);
        circle.add(2, 2);
        circle.add(3, 3);
        circle.add(3, 4);
        circle.add(4, 5);
        circle.add(5, 6);
        circle.add(6, 7);
        circle.add(7, 8);
        assert_eq!(&circle.printable(), &vec![0, 8, 4, 2, 5, 1, 6, 3, 7]);
        assert_eq!(circle.add(1, 46), 46 + 2);
        assert_eq!(&circle.printable(), &vec![0, 8, 4, 5, 1, 6, 3, 7]);
        assert_eq!(circle.printable_curr(), 3);
    }

    #[test]
    fn test_play1() {
        assert_eq!(play1(9, 25), 32);
    }

    #[test]
    fn test_play1_a() {
        assert_eq!(play1(10, 1618), 8317);
    }
    #[test]
    fn test_play1_b() {
        assert_eq!(play1(13, 7999), 146373);
    }
    #[test]
    fn test_play1_c() {
        //17 players; last marble is worth 1104 points: high score is 2764
        assert_eq!(play1(17, 1104), 2764);
    }
    // 21 players; last marble is worth 6111 points: high score is 54718
    #[test]
    fn test_play1_d() {
        assert_eq!(play1(21, 6111), 54718);
    }
    // 30 players; last marble is worth 5807 points: high score is 37305
    #[test]
    fn test_play1_e() {
        assert_eq!(play1(30, 5807), 37305);
    }
}
