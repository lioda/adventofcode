#[derive(Clone, Debug)]
pub enum GridCell {
    Wall,
    Empty,
    Unit { character: Character, hp: i32 },
}

impl GridCell {
    pub fn is_foe(&self, g: &GridCell) -> bool {
        match g {
            GridCell::Unit {
                character: ch1,
                hp: _,
            } => match self {
                GridCell::Unit {
                    character: ch2,
                    hp: _,
                } => ch1.is_foe(ch2),
                _ => false,
            },
            _ => false,
        }

        // false
    }

    pub fn is_character(&self, ch: Character) -> bool {
        match self {
            GridCell::Unit { character, hp: _ } => *character == ch,
            _ => false,
        }
    }

    pub fn is_unit(&self) -> bool {
        match self {
            GridCell::Unit {
                character: _,
                hp: _,
            } => true,
            _ => false,
        }
    }
    pub fn is_empty(&self) -> bool {
        match self {
            GridCell::Empty => true,
            _ => false,
        }
    }

    pub fn get_hp(&self) -> i32 {
        match self {
            GridCell::Unit { character: _, hp } => *hp,
            _ => -1,
        }
    }

    pub fn hit(&mut self) {
        match self {
            GridCell::Unit { character: _, hp } => {
                *hp -= 3;
            }
            _ => (),
        }
    }

    pub fn is_dead(&self) -> bool {
        match self {
            GridCell::Unit { character: _, hp } => *hp <= 0,
            _ => false,
        }
    }

    pub fn display(&self) -> String {
        match self {
            GridCell::Empty => ".",
            GridCell::Wall => "#",
            GridCell::Unit {
                character: ch,
                hp: _,
            } => {
                if *ch == Character::Elf {
                    "E"
                } else {
                    "G"
                }
            }
        }
        .to_string()
    }

    pub fn display_hitpoints(&self) -> String {
        let (c, h) = match self {
            GridCell::Empty => ("", -1),
            GridCell::Wall => ("", -1),
            GridCell::Unit { character: ch, hp } => {
                if *ch == Character::Elf {
                    ("E", *hp)
                } else {
                    ("G", *hp)
                }
            }
        };
        if c == "" {
            return "".to_string();
        }
        format!("{}({})", c, h).to_string()
    }
}

// pub trait GridCell {
//     fn is_wall(&self) -> bool;
//     fn is_empty(&self) -> bool;
//     fn is_unit(&self) -> bool;
// }

// pub struct Wall {}
// impl GridCell for Wall {
//     fn is_wall(&self) -> bool {
//         true
//     }
//     fn is_empty(&self) -> bool {
//         false
//     }
//     fn is_unit(&self) -> bool {
//         false
//     }
// }
// pub struct EmptyCell {}
// impl GridCell for EmptyCell {
//     fn is_wall(&self) -> bool {
//         false
//     }
//     fn is_empty(&self) -> bool {
//         true
//     }
//     fn is_unit(&self) -> bool {
//         false
//     }
// }

#[derive(Debug, PartialEq, Eq, Clone)]
pub enum Character {
    Elf,
    Gobelin,
}

impl Character {
    fn is_foe(&self, c: &Character) -> bool {
        self != c
    }
}

// pub struct Unit {
//     character: Character,
// }
// impl GridCell for Unit {
//     fn is_wall(&self) -> bool {
//         false
//     }
//     fn is_empty(&self) -> bool {
//         false
//     }
//     fn is_unit(&self) -> bool {
//         true
//     }
// }
// impl Unit {
//     pub fn new(c: Character) -> Unit {
//         Unit { character: c }
//     }
//
//     pub fn is_foe(&self, u: &Unit) -> bool {
//         self.character.is_foe(&u.character)
//     }
// }

#[cfg(test)]
mod tests {
    // Note this useful idiom: importing names from outer (for mod tests) scope.
    use super::*;

    #[test]
    fn is_empty() {
        assert_eq!(GridCell::Wall.is_empty(), false);
        assert_eq!(GridCell::Empty.is_empty(), true);
        assert_eq!(
            GridCell::Unit {
                character: Character::Elf,
                hp: 200
            }
            .is_empty(),
            false
        );
    }

    #[test]
    fn is_unit() {
        assert_eq!(GridCell::Wall.is_unit(), false);
        assert_eq!(GridCell::Empty.is_unit(), false);
        assert_eq!(
            GridCell::Unit {
                character: Character::Elf,
                hp: 200
            }
            .is_unit(),
            true
        );
    }

    #[test]
    fn is_foe() {
        let gob = GridCell::Unit {
            character: Character::Gobelin,
            hp: 200,
        };
        let elf = GridCell::Unit {
            character: Character::Elf,
            hp: 200,
        };
        assert_eq!(GridCell::Wall.is_foe(&gob), false);
        assert_eq!(GridCell::Wall.is_foe(&elf), false);
        assert_eq!(GridCell::Empty.is_foe(&gob), false);
        assert_eq!(GridCell::Empty.is_foe(&elf), false);
        assert_eq!(elf.is_foe(&gob), true);
        assert_eq!(elf.is_foe(&elf), false);
        assert_eq!(gob.is_foe(&gob), false);
        assert_eq!(gob.is_foe(&elf), true);
    }
}
