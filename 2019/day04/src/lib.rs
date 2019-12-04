pub fn two_adjacent_digits_equal(number: i64) -> bool {
    // let num_as_str = number.to_string();
    let mut num = number;
    // let splitted = num_as_str.split(".");
    // let len = splitted.length();
    // splitted.reduce(|a,b| a == b);
    // let mut last = "";
    let mut last = -1;
    while num > 0 {
        let tenth = num / 10;
        let digit = num - (tenth * 10);
        // println!("compare <{}> / <{}>", last, digit);
        if last == digit {
            // println!("==> true");
            return true;
        }
        num = tenth;
        last = digit;
    }
    // println!("==> true");
    false
}

pub fn increase_digits(number: i64) -> bool {
    let mut num = number;
    let mut last = 10;
    while num > 0 {
        let tenth = num / 10;
        let digit = num - (tenth * 10);
        if last < digit {
            return false;
        }
        num = tenth;
        last = digit;
    }
    true
}

pub fn exo01(begin: i64, end: i64) -> u64 {
    (begin..end).fold(0, |count, i| {
        count
            + if increase_digits(i) && two_adjacent_digits_equal(i) {
                1
            } else {
                0
            }
    })
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_works() {
        assert_eq!(2 + 2, 4);
    }

    #[test]
    fn two_adjacent_digits_equal_works() {
        assert_eq!(two_adjacent_digits_equal(111111), true);
        assert_eq!(two_adjacent_digits_equal(123789), false);
        assert_eq!(two_adjacent_digits_equal(122345), true);
    }

    #[test]
    fn increase_digits_works() {
        assert_eq!(increase_digits(122340), false);
        assert_eq!(increase_digits(111111), true);
        assert_eq!(increase_digits(123789), true);
        assert_eq!(increase_digits(122345), true);
    }

    #[test]
    fn do_exo01() {
        assert_eq!(exo01(234208, 765869), 1246);
    }
}
