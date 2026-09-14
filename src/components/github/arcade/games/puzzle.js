import { base, clone, random, disc } from "./common";
export const center = (cell) => ({
  x: 30 + cell.col * 42 + (cell.row % 2) * 21,
  y: 30 + cell.row * 36,
});
const distance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
export function connected(bubbles, first, colorOnly) {
  const found = new Set(first),
    queue = [...first];
  while (queue.length) {
    const next = queue.shift();
    for (const bubble of bubbles)
      if (
        !found.has(bubble) &&
        (!colorOnly || bubble.color === next.color) &&
        distance(center(next), center(bubble)) < 44
      ) {
        found.add(bubble);
        queue.push(bubble);
      }
  }
  return found;
}
function chooseColor(s) {
  return s.bubbles.length
    ? s.bubbles[Math.floor(random(s) * s.bubbles.length)].color
    : 0;
}
export function create(year) {
  const s = {
    ...base(year, 480, 500),
    lives: 1,
    bubbles: [],
    shot: null,
    angle: 0,
    misses: 0,
    nextColor: 0,
  };
  for (let row = 0; row < 4; row++)
    for (let col = 0; col < 10; col++)
      s.bubbles.push({ row, col, color: Math.floor(random(s) * 4) });
  s.nextColor = chooseColor(s);
  return s;
}
export function step(previous, input, dt) {
  if (previous.status !== "playing") return previous;
  const s = clone(previous);
  s.angle = Math.max(
    -1.15,
    Math.min(
      1.15,
      input.pointer
        ? Math.atan2(input.pointer.x - 240, Math.max(1, 465 - input.pointer.y))
        : s.angle +
            (input.direction === "left"
              ? -1
              : input.direction === "right"
                ? 1
                : 0) *
              dt *
              1.7,
    ),
  );
  if (!s.shot && input.action)
    s.shot = {
      x: 240,
      y: 465,
      vx: Math.sin(s.angle) * 340,
      vy: -Math.cos(s.angle) * 340,
      color: s.nextColor,
    };
  if (!s.shot) return s;
  const shot = s.shot;
  shot.x += shot.vx * dt;
  shot.y += shot.vy * dt;
  if (shot.x < 20 || shot.x > 460) {
    shot.x = Math.max(20, Math.min(460, shot.x));
    shot.vx *= -1;
  }
  if (
    shot.y > 20 &&
    !s.bubbles.some((cell) => distance(center(cell), shot) < 39)
  )
    return s;
  const empty = [];
  for (let row = 0; row <= 11; row++)
    for (let col = 0; col < 10; col++)
      if (!s.bubbles.some((cell) => cell.row === row && cell.col === col))
        empty.push({ row, col, color: shot.color });
  empty.sort((a, b) => distance(center(a), shot) - distance(center(b), shot));
  const placed = empty[0];
  if (!placed) {
    s.status = "lost";
    return s;
  }
  s.bubbles.push(placed);
  const matched = connected(s.bubbles, [placed], true);
  if (matched.size >= 3) {
    s.bubbles = s.bubbles.filter((cell) => !matched.has(cell));
    const attached = connected(
      s.bubbles,
      s.bubbles.filter((cell) => cell.row === 0),
      false,
    );
    s.score += (matched.size + s.bubbles.length - attached.size) * s.reward;
    s.bubbles = s.bubbles.filter((cell) => attached.has(cell));
  } else {
    s.misses++;
    if (s.misses === 5) {
      s.bubbles.forEach((cell) => cell.row++);
      for (let col = 0; col < 10; col++)
        s.bubbles.push({ row: 0, col, color: Math.floor(random(s) * 4) });
      s.misses = 0;
    }
  }
  s.shot = null;
  s.nextColor = chooseColor(s);
  if (!s.bubbles.length) s.status = "won";
  else if (s.bubbles.some((cell) => center(cell).y >= 420)) s.status = "lost";
  return s;
}
export function draw(ctx, s, c) {
  const colors = [c.accent, c.reward, c.danger, c.text];
  function bubble(point, color) {
    disc(ctx, point.x, point.y, 19, colors[color]);
    ctx.fillStyle = c.surface;
    ctx.font = "bold 16px sans-serif";
    ctx.fillText(String(color + 1), point.x - 5, point.y + 5);
  }
  s.bubbles.forEach((cell) => bubble(center(cell), cell.color));
  if (s.shot) bubble(s.shot, s.shot.color);
  bubble({ x: 240, y: 465 }, s.nextColor);
  ctx.strokeStyle = c.text;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(240, 465);
  ctx.lineTo(240 + Math.sin(s.angle) * 65, 465 - Math.cos(s.angle) * 65);
  ctx.stroke();
  ctx.strokeStyle = c.danger;
  ctx.setLineDash([5, 5]);
  ctx.beginPath();
  ctx.moveTo(0, 420);
  ctx.lineTo(480, 420);
  ctx.stroke();
  ctx.setLineDash([]);
}
