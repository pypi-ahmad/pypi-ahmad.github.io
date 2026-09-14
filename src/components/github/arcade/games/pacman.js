import { base, clone, directions, same, random, block, disc } from "./common";
export function create(year) {
  const s = {
    ...base(year, 19, 13),
    player: { x: 1, y: 1 },
    walls: [],
    pellets: [],
    ghosts: [
      { x: 17, y: 11 },
      { x: 17, y: 1 },
    ],
    power: 0,
    ticks: 0,
  };
  for (let y = 0; y < s.height; y++)
    for (let x = 0; x < s.width; x++) {
      if (
        x === 0 ||
        y === 0 ||
        x === 18 ||
        y === 12 ||
        (x % 4 === 0 && y > 1 && y < 11 && y !== 6)
      )
        s.walls.push({ x, y });
      else if (x !== 1 || y !== 1)
        s.pellets.push({
          x,
          y,
          power: (x === 1 || x === 17) && (y === 1 || y === 11),
        });
    }
  return s;
}
export function step(previous, input, dt) {
  if (previous.status !== "playing") return previous;
  const s = clone(previous);
  s.clock += dt;
  s.power = Math.max(0, s.power - dt);
  if (s.clock < 0.16) return s;
  s.clock = 0;
  s.ticks++;
  const [dx, dy] = directions[input.direction] ?? [0, 0];
  const next = { x: s.player.x + dx, y: s.player.y + dy };
  if (!s.walls.some((cell) => same(cell, next))) s.player = next;
  const pellet = s.pellets.find((cell) => same(cell, s.player));
  if (pellet) {
    s.pellets = s.pellets.filter((cell) => cell !== pellet);
    s.score += s.reward;
    if (pellet.power) s.power = 6;
  }
  if (s.ticks % 2 === 0)
    s.ghosts = s.ghosts.map((ghost) => {
      const options = Object.values(directions)
        .map(([x, y]) => ({ x: ghost.x + x, y: ghost.y + y }))
        .filter((cell) => !s.walls.some((wall) => same(wall, cell)));
      options.sort(
        (a, b) =>
          (Math.abs(a.x - s.player.x) +
            Math.abs(a.y - s.player.y) -
            Math.abs(b.x - s.player.x) -
            Math.abs(b.y - s.player.y)) *
          (s.power ? -1 : 1),
      );
      return options[
        random(s) < 0.8 ? 0 : Math.floor(random(s) * options.length)
      ];
    });
  for (let i = 0; i < s.ghosts.length; i++)
    if (same(s.player, s.ghosts[i])) {
      if (s.power) {
        s.score += s.reward * 5;
        s.ghosts[i] = { x: 17, y: 11 };
      } else {
        s.lives--;
        s.player = { x: 1, y: 1 };
        s.ghosts = [
          { x: 17, y: 11 },
          { x: 17, y: 1 },
        ];
        if (s.lives === 0) s.status = "lost";
        break;
      }
    }
  if (s.status === "playing" && !s.pellets.length) s.status = "won";
  return s;
}
export function draw(ctx, s, c) {
  s.walls.forEach((cell) =>
    block(ctx, cell.x + 0.08, cell.y + 0.08, 0.84, 0.84, c.accent),
  );
  s.pellets.forEach((cell) =>
    disc(ctx, cell.x + 0.5, cell.y + 0.5, cell.power ? 0.28 : 0.1, c.reward),
  );
  disc(ctx, s.player.x + 0.5, s.player.y + 0.5, 0.4, c.text);
  s.ghosts.forEach((cell) => {
    block(
      ctx,
      cell.x + 0.12,
      cell.y + 0.12,
      0.76,
      0.76,
      s.power ? c.muted : c.danger,
    );
    disc(ctx, cell.x + 0.35, cell.y + 0.35, 0.08, c.surface);
  });
}
