#[derive(Debug, PartialEq, Eq, Clone)]
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
}
