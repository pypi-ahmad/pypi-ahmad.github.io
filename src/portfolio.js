/**
 * Portfolio Data — Barrel Export
 *
 * Re-exports every named export from the data layer so that components
 * can import all portfolio content from a single path:
 *
 *   import { greeting, skills, experience } from "../../portfolio";
 *
 * To add a new data section, create a file in src/data/ and add a line here.
 */
export * from "./data/settings";
export * from "./data/greeting";
export * from "./data/socialMedia";
export * from "./data/skills";
export * from "./data/education";
export * from "./data/experience";
export * from "./data/projects";
export * from "./data/contact";
export * from "./data/achievements";
export * from "./data/systems";
