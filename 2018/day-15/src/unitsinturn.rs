use position::Position;

#[derive(Debug)]
pub struct UnitsInTurn {
    curr: usize,
    vec: Vec<Position>,
}
impl UnitsInTurn {
    pub fn empty() -> UnitsInTurn {
        UnitsInTurn {
            curr: 0,
            vec: Vec::new(),
        }
    }

    pub fn new(vec: Vec<Position>) -> UnitsInTurn {
        UnitsInTurn { curr: 0, vec: vec }
    }

    pub fn next(&mut self) -> Option<Position> {
        let index = self.curr;
        self.curr = self.curr + 1;
        self.vec.get(index).map(|p| p.clone())
    }

    pub fn remove(&mut self, pos: &Position) {
        let mut index = -1;
        for i in self.curr..self.vec.len() {
            if self.vec[i] == *pos {
                index = i as i32;
                break;
            }
        }
        if index < 0 {
            return;
        }
        self.vec.remove(index as usize);
        // self.vec.remove_item(pos);
    }
}
