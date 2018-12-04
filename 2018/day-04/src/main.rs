extern crate chrono;
extern crate regex;
use chrono::Timelike;
use chrono::{Duration, NaiveDate, NaiveDateTime, NaiveTime};
use regex::Regex;
use std::collections::HashMap;
use std::env;
use std::fs;
use std::io;
use std::ops::Add;
use std::str::FromStr;

fn main() -> io::Result<()> {
    let args: Vec<String> = env::args().collect();
    if args.len() < 2 {
        panic!("a or b ?");
    }
    let mode = &args[1];

    let f = fs::read_to_string("src/input.txt")?;
    let lines: Vec<&str> = f.split("\n").collect();

    if mode == "a" {
        println!("{:?}", find_max_sleeper_guard(&lines));
    } else if mode == "b" {
        println!("{:?}", find_guard_most_asleep_at_same_minute(&lines));
    }

    Ok(())
}

fn find_max_sleeper_guard(lines: &[&str]) -> u32 {
    let mut guards_by_date: HashMap<NaiveDate, u32> = HashMap::new();
    let mut guards: HashMap<u32, Guard> = HashMap::new();

    println!("begins");
    for line in lines {
        if line.len() == 0 {
            continue;
        }
        let line_tuple = parse_line(line);
        if line_tuple.0 == LineType::Begin {
            let id = line_tuple.2 as u32;
            guards_by_date.insert(line_tuple.1, id);
            if !guards.contains_key(&id) {
                let guard = Guard {
                    id: id,
                    day: line_tuple.1,
                    sleeps2: HashMap::new(),
                };
                guards.insert(id, guard);
            }
        }
    }

    println!("asleep");
    for line in lines {
        if line.len() == 0 {
            continue;
        }
        let line_tuple = parse_line(line);
        if line_tuple.0 == LineType::Asleep {
            let id_for_date = guards_by_date
                .get(&line_tuple.1)
                .expect("no guard at this date");
            let guard = guards.get_mut(id_for_date).expect("no guard for this id");
            guard.add(line_tuple.0, line_tuple.1, line_tuple.3);
        }
    }

    println!("wakes up");
    for line in lines {
        if line.len() == 0 {
            continue;
        }
        // println!("parse {:?}", line);
        let line_tuple = parse_line(line);
        if line_tuple.0 == LineType::WakesUp {
            let id_for_date = guards_by_date
                .get(&line_tuple.1)
                .expect("no guard at this date");
            let guard = guards.get_mut(id_for_date).expect("no guard for this id");
            guard.add(line_tuple.0, line_tuple.1, line_tuple.3);
        }
    }

    let guard = guards.values().max_by_key(|g| g.total_sleep()).unwrap();

    guard.id * guard.minute_most_asleep()
}

fn find_guard_most_asleep_at_same_minute(lines: &[&str]) -> u32 {
    let mut guards_by_date: HashMap<NaiveDate, u32> = HashMap::new();
    let mut guards: HashMap<u32, Guard> = HashMap::new();

    println!("begins");
    for line in lines {
        if line.len() == 0 {
            continue;
        }
        let line_tuple = parse_line(line);
        if line_tuple.0 == LineType::Begin {
            let id = line_tuple.2 as u32;
            guards_by_date.insert(line_tuple.1, id);
            if !guards.contains_key(&id) {
                let guard = Guard {
                    id: id,
                    day: line_tuple.1,
                    sleeps2: HashMap::new(),
                };
                guards.insert(id, guard);
            }
        }
    }

    println!("asleep");
    for line in lines {
        if line.len() == 0 {
            continue;
        }
        let line_tuple = parse_line(line);
        if line_tuple.0 == LineType::Asleep {
            let id_for_date = guards_by_date
                .get(&line_tuple.1)
                .expect("no guard at this date");
            let guard = guards.get_mut(id_for_date).expect("no guard for this id");
            guard.add(line_tuple.0, line_tuple.1, line_tuple.3);
        }
    }

    println!("wakes up");
    for line in lines {
        if line.len() == 0 {
            continue;
        }
        // println!("parse {:?}", line);
        let line_tuple = parse_line(line);
        if line_tuple.0 == LineType::WakesUp {
            let id_for_date = guards_by_date
                .get(&line_tuple.1)
                .expect("no guard at this date");
            let guard = guards.get_mut(id_for_date).expect("no guard for this id");
            guard.add(line_tuple.0, line_tuple.1, line_tuple.3);
        }
    }

    // let guard = guards.values().max_by_key(|g| g.total_sleep()).unwrap();
    let mut max_min = 0;
    let mut max_total = 0;
    let mut id: u32 = 0;
    for min in 0..59 {
        for guard in guards.values() {
            let total = guard.total_asleep_at_minute(min);
            if total > max_total {
                max_min = min;
                max_total = total;
                id = guard.id;
            }
        }
    }
    id * max_min

    // guard.id * guard.minute_most_asleep()
}

