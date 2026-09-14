import { base, clone, random, block, disc } from "./common";
export function create(year) {
  const s = {
    ...base(year, 640, 400),
    paddle: 320,
    ball: { x: 320, y: 345, vx: 145, vy: -190 },
    bricks: [],
  };
  for (let row = 0; row < 4; row++)
    for (let col = 0; col < 10; col++)
      s.bricks.push({
        x: 22 + col * 60,
        y: 35 + row * 27,
        hp: 1 + Math.floor(random(s) * 3),
      });
  return s;
}
export function step(previous, input, dt) {
  if (previous.status !== "playing") return previous;
  const s = clone(previous),
    b = s.ball;
  s.paddle = Math.max(
    44,
    Math.min(
      596,
      input.pointer?.x ??
        s.paddle +
          (input.direction === "left"
            ? -1
            : input.direction === "right"
              ? 1
              : 0) *
            dt *
            430,
    ),
  );
  b.x += b.vx * dt;
  b.y += b.vy * dt;
  if (b.x < 7 || b.x > 633) {
    b.x = Math.max(7, Math.min(633, b.x));
    b.vx *= -1;
  }
  if (b.y < 7) {
    b.y = 7;
    b.vy = Math.abs(b.vy);
  }
  if (b.vy > 0 && b.y >= 362 && b.y <= 381 && Math.abs(b.x - s.paddle) <= 51) {
    b.y = 361;
    b.vy = -Math.abs(b.vy);
    b.vx = (b.x - s.paddle) * 4.5;
  }
  for (const brick of s.bricks)
    if (
      b.x >= brick.x - 6 &&
      b.x <= brick.x + 60 &&
      b.y >= brick.y - 6 &&
      b.y <= brick.y + 26
    ) {
      brick.hp--;
      s.score += s.reward;
      b.vy *= -1;
      b.y += Math.sign(b.vy) * 8;
      break;
    }
  s.bricks = s.bricks.filter((brick) => brick.hp > 0);
  if (!s.bricks.length) s.status = "won";
  else if (b.y > 410) {
    s.lives--;
    s.ball = { x: s.paddle, y: 345, vx: 145, vy: -190 };
    if (!s.lives) s.status = "lost";
  }
  return s;
}
export function draw(ctx, s, c) {
  s.bricks.forEach((brick) => {
    block(ctx, brick.x, brick.y, 54, 20, c.accent);
    ctx.fillStyle = c.surface;
    ctx.font = "12px sans-serif";
    ctx.fillText(String(brick.hp), brick.x + 23, brick.y + 15);
  });
  block(ctx, s.paddle - 44, 372, 88, 9, c.text);
  disc(ctx, s.ball.x, s.ball.y, 6, c.reward);
}
