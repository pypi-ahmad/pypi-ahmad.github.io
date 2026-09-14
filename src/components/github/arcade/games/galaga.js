import { base, clone, random, block, disc } from "./common";
function enemies(wave) {
  return Array.from({ length: 18 }, (_, i) => ({
    x: 75 + (i % 6) * 85,
    y: 42 + Math.floor(i / 6) * 34,
    hp: wave === 3 ? 2 : 1,
  }));
}
export function create(year) {
  return {
    ...base(year, 640, 400),
    player: 320,
    enemies: enemies(1),
    shots: [],
    hostile: [],
    wave: 1,
    direction: 1,
    cooldown: 0,
    fireClock: 0,
    invulnerable: 0,
  };
}
export function step(previous, input, dt) {
  if (previous.status !== "playing") return previous;
  const s = clone(previous);
  s.cooldown -= dt;
  s.fireClock += dt;
  s.invulnerable = Math.max(0, s.invulnerable - dt);
  s.player = Math.max(
    14,
    Math.min(
      626,
      input.pointer?.x ??
        s.player +
          (input.direction === "left"
            ? -1
            : input.direction === "right"
              ? 1
              : 0) *
            dt *
            310,
    ),
  );
  if (input.action && s.cooldown <= 0) {
    s.shots.push({ x: s.player, y: 355 });
    s.cooldown = 0.18;
  }
  s.enemies.forEach((enemy) => {
    enemy.x += s.direction * dt * (24 + s.wave * 8);
  });
  if (s.enemies.some((enemy) => enemy.x < 20 || enemy.x > 620)) {
    s.direction *= -1;
    s.enemies.forEach((enemy) => {
      enemy.y += 8;
    });
  }
  if (s.fireClock >= 0.7 && s.enemies.length) {
    const enemy = s.enemies[Math.floor(random(s) * s.enemies.length)];
    s.hostile.push({ x: enemy.x, y: enemy.y });
    s.fireClock = 0;
  }
  for (const shot of s.shots) {
    shot.y -= 360 * dt;
    const target = s.enemies.find(
      (enemy) =>
        Math.abs(enemy.x - shot.x) < 18 && Math.abs(enemy.y - shot.y) < 14,
    );
    if (target) {
      target.hp--;
      shot.y = -1;
      s.score += s.reward;
    }
  }
  s.shots = s.shots.filter((shot) => shot.y > 0);
  s.enemies = s.enemies.filter((enemy) => enemy.hp > 0);
  for (const shot of s.hostile) {
    shot.y += (140 + s.wave * 20) * dt;
    if (
      !s.invulnerable &&
      Math.abs(shot.y - 365) < 14 &&
      Math.abs(shot.x - s.player) < 17
    ) {
      s.lives--;
      s.invulnerable = 1.5;
      shot.y = 500;
    }
  }
  s.hostile = s.hostile.filter((shot) => shot.y < 410);
  if (s.lives <= 0 || s.enemies.some((enemy) => enemy.y > 340))
    s.status = "lost";
  else if (!s.enemies.length) {
    if (s.wave === 3) s.status = "won";
    else {
      s.wave++;
      s.enemies = enemies(s.wave);
      s.hostile = [];
      s.shots = [];
    }
  }
  return s;
}
export function draw(ctx, s, c) {
  s.enemies.forEach((enemy) => {
    block(ctx, enemy.x - 13, enemy.y - 8, 26, 16, c.danger);
    block(ctx, enemy.x - 5, enemy.y - 12, 10, 24, c.danger);
  });
  s.shots.forEach((shot) => block(ctx, shot.x - 2, shot.y, 4, 10, c.reward));
  s.hostile.forEach((shot) => disc(ctx, shot.x, shot.y, 4, c.danger));
  ctx.fillStyle = s.invulnerable ? c.reward : c.text;
  ctx.beginPath();
  ctx.moveTo(s.player, 347);
  ctx.lineTo(s.player - 15, 382);
  ctx.lineTo(s.player + 15, 382);
  ctx.closePath();
  ctx.fill();
}
