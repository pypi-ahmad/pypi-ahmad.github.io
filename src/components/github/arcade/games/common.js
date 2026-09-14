export const clone = (state) => JSON.parse(JSON.stringify(state));
export function seedYear(year) {
  if (Number.isInteger(year.challengeSeed))
    return year.challengeSeed >>> 0 || 1;
  let seed = year.year >>> 0;
  for (const day of year.days)
    for (const char of `${day.date}:${day.count}`)
      seed = Math.imul(seed ^ char.charCodeAt(0), 16777619) >>> 0;
  return seed || 1;
}
export function random(state) {
  state.seed = (Math.imul(state.seed, 1664525) + 1013904223) >>> 0;
  return state.seed / 4294967296;
}
export function base(year, width, height) {
  return {
    seed: seedYear(year),
    width,
    height,
    status: "playing",
    score: 0,
    lives: 3,
    clock: 0,
    reward: Math.max(
      1,
      Math.round(
        year.total / Math.max(1, year.days.filter((day) => day.count).length),
      ),
    ),
  };
}
export const directions = {
  up: [0, -1],
  down: [0, 1],
  left: [-1, 0],
  right: [1, 0],
};
export const same = (a, b) => a.x === b.x && a.y === b.y;
export function freeCell(state, occupied) {
  const free = [];
  for (let y = 0; y < state.height; y++)
    for (let x = 0; x < state.width; x++)
      if (!occupied.some((cell) => cell.x === x && cell.y === y))
        free.push({ x, y });
  return free.length ? free[Math.floor(random(state) * free.length)] : null;
}
export function backdrop(ctx, state, colors) {
  ctx.fillStyle = colors.surface;
  ctx.fillRect(0, 0, state.width, state.height);
}
export function block(ctx, x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
}
export function disc(ctx, x, y, radius, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
}