#[derive(Debug, Clone, PartialEq)]
struct Guard {
    id: u32,
    day: NaiveDate,
    sleeps2: HashMap<NaiveDate, Vec<(NaiveTime, NaiveTime)>>,
}

impl Guard {
    fn add(self: &mut Guard, line_type: LineType, date: NaiveDate, time: NaiveTime) {
        if line_type == LineType::Asleep {
            if self.sleeps2.contains_key(&date) {
                self.sleeps2
                    .get_mut(&date)
                    .expect("unfound date to add asleep")
                    .push((time, time));
            } else {
                self.sleeps2.insert(date, vec![(time, time)]);
            }
        } else if line_type == LineType::WakesUp {
            let most_recent = self.most_recent(date, time);
            for item in self.sleeps2.get_mut(&date).expect("unfound date") {
                if item.0 == most_recent {
                    item.1 = time;
                    break;
                }
            }
        }
    }
    fn total_sleep(self: &Guard) -> u32 {
        self.sleeps2
            .values()
            .flatten()
            .fold(0, |init, s| init + ((s.1 - s.0).num_minutes() as u32))
    }

    fn minute_most_asleep(self: &Guard) -> u32 {
        // println!("{:?}", self.sleeps2);
        let mut result = (0, 0 as u32);
        let mut mins = [0 as u32; 60];
        for sleeps in self.sleeps2.values() {
            // let n = (sleeps.1 - sleeps.0).num_minutes();
            for interval in sleeps {
                let mut min = interval.0;
                let mut i = 0;
                while min < interval.1 && i < 50 {
                    // println!(" === {:?} {:?} {:?}", sleeps, interval, min);
                    let curr = min.minute() as usize;
                    mins[curr] += 1;

                    if result.0 < mins[curr] {
                        result = (mins[curr], curr as u32)
                    }

                    min = min.add(Duration::minutes(1));
                    i += 1;
                }
            }
        }
        // println!("most asleep minutes {:?} ({})", result.1, result.0);
        result.1
        // println!("= {:?}", mins.iter().collect());
        // *mins.iter().max().expect("no max ?")
    }

    fn most_recent(self: &Guard, date: NaiveDate, time: NaiveTime) -> NaiveTime {
        self.sleeps2
            .get(&date)
            .expect("unfound date for most recent")
            .iter()
            .min_by_key(|interval| {
                if time < interval.0 {
                    return 99;
                }
                (time - interval.0).num_minutes()
            })
            .unwrap()
            .0
    }

    fn total_asleep_at_minute(self: &Guard, min: u32) -> u32 {
        let time = NaiveTime::from_hms(0, min, 0);
        self.sleeps2
            .values()
            .flatten()
            .filter(|t| t.0 <= time && t.1 > time)
            .map(|_| 1)
            .sum()
    }
}

#[derive(Debug, PartialEq)]
enum LineType {
    Begin,
    Asleep,
    WakesUp,
}

fn parse_line(line: &str) -> (LineType, NaiveDate, i32, NaiveTime) {
    let regexp = Regex::new("\\[([0-9- :]+)\\][^#]*(#[0-9]+)?.*(begins|asleep|wakes up)").unwrap();
    // println!("regexp : {:?}", r  egexp);
    let captures = regexp.captures(line).unwrap();
    // println!("captures : {:?}", captures);

    let line_type = match captures.get(3).unwrap().as_str() {
        "begins" => LineType::Begin,
        "asleep" => LineType::Asleep,
        _ => LineType::WakesUp,
    };

    let id = captures.get(2).map_or(-1, |date_str| {
        i32::from_str(String::from(date_str.as_str()).get(1..).unwrap()).unwrap()
    });

    let mut date_time =
        NaiveDateTime::parse_from_str(captures.get(1).unwrap().as_str(), "%Y-%m-%d %H:%M").unwrap();
    if date_time.hour() == 23 {
        date_time = date_time.add(Duration::days(1));
    }
    (line_type, date_time.date(), id, date_time.time())
}

#[cfg(test)]
mod tests {
    // Note this useful idiom: importing names from outer (for mod tests) scope.
    use super::*;

