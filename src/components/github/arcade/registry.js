export const games = [
  {
    id: "snake",
    name: "Snake",
    load: () => import("./games/snake"),
    instructions:
      "Collect 20 contribution pellets. Use arrow keys, WASD, or the direction buttons. Avoid the walls and your tail.",
    target: "Collect 20 pellets",
  },
  {
    id: "pacman",
    name: "Pac-Man",
    load: () => import("./games/pacman"),
    instructions:
      "Clear the maze. Use arrow keys, WASD, or the direction buttons. Large power pellets let you catch the square ghosts for six seconds.",
    target: "Collect every pellet",
  },
  {
    id: "breakout",
    name: "Breakout",
    load: () => import("./games/breakout"),
    instructions:
      "Clear every brick before losing three balls. Move with Left/Right, A/D, the buttons, or drag across the board. Brick numbers show remaining hits.",
    target: "Clear every brick",
  },
  {
    id: "galaga",
    name: "Galaga",
    load: () => import("./games/galaga"),
    instructions:
      "Clear three waves. Move with Left/Right, A/D, or drag across the board. Hold Space or Fire to shoot. Avoid enemy shots and protect your three lives.",
    target: "Clear three waves",
    action: "Fire",
  },
  {
    id: "bomberman",
    name: "Bomberman",
    load: () => import("./games/bomberman"),
    instructions:
      "Defeat both enemies and reach the exit at the bottom right. Move with arrow keys, WASD, or buttons. Space or Place bomb starts a two-second fuse. Move away from the blast.",
    target: "Defeat enemies, then reach the exit",
    action: "Place bomb",
  },
  {
    id: "puzzle",
    name: "Puzzle Bobble",
    load: () => import("./games/puzzle"),
    instructions:
      "Match at least three bubbles with the same number. Aim with Left/Right, A/D, or drag on the board. Space or Shoot launches. Five unmatched shots lower the ceiling. Clear the board before it reaches the dashed line.",
    target: "Clear all bubbles",
    action: "Shoot",
  },
  {
    id: "minesweeper",
    name: "Minesweeper",
    load: () => import("./games/minesweeper"),
    instructions:
      "Reveal all 71 safe cells and avoid ten mines. Your first reveal is safe. Use arrow keys to move, Enter to reveal, and F to flag. On touch, choose Reveal or Flag before selecting a cell.",
    target: "Reveal all safe cells",
  },
];
