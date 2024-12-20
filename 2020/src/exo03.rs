#[derive(Debug)]
struct Position {
    x: usize,
    y: usize,
}

impl Position {
    fn start() -> Position {
        Position { x: 0, y: 0 }
    }
    fn next(&self) -> Position {
        Position {
            x: self.x + 3,
            y: self.y + 1,
        }
    }
    fn next_slope(&self, x: usize, y: usize) -> Position {
        Position {
            x: self.x + x,
            y: self.y + y,
        }
    }
}

struct Columns {
    columns: Vec<String>,
}

impl Columns {
    fn new(input: &[&str]) -> Columns {
        let mut columns: Vec<String> = vec![String::new(); input[0].len()];
        for s in input {
            let mut curr = 0;
            for c in s.chars() {
                columns[curr].push(c);
                curr += 1;
            }
        }
        println!("Columns: {:?}", columns);
        Columns { columns: columns }
    }

    fn get(&self, pos: &Position) -> char {
        let col = &self.columns[pos.x % self.columns.len()];
        let c = col.chars().nth(pos.y);
        match c {
            Some(c) => c,
            None => panic!("not found {:?} in {:?}", pos, col),
        }
    }
}

pub fn count_trees_a(input: &[&str]) -> u32 {
    let max = input.len();
    let columns = Columns::new(input);
    let mut pos = Position::start();
    let mut result = 0;
    while pos.y < max {
        let c = columns.get(&pos);
        println!("{:?}: {}", pos, c);
        if c == '#' {
            result += 1;
        }
        pos = pos.next();
    }
    result
}
pub fn count_trees_b(input: &[&str]) -> u32 {
    let mut r = 1;
    let slopes = vec![(1, 1), (3, 1), (5, 1), (7, 1), (1, 2)];
    let max = input.len();
    let columns = Columns::new(input);
    for slope in slopes {
        let mut pos = Position::start();
        let mut result = 0;
        while pos.y < max {
            let c = columns.get(&pos);
            println!("{:?}: {}", pos, c);
            if c == '#' {
                result += 1;
            }
            pos = pos.next_slope(slope.0, slope.1);
        }
        r *= result;
    }
    r
}

#[cfg(test)]
mod test {
    use super::*;

    const SAMPLE: &[&str] = &[
        "..##.......",
        "#...#...#..",
        ".#....#..#.",
        "..#.#...#.#",
        ".#...##..#.",
        "..#.##.....",
        ".#.#.#....#",
        ".#........#",
        "#.##...#...",
        "#...##....#",
        ".#..#...#.#",
    ];
    #[test]
    fn sample_a() {
        let trees = count_trees_a(SAMPLE);
        assert_eq!(trees, 7);
    }
    #[test]
    fn sample_b() {
        let trees = count_trees_b(SAMPLE);
        assert_eq!(trees, 336);
    }

