#[derive(Debug, PartialEq, Eq, Clone, Hash)]
pub struct Position {
    pub x: usize,
    pub y: usize,
}
impl Position {
    pub fn new(x: usize, y: usize) -> Position {
        Position { x: x, y: y }
    }

    pub fn add_y(&self, add: i32) -> Position {
        Position::new(self.x, (self.y as i32 + add) as usize)
    }
    pub fn add_x(&self, add: i32) -> Position {
        Position::new((self.x as i32 + add) as usize, self.y)
    }

    pub fn distance(&self, p: &Position) -> i32 {
        (self.x as i32 - p.x as i32).abs() + (self.y as i32 - p.y as i32).abs()
    }

    pub fn before(&self, p: &Position) -> bool {
        self.y < p.y || (self.y == p.y && self.x < p.x)
    }

    pub fn closest(&self, positions: &[Position]) -> Position {
        // println!("hesitate between {:?}", positions);
        let mut result = &Position::new(999999, 999999);
        let mut shortest = 99999999;
        for position in positions {
            let dist = position.distance(self);
            if dist < shortest || (dist == shortest && position.before(&result)) {
                //         // println!("====== {:?}", true);
                result = position;
                shortest = dist;
            }
        }
        result.clone()
    }
}

#[cfg(test)]
mod tests {
    // Note this useful idiom: importing names from outer (for mod tests) scope.
    use super::*;

    #[test]
    fn before() {
        assert_eq!(Position::new(1, 2).before(&Position::new(2, 2)), true);
        assert_eq!(Position::new(1, 2).before(&Position::new(1, 3)), true);
        assert_eq!(Position::new(1, 2).before(&Position::new(1, 1)), false);
        assert_eq!(Position::new(1, 2).before(&Position::new(0, 2)), false);
    }

    #[test]
    fn closest() {
        // let vec = vec![Position::new(1, 1), Position::new(3, 1)];
        assert_eq!(
            Position::new(4, 1).closest(&vec![Position::new(1, 1), Position::new(3, 1)]),
            Position::new(3, 1)
        );
    }
}
