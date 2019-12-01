use std::iter::Iterator;

pub fn exo01(masses: Vec<i64>)-> i64 {
    let fuel = masses.into_iter().map(|e| e / 3 - 2).fold(0, |sum, fuel| sum + fuel);
    fuel
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::fs::File;
    use std::io::BufReader;
    use std::io::prelude::*;

    fn read_input() -> Vec<i64> {
        let file = File::open("src/input.txt").unwrap();
        let buf_reader = BufReader::new(file);
        buf_reader.lines().map(|r| r.unwrap()).map(|s| i64::from_str_radix(&s, 10).unwrap()).collect()
    }

    #[test]
    fn it_compute_fuel_for_int_divisions() {
        assert_eq!(exo01(vec![12]), 2); 
    }

    #[test]
    fn it_compute_fuel_with_rounded_divisions() {
        assert_eq!(exo01(vec![13]), 2); 
        assert_eq!(exo01(vec![14]), 2); 
        assert_eq!(exo01(vec![1969]), 654); 
        assert_eq!(exo01(vec![100756]), 33583); 
    }

    #[test]
    fn it_sums_fuels() {
        assert_eq!(exo01(vec![13, 14, 1969]), 658); 
    }

    #[test]
    fn do_exo01() {
        assert_eq!(exo01(read_input()), 3291760); 
    }
}
