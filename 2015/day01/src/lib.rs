#[derive(PartialEq, Debug)]
pub struct Floor {
    current: i64,
}


pub fn parse01(s: &str) -> Floor {
    let mut floor = 0;
    for c in s.chars() {
        match c {
            '(' => floor += 1,
            _ => floor -= 1,
        }
    }
    Floor{current: floor}
}

pub fn find_enter_basement(s: &str) -> u64 {
    let mut idx = 1;
    let mut floor = 0;
    for c in s.chars() {
        match c {
            '(' => floor += 1,
            _ => floor -= 1,
        }
        if floor == -1 {
            return idx;
        }
        idx += 1;
    }
    0
}


#[cfg(test)]
mod tests {
    use super::*;
    use std::fs::File;
    use std::io::BufReader;
    use std::io::prelude::*;

    fn read_input() -> String {
        let file = File::open("src/input.txt").unwrap();
        let mut buf_reader = BufReader::new(file);
        let mut contents = String::new();
        buf_reader.read_to_string(&mut contents).unwrap();
        contents.clone()
    }

    #[test]
    fn it_parse_open_and_close() {
        assert_eq!(parse01("(())"), Floor{ current: 0 });
    }

    #[test]
    fn it_parse_more_open_than_close() {
        assert_eq!(parse01("((("), Floor{ current: 3 });
        assert_eq!(parse01("(()(()("), Floor{ current: 3 });
    }

    #[test]
    fn it_parse_more_close_than_open() {
        assert_eq!(parse01(")))"), Floor{ current: -3 });
        assert_eq!(parse01(")())())"), Floor{ current: -3 });
    }

    #[test]
    fn exo01() {
        let input = read_input();
        assert_eq!(parse01(&input), Floor{ current: 280})
    }

    ///////////////////////

    #[test]
    fn it_find_first_char() {
        assert_eq!(find_enter_basement(")"), 1);
    }
    #[test]
    fn it_find_last_char() {
        assert_eq!(find_enter_basement("()())"), 5);
    }
    #[test]
    fn exo02() {
        let input = read_input();
        assert_eq!(find_enter_basement(&input), 1797);
    }
}