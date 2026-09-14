import { base, clone, directions, same, freeCell, block, disc } from "./common";
export function create(year) {
  const state = {
    ...base(year, 20, 14),
    lives: 1,
    direction: "right",
    snake: [
      { x: 4, y: 6 },
      { x: 3, y: 6 },
      { x: 2, y: 6 },
    ],
    eaten: 0,
  };
  state.food = freeCell(state, state.snake);
  return state;
}
export function step(previous, input, dt) {
  if (previous.status !== "playing") return previous;
  const s = clone(previous);
  s.clock += dt;
  if (s.clock < 0.13) return s;
  s.clock = 0;
  if (directions[input.direction]) {
    const before = directions[s.direction],
      next = directions[input.direction];
    if (before[0] + next[0] !== 0 || before[1] + next[1] !== 0)
      s.direction = input.direction;
  }
  const [dx, dy] = directions[s.direction],
    head = { x: s.snake[0].x + dx, y: s.snake[0].y + dy };
  const eating = same(head, s.food);
  const body = eating ? s.snake : s.snake.slice(0, -1);
  if (
    head.x < 0 ||
    head.y < 0 ||
    head.x >= s.width ||
    head.y >= s.height ||
    body.some((cell) => same(cell, head))
  ) {
    s.status = "lost";
    return s;
  }
  s.snake.unshift(head);
  if (eating) {
    s.eaten++;
    s.score += s.reward;
    s.food = freeCell(s, s.snake);
    if (s.eaten >= 20 || !s.food) s.status = "won";
  } else s.snake.pop();
  return s;
}
export function draw(ctx, s, c) {
  s.snake.forEach((cell, index) =>
    block(
      ctx,
      cell.x + 0.07,
      cell.y + 0.07,
      0.86,
      0.86,
      index ? c.accent : c.text,
    ),
  );
  if (s.food) disc(ctx, s.food.x + 0.5, s.food.y + 0.5, 0.3, c.reward);
}
