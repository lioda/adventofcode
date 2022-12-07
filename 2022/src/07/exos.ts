type Directory = {
  type: "directory";
  name: string;
  childrenFiles: { [name: string]: File };
  childrenDirectories: { [name: string]: Directory };
};
type File = {
  type: "file";
  name: string;
  size: number;
};
type Inode = Directory | File;

export function exo01(lines: string[]): number {
  const root = parseCommands(lines);
  return findDirectories(root, ({ size }) => size <= 100_000).reduce(
    (sum, e) => sum + e.size,
    0
  );
}

type SizedDirectory = {
  name: string;
  size: number;
  childrenDirectories: SizedDirectory[];
};
type FlattenedSizedDirectory = {
  name: string;
  size: number;
};

function parseCommands(lines: string[]): Directory {
  const root: Inode = {
    type: "directory",
    name: "/",
    childrenDirectories: {},
    childrenFiles: {},
  };
  const stack: Directory[] = [];
  let current: Directory = root;

  for (const line of lines) {
    if (line === "$ cd /") {
      current = root;
    } else if (line === "$ cd ..") {
      current = stack.pop()!;
    } else if (line.startsWith("$ cd ")) {
      const dirName = line.replace("$ cd ", "");
      if (!current.childrenDirectories[dirName]) {
        const child: Directory = {
          type: "directory",
          name: dirName,
          childrenFiles: {},
          childrenDirectories: {},
        };
        current.childrenDirectories[dirName] = child;
      }
      const child = current.childrenDirectories[dirName];
      stack.push(current);
      current = child;
    } else if (line === "$ ls") {
    } else if (line.startsWith("dir ")) {
      const dirName = line.replace("dir ", "");
      if (!current.childrenDirectories[dirName]) {
        const child: Directory = {
          type: "directory",
          name: dirName,
          childrenDirectories: {},
          childrenFiles: {},
        };
        current.childrenDirectories[dirName] = child;
      }
    } else {
      const [size, name] = line.split(" ");
      const file: File = {
        type: "file",
        name,
        size: parseInt(size, 10),
      };
      current.childrenFiles[name] = file;
    }
  }
  return root;
}

function findDirectories(
  root: Directory,
  predicate: (d: FlattenedSizedDirectory) => boolean
): FlattenedSizedDirectory[] {
  const sizedRoot = computeSize(root);
  const sized = flattenDirectories(sizedRoot);
  return sized.filter((dir) => predicate(dir));
}

function flattenDirectories(root: SizedDirectory): FlattenedSizedDirectory[] {
  const result: FlattenedSizedDirectory[] = [];
  const toExplore = [root];
  while (toExplore.length) {
    const current = toExplore.pop()!;
    result.push({ name: current.name, size: current.size });
    toExplore.push(...Object.values(current.childrenDirectories));
  }
  return result;
}

function computeSize(node: Directory): SizedDirectory {
  const directSize = Object.values(node.childrenFiles).reduce(
    (sum, file) => sum + file.size,
    0
  );
  const children = Object.values(node.childrenDirectories).map((node) =>
    computeSize(node)
  );
  const childrenSize = children.reduce((sum, child) => sum + child.size, 0);
  return {
    name: node.name,
    size: directSize + childrenSize,
    childrenDirectories: children,
  };
}

export function exo02(lines: string[]): number {
  const root = parseCommands(lines);
  const sizedRoot = computeSize(root);
  const totalAvailable = 70_000_000;
  const minimalFreeNeeded = 30_000_000;
  const toFree = minimalFreeNeeded + sizedRoot.size - totalAvailable;
  const candidates = findDirectories(root, ({ size }) => size >= toFree);

  let minimum = candidates[0].size;
  for (const candidate of candidates) {
    if (candidate.size < minimum) {
      minimum = candidate.size;
    }
  }
  return minimum;
}
