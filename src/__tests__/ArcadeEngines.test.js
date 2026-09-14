import { describe, it, expect, vi } from "vitest";
import * as snake from "../components/github/arcade/games/snake";
import * as pacman from "../components/github/arcade/games/pacman";
import * as breakout from "../components/github/arcade/games/breakout";
import * as galaga from "../components/github/arcade/games/galaga";
import * as bomberman from "../components/github/arcade/games/bomberman";
import * as puzzle from "../components/github/arcade/games/puzzle";
import * as minesweeper from "../components/github/arcade/games/minesweeper";
import {
  base,
  freeCell,
  backdrop,
} from "../components/github/arcade/games/common";
import { githubFixture } from "../test/githubFixture";
const year = githubFixture().years[1];
const engines = {
  snake,
  pacman,
  breakout,
  galaga,
  bomberman,
  puzzle,
  minesweeper,
};

describe("Arcade lifecycle and rendering", () => {
  for (const [name, engine] of Object.entries(engines)) {
    it(`${name}: deterministic, immutable updates and terminal states`, () => {
      const s = engine.create(year),
        before = JSON.stringify(s);
      expect(s).toEqual(engine.create(year));
      expect(engine.create({ ...year, year: 2025 }).seed).not.toBe(s.seed);
      engine.step(s, { direction: "right", action: true, cell: 40 }, 0.2);
      expect(JSON.stringify(s)).toBe(before);
      const won = { ...s, status: "won" };
      expect(engine.step(won, { action: true, cell: 2 }, 0.3)).toBe(won);
    });
    if (engine.draw)
      it(`${name}: renders active objects with supplied theme colors`, () => {
        const ctx = Object.fromEntries(
          [
            "fillRect",
            "beginPath",
            "arc",
            "fill",
            "fillText",
            "moveTo",
            "lineTo",
            "closePath",
            "stroke",
            "setLineDash",
          ].map((key) => [key, vi.fn()]),
        );
        const colors = {
          text: "white",
          accent: "blue",
          danger: "red",
          reward: "green",
          muted: "gray",
          surface: "black",
        };
        let s = engine.create(year);
        for (let i = 0; i < 20; i++)
          s = engine.step(s, { action: true, direction: "left" }, 0.1);
        engine.draw(ctx, s, colors);
        expect(
          ctx.fillRect.mock.calls.length + ctx.arc.mock.calls.length,
        ).toBeGreaterThan(0);
      });
  }
  it("handles a full board without inventing a free cell", () => {
    const s = base(year, 1, 1);
    expect(freeCell(s, [{ x: 0, y: 0 }])).toBeNull();
    const ctx = { fillRect: vi.fn() };
    backdrop(ctx, s, { surface: "black" });
    expect(ctx.fillRect).toHaveBeenCalledWith(0, 0, 1, 1);
  });
});
describe("Game rules", () => {
  it("Snake ticks, rejects reversal, grows, completes its target and loses on collisions", () => {
    const s = snake.create(year);
    expect(snake.step(s, {}, 0.01).snake).toEqual(s.snake);
    expect(snake.step(s, { direction: "left" }, 0.2).snake[0]).toEqual({
      x: 5,
      y: 6,
    });
    expect(snake.step(s, { direction: "up" }, 0.2).snake[0]).toEqual({
      x: 4,
      y: 5,
    });
    s.food = { x: 5, y: 6 };
    s.eaten = 19;
    const win = snake.step(s, {}, 0.2);
    expect(win.snake).toHaveLength(4);
    expect(win.score).toBe(s.reward);
    expect(win.status).toBe("won");
    s.snake[0] = { x: 19, y: 6 };
    expect(snake.step(s, {}, 0.2).status).toBe("lost");
    s.snake = [
      { x: 4, y: 6 },
      { x: 5, y: 6 },
      { x: 5, y: 7 },
    ];
    expect(snake.step(s, {}, 0.2).status).toBe("lost");
  });
  it("Pac-Man respects walls, power pellets, ghosts and maze completion", () => {
    const s = pacman.create(year);
    expect(pacman.step(s, { direction: "left" }, 0.2).player).toEqual(s.player);
    s.pellets = [{ x: 2, y: 1, power: true }];
    const won = pacman.step(s, { direction: "right" }, 0.2);
    expect(won.power).toBe(6);
    expect(won.status).toBe("won");
    s.pellets = [{ x: 3, y: 1, power: false }];
    s.ghosts = [{ x: 2, y: 1 }];
    s.lives = 1;
    expect(pacman.step(s, { direction: "right" }, 0.2).status).toBe("lost");
    s.power = 3;
    const powered = pacman.step(s, { direction: "right" }, 0.2);
    expect(powered.lives).toBe(1);
    expect(powered.score).toBe(s.reward * 5);
    s.ticks = 1;
    expect(pacman.step(s, { direction: "down" }, 0.2).ghosts).not.toEqual(
      s.ghosts,
    );
  });
  it("Breakout reflects, damages bricks, wins and counts missed balls", () => {
    const s = breakout.create(year);
    s.ball = { x: 2, y: 2, vx: -100, vy: -100 };
    const bounce = breakout.step(s, { pointer: { x: 900 } }, 0.03);
    expect(bounce.paddle).toBe(596);
    expect(bounce.ball.vx).toBeGreaterThan(0);
    expect(bounce.ball.vy).toBeGreaterThan(0);
    s.ball = { x: 320, y: 363, vx: 0, vy: 200 };
    expect(breakout.step(s, {}, 0.02).ball.vy).toBeLessThan(0);
    expect(breakout.step(s, { direction: "left" }, 0.02).paddle).toBeLessThan(
      320,
    );
    s.ball.y = 450;
    expect(breakout.step(s, {}, 0.02).lives).toBe(2);
    s.lives = 1;
    expect(breakout.step(s, {}, 0.02).status).toBe("lost");
    s.bricks = [{ x: 20, y: 35, hp: 1 }];
    s.ball = { x: 40, y: 34, vx: 0, vy: 100 };
    const win = breakout.step(s, {}, 0.02);
    expect(win.status).toBe("won");
    expect(win.score).toBe(s.reward);
  });
  it("Galaga shoots with cooldown, collides, advances waves and detects invasion", () => {
    const s = galaga.create(year),
      firing = galaga.step(s, { action: true, direction: "right" }, 0.1);
    expect(firing.shots).toHaveLength(1);
    expect(firing.player).toBeGreaterThan(320);
    expect(galaga.step(firing, { action: true }, 0.01).shots).toHaveLength(1);
    s.enemies = [{ x: 320, y: 100, hp: 2 }];
    s.shots = [{ x: 320, y: 108 }];
    expect(galaga.step(s, {}, 0.02).enemies[0].hp).toBe(1);
    s.hostile = [{ x: 320, y: 360 }];
    s.lives = 1;
    expect(galaga.step(s, {}, 0.02).status).toBe("lost");
    s.invulnerable = 1;
    expect(galaga.step(s, {}, 0.02).lives).toBe(1);
    s.enemies = [{ x: 621, y: 40, hp: 1 }];
    s.fireClock = 0.8;
    const edge = galaga.step(s, { pointer: { x: -1 } }, 0.02);
    expect(edge.direction).toBe(-1);
    expect(edge.hostile.length).toBeGreaterThan(0);
    expect(edge.player).toBe(14);
    s.enemies[0].y = 350;
    expect(galaga.step(s, {}, 0.02).status).toBe("lost");
    s.enemies = [];
    expect(galaga.step(s, {}, 0.02).wave).toBe(2);
    s.wave = 3;
    expect(galaga.step(s, {}, 0.02).status).toBe("won");
  });
  it("Bomberman bombs have a fuse, destroy blocks/enemies, and respect walls and exit", () => {
    const s = bomberman.create(year),
      planted = bomberman.step(s, { action: true, direction: "right" }, 0.16);
    expect(planted.bombs).toHaveLength(1);
    expect(planted.blasts).toHaveLength(0);
    expect(planted.player).toEqual({ x: 2, y: 1 });
    expect(bomberman.step(s, { direction: "left" }, 0.2).player).toEqual(
      s.player,
    );
    s.bombs = [{ x: 5, y: 5, time: 0 }];
    s.crates = [{ x: 6, y: 5 }];
    s.enemies = [{ x: 5, y: 4 }];
    const explosion = bomberman.step(s, {}, 0.02);
    expect(explosion.crates).toHaveLength(0);
    expect(explosion.enemies).toHaveLength(0);
    expect(explosion.score).toBe(s.reward * 11);
    expect(explosion.blasts.some((cell) => cell.x === 7 && cell.y === 5)).toBe(
      false,
    );
    s.enemies = [];
    s.player = { ...s.exit };
    expect(bomberman.step(s, {}, 0.01).status).toBe("won");
    s.bombs = [{ ...s.player, time: 0 }];
    expect(bomberman.step(s, {}, 0.01).status).toBe("lost");
    const moving = bomberman.create(year);
    moving.ticks = 3;
    expect(bomberman.step(moving, {}, 0.2).ticks).toBe(4);
  });
  it("Puzzle Bobble aims, matches, drops unsupported bubbles and lowers the ceiling", () => {
    const s = puzzle.create(year);
    expect(puzzle.step(s, { direction: "left" }, 0.1).angle).toBeLessThan(0);
    const shot = puzzle.step(
      s,
      { action: true, pointer: { x: 300, y: 0 } },
      0.1,
    );
    expect(shot.shot.y).toBeLessThan(465);
    shot.shot.x = 461;
    shot.shot.vx = 100;
    expect(puzzle.step(shot, {}, 0.01).shot.vx).toBeLessThan(0);
    s.bubbles = [
      { row: 0, col: 0, color: 0 },
      { row: 0, col: 1, color: 0 },
      { row: 1, col: 0, color: 1 },
    ];
    s.shot = { x: 114, y: 20, vx: 0, vy: -100, color: 0 };
    const win = puzzle.step(s, {}, 0.01);
    expect(win.status).toBe("won");
    expect(win.score).toBe(s.reward * 4);
    s.bubbles = [{ row: 0, col: 0, color: 0 }];
    s.misses = 4;
    s.shot = { x: 450, y: 10, vx: 0, vy: -100, color: 1 };
    const lower = puzzle.step(s, {}, 0.01);
    expect(lower.misses).toBe(0);
    expect(lower.bubbles.length).toBe(12);
    s.misses = 0;
    s.bubbles.push({ row: 11, col: 0, color: 0 });
    expect(puzzle.step(s, {}, 0.01).status).toBe("lost");
  });
  it("Minesweeper guarantees first-cell safety, flags, flood fill, ten mines and a win", () => {
    const initial = minesweeper.create(year);
    expect(minesweeper.step(initial, { cell: 90 })).toBe(initial);
    const flagged = minesweeper.step(initial, { cell: 0, flag: true });
    expect(flagged.cells[0].flag).toBe(true);
    expect(minesweeper.step(flagged, { cell: 0 }).cells[0].open).toBe(false);
    let s = minesweeper.step(initial, { cell: 40 });
    expect(s.cells[40].open).toBe(true);
    expect(s.cells[40].count).toBe(0);
    expect(s.cells.filter((cell) => cell.mine)).toHaveLength(10);
    expect(minesweeper.neighbors(0)).toEqual([1, 9, 10]);
    expect(minesweeper.step(s, { cell: 40 }).score).toBe(s.score);
    const mine = s.cells.findIndex((cell) => cell.mine);
    expect(minesweeper.step(s, { cell: mine }).status).toBe("lost");
    for (let i = 0; i < 81; i++)
      if (!s.cells[i].mine) s = minesweeper.step(s, { cell: i });
    expect(s.status).toBe("won");
    expect(s.score).toBe(71 * s.reward);
  });
});