    // #[test]
    // fn test_create_guard() {
    //     assert_eq!(
    //         Guard::new("[1518-11-01 00:00] Guard #10 begins shift"),
    //         Guard {
    //             id: 0,
    //             day: NaiveDate::from_ymd(1518, 11, 5),
    //         }
    //     );
    // }
    #[test]
    fn test_parse_line_begins() {
        let tuple = parse_line("[1518-11-01 00:00] Guard #10 begins shift");
        assert_eq!(
            tuple,
            (
                LineType::Begin,
                NaiveDate::from_ymd(1518, 11, 1),
                10,
                NaiveTime::from_hms(0, 0, 0)
            )
        );
    }
    #[test]
    fn test_parse_line_asleep() {
        let tuple = parse_line("[1518-11-04 00:36] falls asleep");
        assert_eq!(
            tuple,
            (
                LineType::Asleep,
                NaiveDate::from_ymd(1518, 11, 4),
                -1,
                NaiveTime::from_hms(0, 36, 0)
            )
        );
    }
    #[test]
    fn test_parse_line_awake() {
        let tuple = parse_line("[1518-11-05 00:55] wakes up");
        assert_eq!(
            tuple,
            (
                LineType::WakesUp,
                NaiveDate::from_ymd(1518, 11, 5),
                -1,
                NaiveTime::from_hms(0, 55, 0)
            )
        );
    }
    #[test]
    fn test_parse_line_before_midnight() {
        let tuple = parse_line("[1518-11-01 23:58] Guard #99 begins shift");
        assert_eq!(
            tuple,
            (
                LineType::Begin,
                NaiveDate::from_ymd(1518, 11, 2),
                99,
                NaiveTime::from_hms(23, 58, 0)
            )
        );
    }

    #[test]
    fn test_add_sleep_to_guard() {
        let mut guard = Guard {
            id: 1,
            day: NaiveDate::from_ymd(1518, 11, 4),
            sleeps2: HashMap::new(),
        };
        let date1 = NaiveDate::from_ymd(1518, 11, 1);
        let date2 = NaiveDate::from_ymd(1518, 11, 4);
        guard.add(LineType::Asleep, date1, NaiveTime::from_hms(0, 30, 0));
        guard.add(LineType::Asleep, date1, NaiveTime::from_hms(0, 5, 0));
        guard.add(LineType::Asleep, date2, NaiveTime::from_hms(0, 24, 0));
        guard.add(LineType::WakesUp, date1, NaiveTime::from_hms(0, 25, 0));
        guard.add(LineType::WakesUp, date1, NaiveTime::from_hms(0, 55, 0));
        guard.add(LineType::WakesUp, date2, NaiveTime::from_hms(0, 29, 0));
        println!("===== TEST {:?}", guard);
        assert_eq!(guard.total_sleep(), 50);
        assert_eq!(guard.minute_most_asleep(), 24);

        assert_eq!(guard.total_asleep_at_minute(24), 2);
        assert_eq!(guard.total_asleep_at_minute(10), 1);
        assert_eq!(guard.total_asleep_at_minute(57), 0);
    }

    #[test]
    fn test_parse_lines_creates_guards() {
        let guard = find_max_sleeper_guard(&[
            "[1518-11-01 00:25] wakes up",
            "[1518-11-01 00:05] falls asleep",
            "[1518-11-01 00:00] Guard #10 begins shift",
            "[1518-11-01 23:58] Guard #99 begins shift",
            "[1518-11-01 00:30] falls asleep",
            "[1518-11-01 00:55] wakes up",
            "[1518-11-02 00:40] falls asleep",
            "[1518-11-02 00:50] wakes up",
            "[1518-11-03 00:05] Guard #10 begins shift",
            "[1518-11-03 00:24] falls asleep",
            "[1518-11-04 00:02] Guard #99 begins shift",
            "[1518-11-04 00:36] falls asleep",
            "[1518-11-05 00:03] Guard #99 begins shift",
            "[1518-11-03 00:29] wakes up",
            "[1518-11-04 00:46] wakes up",
            "[1518-11-05 00:45] falls asleep",
            "[1518-11-05 00:55] wakes up]);",
            "",
        ]);
        assert_eq!(guard, 10 * 24);
    }

    #[test]
    fn test_find_guard_most_asleep_at_same_minute() {
        let guard = find_guard_most_asleep_at_same_minute(&[
            "[1518-11-01 00:25] wakes up",
            "[1518-11-01 00:05] falls asleep",
            "[1518-11-01 00:00] Guard #10 begins shift",
            "[1518-11-01 23:58] Guard #99 begins shift",
            "[1518-11-01 00:30] falls asleep",
            "[1518-11-01 00:55] wakes up",
            "[1518-11-02 00:40] falls asleep",
            "[1518-11-02 00:50] wakes up",
            "[1518-11-03 00:05] Guard #10 begins shift",
            "[1518-11-03 00:24] falls asleep",
            "[1518-11-04 00:02] Guard #99 begins shift",
            "[1518-11-04 00:36] falls asleep",
            "[1518-11-05 00:03] Guard #99 begins shift",
            "[1518-11-03 00:29] wakes up",
            "[1518-11-04 00:46] wakes up",
            "[1518-11-05 00:45] falls asleep",
            "[1518-11-05 00:55] wakes up]);",
            "",
        ]);
        assert_eq!(guard, 99 * 45);
    }
}
