import { base, clone, directions, same, random, block, disc } from "./common";
export function create(year) {
  const s = {
    ...base(year, 13, 11),
    lives: 1,
    player: { x: 1, y: 1 },
    walls: [],
    crates: [],
    bombs: [],
    blasts: [],
    enemies: [
      { x: 11, y: 9 },
      { x: 11, y: 1 },
    ],
    exit: { x: 11, y: 9 },
    ticks: 0,
    cooldown: 0,
  };
  for (let y = 0; y < 11; y++)
    for (let x = 0; x < 13; x++) {
      if (
        x === 0 ||
        y === 0 ||
        x === 12 ||
        y === 10 ||
        (x % 2 === 0 && y % 2 === 0)
      )
        s.walls.push({ x, y });
      else if (x > 2 && x < 11 && y > 1 && y < 9 && random(s) < 0.36)
        s.crates.push({ x, y });
    }
  return s;
}
export function step(previous, input, dt) {
  if (previous.status !== "playing") return previous;
  const s = clone(previous);
  s.clock += dt;
  s.cooldown -= dt;
  s.blasts = s.blasts
    .map((blast) => ({ ...blast, time: blast.time - dt }))
    .filter((blast) => blast.time > 0);
  if (
    input.action &&
    s.cooldown <= 0 &&
    s.bombs.length < 3 &&
    !s.bombs.some((bomb) => same(bomb, s.player))
  ) {
    s.bombs.push({ ...s.player, time: 2 });
    s.cooldown = 0.4;
  }
  s.bombs.forEach((bomb) => {
    bomb.time -= dt;
  });
  for (const bomb of s.bombs)
    if (bomb.time <= 0) {
      s.blasts.push({ x: bomb.x, y: bomb.y, time: 0.5 });
      for (const [dx, dy] of Object.values(directions))
        for (let distance = 1; distance <= 2; distance++) {
          const cell = {
            x: bomb.x + dx * distance,
            y: bomb.y + dy * distance,
            time: 0.5,
          };
          if (s.walls.some((wall) => same(wall, cell))) break;
          s.blasts.push(cell);
          const crate = s.crates.find((item) => same(item, cell));
          if (crate) {
            s.crates = s.crates.filter((item) => item !== crate);
            s.score += s.reward;
            break;
          }
        }
    }
  s.bombs = s.bombs.filter((bomb) => bomb.time > 0);
  if (s.clock >= 0.15) {
    s.clock = 0;
    s.ticks++;
    const [dx, dy] = directions[input.direction] ?? [0, 0],
      next = { x: s.player.x + dx, y: s.player.y + dy };
    if (![...s.walls, ...s.crates, ...s.bombs].some((cell) => same(cell, next)))
      s.player = next;
    if (s.ticks % 4 === 0)
      s.enemies = s.enemies.map((enemy) => {
        const options = Object.values(directions)
          .map(([x, y]) => ({ x: enemy.x + x, y: enemy.y + y }))
          .filter(
            (cell) =>
              ![...s.walls, ...s.crates, ...s.bombs].some((item) =>
                same(item, cell),
              ),
          );
        return options.length
          ? options[Math.floor(random(s) * options.length)]
          : enemy;
      });
  }
  const remaining = s.enemies.filter(
    (enemy) => !s.blasts.some((blast) => same(blast, enemy)),
  );
  s.score += (s.enemies.length - remaining.length) * s.reward * 10;
  s.enemies = remaining;
  if ([...s.blasts, ...s.enemies].some((cell) => same(cell, s.player)))
    s.status = "lost";
  else if (!s.enemies.length && same(s.player, s.exit)) s.status = "won";
  return s;
}
export function draw(ctx, s, c) {
  s.walls.forEach((cell) =>
    block(ctx, cell.x + 0.04, cell.y + 0.04, 0.92, 0.92, c.muted),
  );
  s.crates.forEach((cell) => {
    block(ctx, cell.x + 0.1, cell.y + 0.1, 0.8, 0.8, c.accent);
    block(ctx, cell.x + 0.4, cell.y + 0.1, 0.1, 0.8, c.surface);
  });
  block(
    ctx,
    s.exit.x + 0.1,
    s.exit.y + 0.1,
    0.8,
    0.8,
    s.enemies.length ? c.muted : c.reward,
  );
  s.bombs.forEach((bomb) => {
    disc(ctx, bomb.x + 0.5, bomb.y + 0.5, 0.35, c.text);
    ctx.fillStyle = c.surface;
    ctx.font = ".4px sans-serif";
    ctx.fillText(String(Math.ceil(bomb.time)), bomb.x + 0.37, bomb.y + 0.64);
  });
  s.blasts.forEach((cell) =>
    block(ctx, cell.x + 0.1, cell.y + 0.1, 0.8, 0.8, c.danger),
  );
  s.enemies.forEach((cell) => {
    disc(ctx, cell.x + 0.5, cell.y + 0.5, 0.32, c.danger);
    block(ctx, cell.x + 0.4, cell.y + 0.3, 0.15, 0.2, c.surface);
  });
  disc(ctx, s.player.x + 0.5, s.player.y + 0.5, 0.3, c.text);
}
