import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import Header from "../components/header/Header";
import { renderWithProviders } from "../test/testUtils";

describe("Navigation disclosure", () => {
  it("gives separate instances their own controls relationship", () => {
    renderWithProviders(
      <>
        <Header />
        <Header />
      </>,
    );
    const triggers = screen.getAllByRole("button", {
      name: "Toggle navigation menu",
    });
    const ids = triggers.map((trigger) =>
      trigger.getAttribute("aria-controls"),
    );
    expect(new Set(ids).size).toBe(2);
    ids.forEach((id) =>
      expect(document.getElementById(id)).toHaveAttribute("hidden"),
    );
  });

  it("opens from the keyboard immediately and restores focus on Escape", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Header />);
    const trigger = screen.getByRole("button", {
      name: "Toggle navigation menu",
    });
    await user.tab();
    expect(screen.getByRole("link", { name: "Skip to content" })).toHaveFocus();
    await user.tab();
    await user.keyboard("{Enter}");
    const panel = document.getElementById(
      trigger.getAttribute("aria-controls"),
    );
    expect(panel).toHaveClass("menu--instant");
    await user.tab();
    expect(screen.getByRole("link", { name: "ahmad.m()" })).toHaveFocus();
    await user.keyboard("{Escape}");
    expect(trigger).toHaveFocus();
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(panel).toHaveAttribute("aria-hidden", "true");
    expect(panel).toHaveAttribute("inert");
    panel
      .querySelectorAll("a,button")
      .forEach((node) => expect(node).toHaveAttribute("tabindex", "-1"));
  });

  it("dismisses on an outside click without taking focus away from its target", async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <>
        <Header />
        <button>Outside action</button>
      </>,
    );
    const trigger = screen.getByRole("button", {
      name: "Toggle navigation menu",
    });
    await user.click(trigger);
    const outside = screen.getByRole("button", { name: "Outside action" });
    await user.click(outside);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(outside).toHaveFocus();
  });

  it("closes when keyboard focus leaves and can immediately reopen", async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <>
        <Header />
        <button>Outside action</button>
      </>,
    );
    const trigger = screen.getByRole("button", {
      name: "Toggle navigation menu",
    });
    await user.click(trigger);
    screen.getByRole("button", { name: "Switch to light mode" }).focus();
    await user.tab();
    expect(
      screen.getByRole("button", { name: "Outside action" }),
    ).toHaveFocus();
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    await user.click(trigger);
    expect(screen.getByRole("link", { name: "Contact" })).toBeVisible();
  });
});
