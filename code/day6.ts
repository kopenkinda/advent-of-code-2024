import { getInputFor } from "../utils/get-input.ts";

const data = getInputFor(
  6,
  (x) => x.split("\n").map((x) => x.split("")),
  "inputs"
);

function d61(data: string[][]) {
  let playerPos = { x: 0, y: 0 };
  let facing = "N";
  const copy = data.map((x) => x.slice());
  finder: for (let i = 0; i < copy.length; i++) {
    for (let j = 0; j < copy[i].length; j++) {
      if (copy[i][j] === "^") {
        playerPos = { x: j, y: i };
        break finder;
      }
    }
  }
  const next = (pos: { x: number; y: number }, facing: string) => {
    const { x, y } = pos;
    switch (facing) {
      case "N":
        return {
          x,
          y: y - 1,
          block: copy?.[y - 1]?.[x] === "#",
          outside: y - 1 < 0,
        };
      case "S":
        return {
          x,
          y: y + 1,
          block: copy?.[y + 1]?.[x] === "#",
          outside: y + 1 >= copy.length,
        };
      case "E":
        return {
          x: x + 1,
          y,
          block: copy?.[y]?.[x + 1] === "#",
          outside: x + 1 >= copy[y].length,
        };
      case "W":
        return {
          x: x - 1,
          y,
          block: copy?.[y]?.[x - 1] === "#",
          outside: x - 1 < 0,
        };
      default:
        throw new Error("Invalid facing");
    }
  };
  const visied = new Set<string>();
  while (true) {
    visied.add(`${playerPos.x},${playerPos.y}`);
    const { x, y, block, outside } = next(playerPos, facing);
    if (outside) {
      break;
    }
    if (block) {
      facing =
        facing === "N"
          ? "E"
          : facing === "E"
          ? "S"
          : facing === "S"
          ? "W"
          : "N";
    } else {
      playerPos = { x, y };
    }
  }
  return visied.size;
}

function d62(data: string[][]) {
  let playerPos = { x: 0, y: 0 };
  let facing = "N";
  const copy = data.map((x) => x.slice());
  finder: for (let i = 0; i < copy.length; i++) {
    for (let j = 0; j < copy[i].length; j++) {
      if (copy[i][j] === "^") {
        playerPos = { x: j, y: i };
        break finder;
      }
    }
  }
  const initialPos = { ...playerPos };

  const next = (
    pos: { x: number; y: number },
    facing: string,
    data?: string[][]
  ) => {
    const { x, y } = pos;
    switch (facing) {
      case "N":
        return {
          x,
          y: y - 1,
          block: (data || copy)?.[y - 1]?.[x] === "#",
          outside: y - 1 < 0,
        };
      case "S":
        return {
          x,
          y: y + 1,
          block: (data || copy)?.[y + 1]?.[x] === "#",
          outside: y + 1 >= copy.length,
        };
      case "E":
        return {
          x: x + 1,
          y,
          block: (data || copy)?.[y]?.[x + 1] === "#",
          outside: x + 1 >= copy[y].length,
        };
      case "W":
        return {
          x: x - 1,
          y,
          block: (data || copy)?.[y]?.[x - 1] === "#",
          outside: x - 1 < 0,
        };
      default:
        throw new Error("Invalid facing");
    }
  };

  const checkForLoops = (x: number, y: number) => {
    playerPos = { ...initialPos };
    facing = "N";
    const visited = new Set<string>();
    const copy = data.map((x) => x.slice());
    copy[x][y] = "#";
    while (true) {
      const key = `${playerPos.x},${playerPos.y},${facing}`;
      if (visited.has(key)) {
        return 1;
      }
      visited.add(key);
      const { x, y, block, outside } = next(playerPos, facing, copy);
      if (outside) {
        return 0;
      }
      if (block) {
        facing =
          facing === "N"
            ? "E"
            : facing === "E"
            ? "S"
            : facing === "S"
            ? "W"
            : "N";
      } else {
        playerPos = { x, y };
      }
    }
  };
  let count = 0;

  for (let i = 0; i < copy.length; i++) {
    for (let j = 0; j < copy[i].length; j++) {
      if (copy[i][j] === "#") {
        continue;
      }
      const res = checkForLoops(i, j);
      count += res;
    }
  }

  return count;
}``

console.log(d61(data));
console.log(d62(data));
