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

struct MarbleCircle {
    player: u32,
    curr: usize,
    circle: Vec<u32>,
}
impl MarbleCircle {
    fn new() -> MarbleCircle {
        let mut circle = MarbleCircle {
            player: 0,
            curr: 0,
            circle: Vec::with_capacity(800000000),
        };
        circle.circle.push(0);
        circle
    }

    fn add(&mut self, player: u32, marble: u32) -> u32 {
        self.player = player;
        if marble % 23 == 0 {
            return self.add_23(marble);
        }
        let mut index = (self.curr + 2) % self.circle.len();
        if index == 0 {
            index = self.circle.len();
            self.circle.push(marble)
        } else {
            self.circle.insert(index, marble);
        }
        self.curr = index;
        0
    }

    fn add_23(&mut self, add: u32) -> u32 {
        // let remove_index = (self.curr - 7) % self.circle.len();
        let remove_index: usize = self.remove_index();
        let value = self.circle.remove(remove_index);
        // .expect(&format!("remove {}", remove_index));
        // let new_index = (remove_index + 1) % self.circle.len();
        self.curr = remove_index % self.circle.len();
        // println!("earn {:?}", add + value);
        add + value
    }

    fn remove_index(&self) -> usize {
        if self.curr >= 7 {
            self.curr - 7
        } else {
            self.circle.len() - 7 + self.curr
        }
    }
}
impl std::fmt::Debug for MarbleCircle {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "[{}] ", self.player).expect(&format!("writing player {}", self.player));
        let selected = self.circle[self.curr];
        self.circle.iter().for_each(|marble| {
            let marble = if *marble == selected {
                format!("({})", marble)
            } else {
                marble.to_string()
            };
            write!(f, " {} ", marble).expect(&format!("writing marble {}", marble));
        });
        // for marble in self.circle {
        //     let marble = if marble == self.curr as u32 {
        //         marble.to_string()
        //     } else {
        //         format!("({})", marble)
        //     };
        //     write!(f, " {} ", marble);
        // }
        Ok(())
    }
}

fn play1(players: u32, marbles: u32) -> u32 {
    let mut scores: HashMap<u32, u32> = HashMap::new();
    let mut circle = MarbleCircle::new();
    for marble in 1..=marbles {
        if marble % 10000 == 0 {
            println!("{:?} / {}", marble, marbles);
        }
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
        assert_eq!(circle.curr, 1);
        assert_eq!(&circle.circle, &vec![0, 1]);
    }
    #[test]
    fn test_circle_add_many() {
        let mut circle = MarbleCircle::new();
        circle.add(1, 1);
        circle.add(2, 2);
        circle.add(3, 3);
        circle.add(1, 4);
        assert_eq!(&circle.circle, &vec![0, 4, 2, 1, 3]);
        assert_eq!(circle.curr, 1);
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
        assert_eq!(&circle.circle, &vec![0, 8, 4, 2, 5, 1, 6, 3, 7]);
        assert_eq!(circle.add(1, 23), 23 + 2);
        assert_eq!(&circle.circle, &vec![0, 8, 4, 5, 1, 6, 3, 7]);
        assert_eq!(circle.curr, 3);
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
        assert_eq!(&circle.circle, &vec![0, 8, 4, 2, 5, 1, 6, 3, 7]);
        assert_eq!(circle.add(1, 46), 46 + 2);
        assert_eq!(&circle.circle, &vec![0, 8, 4, 5, 1, 6, 3, 7]);
        assert_eq!(circle.curr, 3);
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