    const INPUT: &[&str] = &[
        "..#...##...###.........#..#..#.",
        "#.###........#..##.#......#...#",
        "#.#.###..#.#..#.#............#.",
        ".##............#......#...#.#..",
        "..#..#.....##..##..##..........",
        "...#...........###.#.##........",
        "....#.#...#..#..##............#",
        "....#....##...##..##........#..",
        ".#..#..#....#...#..##.....##...",
        ".#.###..#......####........##..",
        "..#...###....#......#.....##.##",
        "..#...#.......#......#..##....#",
        "#...##....#.#..#.......#....#..",
        ".#......#..#...........#....##.",
        ".##.#......#.#.#.....##........",
        ".....#.................#.#..#.#",
        "....#..#........##......#..#.#.",
        "..#...#..##.......#..##...#..#.",
        "..#.......#.............#.#....",
        ".#.................#.........#.",
        "..#..#.#.#.#............##.#..#",
        ".#.#.##.#.....#.....#..#......#",
        "..#.#..#.#..........##........#",
        ".........#...#.....#.#...#####.",
        "##..#.....##.##........#...##..",
        ".#.....#....##.#..#....##...##.",
        ".##.....#.#....#.#.....#......#",
        ".....#..#.##.....#.#....#.#..##",
        "#......##..##....##...###..#...",
        ".......#..#...........#......#.",
        "#...#......#........#..#.......",
        "##..#.....##.....#...#...#....#",
        ".###..##..#.#........#..#.#....",
        "#.#...#...#......##........#.#.",
        "......#....#.#........##...#..#",
        ".#.....#..#.#.....#......##....",
        ".....#.....#.#.#....###.....#..",
        "#.......##.#......#.#.#....###.",
        ".......#..#..#...#.#.##........",
        ".#......##..#.........###..#...",
        "....#..##.......##.###...###...",
        ".##............#..#.##.....#.##",
        "..##.#.......##....#.......##.#",
        "#..###............#.#...#...#.#",
        "...##.#.#.#..#.##........#.#...",
        ".#.....#...##.#..###..##.##...#",
        "..............#.#.#.........#..",
        ".....#...........#.#...#....#..",
        ".....#...##.##.#....#.###..#...",
        "#..###.........#......#.#.#....",
        ".....#..#...##...###.#....#....",
        "#..........#.#.#....#..#......#",
        "###...................#......#.",
        "........####......#.#..........",
        ".......#.....#...#.......#...#.",
        ".....#.....................#...",
        "...#.#...#...#...........#.....",
        "..#.........#...#....###..#....",
        ".....#.#..##......##........##.",
        "..#.............#............#.",
        ".#....##.......#..#............",
        ".#............#.#..#.##....#...",
        ".####...##.#....#.....#...#....",
        "##..#....#.#.#...........#..#.#",
        "...#..#...........#...#..#....#",
        ".....##.....#..#...#.........#.",
        "...##........#....##........#..",
        ".##.#...#...#..#.....#....##.#.",
        "#.#...#.#.#.#.#..#....#....#...",
        "#..#.#...#..#........#....#.#..",
        "....#.#.....#......##...#....#.",
        ".###.##...#....##.#...###..#..#",
        "###..#...##..#......#.........#",
        "..#.#......##.......#.....#...#",
        "..#...#........#.........#.#...",
        "#....#..#.........###.#......##",
        "...#..#....#...#.......##.#.#..",
        "....#.......#....###...##.#....",
        "..#.....#.#.....###..#####....#",
        "##......#....#.....##..#..#...#",
        "#...........#..#..#....#....#..",
        ".#...#.##.#.#.#....#......#..#.",
        ".......#.#....#....#...#.#..#..",
        "..#.#..#.##..##...##..#..#.....",
        "...##.##.................#.#...",
        ".....#...#......##.#....#.....#",
        "......#..##.#..#.#.........#...",
        ".............##.#......#.......",
        "..#.#.....#...#.#.....#..#.....",
        ".........#..#.#......#..#......",
        "#..#.#.##..........#.##......##",
        "......#.......#.....#..#.#...#.",
        ".#....#....#.#.....#.......#...",
        "#..#..##..................#....",
        "............#...........##.#...",
        "####...#..##.#....#.##..#......",
        "#...#...#.....#.#...#.#........",
        ".......##.........#.....#.....#",
        ".....#...........##......#.####",
        ".##....#.#.##......###.#.##....",
        "........#.####.......#.#...#...",
        ".#.#...##.#.#.#.........##.....",
        "....#............###.##....#...",
        "...##........##.#...#....#..###",
        "..#.#.........#....##.#........",
        "..#..##..#...##..#.##...#.....#",
        ".#......#..#..#.........#......",
        "..#........##.#......#.....#...",
        ".##.......#....#.#......#......",
        "#........#....#.####...#.#.....",
        "##......#.............#....###.",
        "..#....####.#.#.#.#...##......#",
        "#.#.#.....#...#.......#...##...",
        "........#...#....#..#......#.#.",
        "#..#...#.#.##.....#.#....#....#",
        "#...#....#......#.........##.##",
        "..##.#..##............#........",
        "#.........####.........#.......",
        "#.##.........#..##....#.#.#.#..",
        ".###......##..#.#.....#.#...##.",
        "...#.........#.#...##.##....#..",
        "#..#......#....##..#.#...#...##",
        "...#.......#.#.#.....#..##...#.",
        "....................###........",
        "#...........###......#.#...##.#",
        ".................#.#...###....#",
        "...#..###..#.##...#..#....##...",
        "###..#..#.#...#.....#.#.......#",
        ".........#..#.#.....#.........#",
        ".##..#.........#.#.....##......",
        ".....#..........#.#.##....#....",
        "........#.##.....#...##...#....",
        "#.#.#...#......##....#.###.....",
        ".#.##.....##.....#....#.##.#.##",
        ".#...#.....##.#.##....#.....#.#",
        "...#.....#........#............",
        "##...####..#....#..##...#......",
        "#.......#...#.#...#........#..#",
        "......#.....#....#..#..#.#.....",
        "..............##.....#.##....##",
        ".#..##.........###..#..........",
        "......#......#............#..#.",
        "#.....###...###..........#.....",
        "...###...........#....##..#....",
        ".....................#...#.##..",
        "###....#.#....#...#....#.#..##.",
        "..#.............#.#....#..#.#..",
        ".......#..###....#...#...#...#.",
        ".##..#....##..............##...",
        "...#...#..#..#.##.#....##...#..",
        "#..#....##......#....###..####.",
        ".##...#.#....#..#..#....#....#.",
        ".#.##..#..#.........#.#......##",
        "#..#.................#.....#...",
        "..#............#........#...#..",
        "##.##.......#.#....#..#....##.#",
        "..##...#.#.....#......#........",
        "......#.##.........##...#......",
        "......##.#......#.##....##.#..#",
        ".#.#......####.#.#.#.#..#......",
        "..#.#....#...###....#.#...###..",
        ".#.#...#....##..###.#..#.......",
        "..#.....##..#............#..#.#",
        ".#...#....#.....#....#..#.#.#..",
        "..#....#..#......##...##......#",
        "....#.......#.##.#.........#..#",
        "#............#...##.....#..##..",
        "......#..#..........#.#..#.....",
        "...........#.#..#...##.#...#..#",
        ".........###..#......##.###.#..",
        ".....#....#......#...#....##...",
        "..#.......#..#.#.#......#......",
        ".#....#.....#.#.#.##...#....##.",
        "....#.##.##.......#..#.....#...",
        ".#.....#......#.......#..#.....",
        "....###.....##.....##..#.#...#.",
        "#.......#.#....#.#.#....#......",
        "#...#..#.#......#...##.#.......",
        "....##.##....#..#.......#..#.#.",
        ".#.##.#.#..#.....#.#.......##..",
        "..#..#..#..#.###...............",
        "#.#......##....##.#.#.....#.#..",
        "..##...#.........#.#..#.##..#..",
        ".........####...#.....##.#.....",
        "..#...................#.###....",
        "..#.....#..#....#..#...........",
        ".....###.#.........#.#.........",
        "#..#..#........#..#......#..#..",
        "###..##...#.......#........#.#.",
        ".#.#.#.###.#............##.....",
        "#..............#......#....#.##",
        ".#...#..###...###.#..#.#.......",
        ".###....##.#.......#.#.....###.",
        ".##.....#.#....................",
        "#..#.....#.....#...#.....#..##.",
        "#.#....##..#......##..#...##..#",
        "...........#....#..#.##.##....#",
        "......#.......##....#.#....#.#.",
        "###..#.#..........#.......#.#..",
        "..#.#..##....##............##..",
        "..#.....#..#....###............",
        ".#...#...##...#..#..#..#.#....#",
        "...#....#........#.............",
        "#.#......#.#.....##..........#.",
        "....#..#...............#...##..",
        "........#..#....#..#..#..##....",
        "....#......#.#.#...#.......#.##",
        ".#.....#.#.#........###....#...",
        ".#..#.......#...........#...#..",
        "#.#.#####..#......#...#.#.###..",
        "...##...#.#.....#..#...#...#...",
        "..#....#.....#..#....#.#.....#.",
        "....#.......#.....#........###.",
        "..##..........#...###.......#..",
        "#.#.##..#........##...#.#......",
        "....##...#......#..........#.#.",
        "#.......#..#.##.............#..",
        "......#..........#...#....#...#",
        "#.#.....#.##.#.#.............##",
        "#...#.........##.##......#.##..",
        ".........##.....#....#...##..#.",
        "#.#...##.#...#.....##...#..#..#",
        "......##.#.....#.#.....#.##....",
        "....#.............#...#.......#",
        ".#......##...#.#...#.##........",
        "...#..#..#...........#..#..#.#.",
        ".#...#...........#.#.##....#...",
        "..#...#...#.#..#....#..#..#....",
        "..###..##..#..#.........#.#..#.",
        "....#.##.#...#.......#...#.....",
        ".#.#.................#.......#.",
        ".#..#.....#.##...#.#.....#...#.",
        ".#.......#...#....#.......#....",
        "###....##....#..#...#.#..##....",
        ".........#.#.#.#...###.......##",
        "....##.......#......#......##..",
        "......##.###.#..#...#.#.#.#....",
        ".#.###.#.#......#.#.......##...",
        ".#.....##..#.#.....#...#.##....",
        ".#..##.#.....#........###...#.#",
        ".......#.#...........#........#",
        "..........#...##..##.......#.#.",
        "...#..#..#...#....#.#......#.#.",
        "....#...#..#....#....#.#.##....",
        "...#.#...##...#...##..#........",
        "..#........#...##.#...##.#.#.#.",
        "...##.#..#.......###.#.#.#.....",
        "..##......#.#.#.........###.#..",
        ".......#.#...##...#.#.......#.#",
        ".#....##..#..#....#..#...#.....",
        ".#....#.#.......#..#..##.#....#",
        "#.#..##..#.#............#....#.",
        "##..#....#.##.#....#...#..##...",
        ".###.#.#..#...##........###.##.",
        "...........#..#...#..#.#..###..",
        ".#.#.#...#....#...##.##........",
        ".....###.........#......#####..",
        "#.#.#.....#....#..#...#.#.#.#..",
        "..##.....#..#..#.#.#...#....#.#",
        "......#.##..##..#.#.#.......#..",
        "...#.#..###.........#........#.",
        "......#.##..####...#...#..#...#",
        "#.......#.........#....#....###",
        "#......#...#........#.##....###",
        ".#.#..............#...#...###.#",
        ".#....####...#..##.###.....#...",
        ".......#......#..#...#..##.#...",
        "...........#.......#...........",
        "..............#...#.#.#.#...##.",
        ".###.....##.#.....#..........#.",
        "##.##......#....##..#.....###.#",
        "#.......#...##...#....##...#...",
        "##.#.##...#....#....#....#.....",
        ".....####...........#.#......#.",
        "......#...#....#..#......#.....",
        "...#...##..........#.......##.#",
        ".#....#..........#.####........",
        "...##...#..#...##........##..#.",
        ".........##....#...##..#.##.#..",
        "##.#.....#.......#.....#.......",
        "#..#....#.##.#........#........",
        "#.#...#...##........#.#.....###",
        "....#...................#.#.#..",
        ".......#..#.#...#....#.##.#....",
        "....##...###.#.#.##...#...#....",
        ".#....#....#...##.#......#...#.",
        "............##..#.#.#........#.",
        "...#....#.....#......#........#",
        "...#.#.....#.##.....#....#...#.",
        ".....#..##.......#.##.......#.#",
        "........##................#....",
        "....#..###...##.#..#...#......#",
        ".#.#.......#.......#....##.#..#",
        "..#........#............#......",
        "..##.......#..#..#....#....#..#",
        "#...###.......#.##...#.........",
        ".....#...#...#..##..#....#..#..",
        ".##.#..#...##.........###.#....",
        "..#.#..#...#...####.#...#.#.#.#",
        "#....#..###.....#......#.##..##",
        "##......#...##...###......#.##.",
        "...........#.....##...#...#...#",
        "..#..#.#.....#..#.....###...#..",
        ".............#..........###...#",
        "....##............#....###.##.#",
        "..##.#..##.....#.#.........#.#.",
        "....#.#...........####.........",
        ".##.###.##.#.#......#.##.#.#...",
        ".....##.........#..#.......#...",
        "...........#.........#....###..",
        "...#.#..#..........#.....#..#..",
        ".#..###.......##........#.#....",
        ".#...###.....#..#.#..#...#.##..",
        "##...###.#.#....#......#...#..#",
        "....#.......#..#..##..#.#......",
        "#.#......#.##..#......#..#....#",
        "....#..#..#.....#.#......#..#..",
        "..#...###......##.............#",
        "..#....####...##.#...##.#......",
        ".....#.......###...............",
        ".......#...#.#.......#.#.##.###",
        ".#.#...#.....#...##.........#..",
        "..#..........#..#.........##...",
    ];

    #[test]
    fn part_a() {
        let trees = count_trees_a(INPUT);
        assert_eq!(trees, 205);
    }

    #[test]
    fn part_b() {
        let trees = count_trees_b(INPUT);
        assert_eq!(trees, 3952146825);
    }
}
