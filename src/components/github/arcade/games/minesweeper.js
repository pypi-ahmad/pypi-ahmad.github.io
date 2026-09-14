import { base, clone, random } from "./common";
export function neighbors(index) {
  const result = [],
    row = Math.floor(index / 9),
    col = index % 9;
  for (let y = -1; y <= 1; y++)
    for (let x = -1; x <= 1; x++)
      if (
        (x || y) &&
        row + y >= 0 &&
        row + y < 9 &&
        col + x >= 0 &&
        col + x < 9
      )
        result.push((row + y) * 9 + col + x);
  return result;
}
export function create(year) {
  return {
    ...base(year, 9, 9),
    lives: 1,
    planted: false,
    cells: Array.from({ length: 81 }, () => ({
      mine: false,
      open: false,
      flag: false,
      count: 0,
    })),
  };
}
export function step(previous, input) {
  if (
    previous.status !== "playing" ||
    !Number.isInteger(input.cell) ||
    input.cell < 0 ||
    input.cell >= 81
  )
    return previous;
  const s = clone(previous),
    cell = s.cells[input.cell];
  if (cell.open) return s;
  if (input.flag) {
    cell.flag = !cell.flag;
    return s;
  }
  if (cell.flag) return s;
  if (!s.planted) {
    const safe = new Set([input.cell, ...neighbors(input.cell)]),
      available = s.cells.map((_, i) => i).filter((i) => !safe.has(i));
    for (let i = 0; i < 10; i++) {
      const pick = Math.floor(random(s) * available.length);
      s.cells[available.splice(pick, 1)[0]].mine = true;
    }
    s.cells.forEach((item, index) => {
      item.count = neighbors(index).filter((i) => s.cells[i].mine).length;
    });
    s.planted = true;
  }
  if (cell.mine) {
    cell.open = true;
    s.status = "lost";
    return s;
  }
  const queue = [input.cell];
  while (queue.length) {
    const index = queue.pop(),
      next = s.cells[index];
    if (next.open || next.flag || next.mine) continue;
    next.open = true;
    s.score += s.reward;
    if (!next.count) queue.push(...neighbors(index));
  }
  if (s.cells.every((item) => item.open || item.mine)) s.status = "won";
  return s;
}
