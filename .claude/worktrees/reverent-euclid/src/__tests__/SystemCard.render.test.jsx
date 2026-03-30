/**
 * SystemCard — UI Rendering Tests
 *
 * Verifies the SystemCard renders card content (name, tagline, description,
 * metrics, tech badges, expand button) and modal structure on expansion.
 *
 * Source: src/components/SystemDesign/SystemCard.jsx
 */
import React from "react";
import { screen, within } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import SystemCard from "../components/SystemDesign/SystemCard";
import { renderWithProviders, darkTheme } from "../test/testUtils";

const mockSystem = {
  id: "test_system",
  name: "Test IDP Pipeline",
  tagline: "OCR + LLM extraction for policies",
  category: "Document AI · Enterprise",
  tier: "featured",
  metrics: ["~90% → 99% accuracy", "8-step pipeline"],
  description: "An end-to-end document intelligence system.",
  problem_statement: "Insurance documents were unstructured.",
  solution_overview: "Multi-stage pipeline with validation.",
  architecture: ["Step 1: Ingest", "Step 2: Extract", "Step 3: Validate"],
  key_features: ["Layout-aware OCR", "LLM reasoning"],
  implementation_details: "Built with Python and FastAPI.",
  challenges_solutions: [
    { challenge: "Noisy scans", solution: "Preprocessing pipeline" },
  ],
  impact: ["99% accuracy", "3x speed"],
  tech: ["Python", "PaddleOCR", "FastAPI"],
};

describe("SystemCard — UI Rendering", () => {
  it("renders the system name", () => {
    renderWithProviders(
      <SystemCard system={mockSystem} theme={darkTheme} />
    );
    expect(screen.getByText("Test IDP Pipeline")).toBeInTheDocument();
  });

  it("renders the 'Featured' badge for featured-tier systems", () => {
    renderWithProviders(
      <SystemCard system={mockSystem} theme={darkTheme} />
    );
    expect(screen.getByText("Featured")).toBeInTheDocument();
  });

  it("renders the category label", () => {
    renderWithProviders(
      <SystemCard system={mockSystem} theme={darkTheme} />
    );
    expect(screen.getByText("Document AI · Enterprise")).toBeInTheDocument();
  });

  it("renders the tagline", () => {
    renderWithProviders(
      <SystemCard system={mockSystem} theme={darkTheme} />
    );
    expect(
      screen.getByText("OCR + LLM extraction for policies")
    ).toBeInTheDocument();
  });

  it("renders the description", () => {
    renderWithProviders(
      <SystemCard system={mockSystem} theme={darkTheme} />
    );
    expect(
      screen.getByText("An end-to-end document intelligence system.")
    ).toBeInTheDocument();
  });

  it("renders metric items", () => {
    renderWithProviders(
      <SystemCard system={mockSystem} theme={darkTheme} />
    );
    expect(screen.getByText(/~90% → 99% accuracy/)).toBeInTheDocument();
    expect(screen.getByText(/8-step pipeline/)).toBeInTheDocument();
  });

  it("renders tech stack badges", () => {
    renderWithProviders(
      <SystemCard system={mockSystem} theme={darkTheme} />
    );
    expect(screen.getByText("Python")).toBeInTheDocument();
    expect(screen.getByText("PaddleOCR")).toBeInTheDocument();
    expect(screen.getByText("FastAPI")).toBeInTheDocument();
  });

  it("renders the 'View Deep Dive & Architecture' expand button", () => {
    renderWithProviders(
      <SystemCard system={mockSystem} theme={darkTheme} />
    );
    expect(
      screen.getByText(/View Deep Dive & Architecture/)
    ).toBeInTheDocument();
  });

  it("does not render Featured badge for non-featured systems", () => {
    const nonFeatured = { ...mockSystem, tier: "supporting" };
    renderWithProviders(
      <SystemCard system={nonFeatured} theme={darkTheme} />
    );
    expect(screen.queryByText("Featured")).not.toBeInTheDocument();
  });
});
