import { describe, expect, it } from "vitest";
import { resolveTheme, themeFamilyOptions } from "../theme";

describe("Theme registry — terminal family", () => {
  it("registers terminal in the selector options", () => {
    expect(themeFamilyOptions.some((family) => family.value === "terminal")).toBe(true);
  });

  it("exposes the requested dark terminal palette", () => {
    const theme = resolveTheme({ family: "terminal", mode: "dark" });

    expect(theme.body).toBe("#0A0F0A");
    expect(theme.text).toBe("#9EFFA1");
    expect(theme.accentColor).toBe("#00FF88");
    expect(theme.panelBorderStyle).toBe("solid");
    expect(theme.surfaceRadius).toBe("8px");
    expect(theme.accentFontFamily).toContain("Consolas");
  });

  it("keeps a readable light terminal variant", () => {
    const theme = resolveTheme({ family: "terminal", mode: "light" });

    expect(theme.body).toBe("#EEF7EE");
    expect(theme.text).toBe("#173020");
    expect(theme.accentBright).toBe("#00FF88");
    expect(theme.buttonText).toBe("#173020");
  });

  it("matrix-amber is available in the theme picker", () => {
    expect(themeFamilyOptions).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          value: "matrix-amber",
          label: "Matrix Amber",
        }),
      ])
    );
  });

  it("matrix-amber dark uses the requested retro amber terminal palette", () => {
    const theme = resolveTheme({ family: "matrix-amber", mode: "dark" });
    expect(theme).toMatchObject({
      body: "#0B0906",
      text: "#FFBF00",
      accentColor: "#E38B2C",
      accentBright: "#F0A74A",
      projectCard: "#14100B",
      cardBackgroundAlt: "#18130E",
      buttonText: "#FFBF00",
    });
  });

  it("matrix-amber light stays warm and readable without harsh contrast", () => {
    const theme = resolveTheme({ family: "matrix-amber", mode: "light" });
    expect(theme).toMatchObject({
      body: "#FAF3E5",
      text: "#44331A",
      accentColor: "#C7801A",
      accentBright: "#E39A2D",
      buttonText: "#44331A",
    });
  });

  it("blueprint is available in the theme picker", () => {
    expect(themeFamilyOptions).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          value: "blueprint",
          label: "Blueprint",
        }),
      ])
    );
  });

  it("blueprint dark uses the requested engineering blueprint palette", () => {
    const theme = resolveTheme({ family: "blueprint", mode: "dark" });
    expect(theme).toMatchObject({
      body: "#0B3D91",
      text: "#FFFFFF",
      accentColor: "#57D5FF",
      accentBright: "#9DEBFF",
      panelBorderStyle: "solid",
      projectCard: "#0A347A",
      buttonText: "#FFFFFF",
    });
  });

  it("blueprint light stays clean and technical with strong contrast", () => {
    const theme = resolveTheme({ family: "blueprint", mode: "light" });
    expect(theme).toMatchObject({
      body: "#F8FBFF",
      text: "#0B3D91",
      accentColor: "#1CA6D9",
      accentBright: "#74E3FF",
      panelBorderStyle: "solid",
      buttonText: "#0B3D91",
    });
  });

  it("deep-space is available in the theme picker", () => {
    expect(themeFamilyOptions).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          value: "deep-space",
          label: "Deep Space",
        }),
      ])
    );
  });

  it("deep-space dark uses a calm premium dark dashboard palette", () => {
    const theme = resolveTheme({ family: "deep-space", mode: "dark" });
    expect(theme).toMatchObject({
      body: "#08111D",
      text: "#F2F7FB",
      accentColor: "#34C7C9",
      accentBright: "#76E6E8",
      projectCard: "#0D1826",
      buttonText: "#F2F7FB",
    });
  });

  it("deep-space light keeps the SaaS look readable and clean", () => {
    const theme = resolveTheme({ family: "deep-space", mode: "light" });
    expect(theme).toMatchObject({
      body: "#F6FBFF",
      text: "#11263C",
      accentColor: "#1CAFB4",
      accentBright: "#67DDE7",
      projectCard: "#E4EEF6",
      buttonText: "#11263C",
    });
  });

  it("sunset-gradient is available in the theme picker", () => {
    expect(themeFamilyOptions).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          value: "sunset-gradient",
          label: "Sunset Gradient",
        }),
      ])
    );
  });

  it("sunset-gradient dark keeps gradients concentrated in hero and accents", () => {
    const theme = resolveTheme({ family: "sunset-gradient", mode: "dark" });
    expect(theme).toMatchObject({
      body: "#17131F",
      text: "#F8F3FA",
      accentColor: "#FF7A8E",
      accentBright: "#FF9EC1",
      projectCard: "#211A2B",
      surfacePattern: "none",
      buttonText: "#F8F3FA",
    });
    expect(theme.heroGradient).toContain("#4A1F38");
  });

  it("sunset-gradient light stays warm, readable, and restrained", () => {
    const theme = resolveTheme({ family: "sunset-gradient", mode: "light" });
    expect(theme).toMatchObject({
      body: "#FFF8FB",
      text: "#3F2848",
      accentColor: "#F56A7E",
      accentBright: "#FF8CA8",
      projectCard: "#F9E8F1",
      surfacePattern: "none",
      buttonText: "#3F2848",
    });
    expect(theme.heroGradient).toContain("#FFD9E6");
  });

  it("coffee is available in the theme picker", () => {
    expect(themeFamilyOptions).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          value: "coffee",
          label: "Coffee",
        }),
      ])
    );
  });

  it("coffee light uses a warm reading-friendly palette", () => {
    const theme = resolveTheme({ family: "coffee", mode: "light" });
    expect(theme).toMatchObject({
      body: "#F7F0E6",
      text: "#4A362C",
      accentColor: "#6B4B3E",
      accentBright: "#8A6251",
      projectCard: "#EFE3D6",
      buttonText: "#4A362C",
    });
  });

  it("coffee dark stays warm and soft without harsh contrast", () => {
    const theme = resolveTheme({ family: "coffee", mode: "dark" });
    expect(theme).toMatchObject({
      body: "#221A17",
      text: "#F1E7DD",
      accentColor: "#9B7660",
      accentBright: "#BC9277",
      projectCard: "#2B211D",
      buttonText: "#F1E7DD",
    });
  });

  it("arctic is available in the theme picker", () => {
    expect(themeFamilyOptions).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          value: "arctic",
          label: "Arctic",
        }),
      ])
    );
  });

  it("arctic light uses a crisp icy palette with restrained glassiness", () => {
    const theme = resolveTheme({ family: "arctic", mode: "light" });
    expect(theme).toMatchObject({
      body: "#F9FCFF",
      text: "#2F3A45",
      accentColor: "#5A9FD6",
      accentBright: "#9FD6FF",
      projectCard: "#EEF5FB",
      buttonText: "#2F3A45",
    });
  });

  it("arctic dark stays clean and cool without losing readability", () => {
    const theme = resolveTheme({ family: "arctic", mode: "dark" });
    expect(theme).toMatchObject({
      body: "#131A21",
      text: "#EEF4F8",
      accentColor: "#74B8E8",
      accentBright: "#B7E1FF",
      projectCard: "#1A242E",
      buttonText: "#EEF4F8",
    });
  });

  it("ember is available in the theme picker", () => {
    expect(themeFamilyOptions).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          value: "ember",
          label: "Ember",
        }),
      ])
    );
  });

  it("ember dark uses a bold industrial charcoal palette", () => {
    const theme = resolveTheme({ family: "ember", mode: "dark" });
    expect(theme).toMatchObject({
      body: "#1C1A19",
      text: "#F6EFE8",
      accentColor: "#F06A2F",
      accentBright: "#FF9A63",
      projectCard: "#262221",
      buttonText: "#F6EFE8",
    });
  });

  it("ember light stays warm and strong without losing readability", () => {
    const theme = resolveTheme({ family: "ember", mode: "light" });
    expect(theme).toMatchObject({
      body: "#FFF7F1",
      text: "#3C2F2B",
      accentColor: "#C85B2B",
      accentBright: "#EE8351",
      projectCard: "#F4E1D5",
      buttonText: "#3C2F2B",
    });
  });

  it("synthwave is available in the theme picker", () => {
    expect(themeFamilyOptions).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          value: "synthwave",
          label: "Synthwave",
        }),
      ])
    );
  });

  it("synthwave dark uses the requested retro-futuristic neon palette", () => {
    const theme = resolveTheme({ family: "synthwave", mode: "dark" });
    expect(theme).toMatchObject({
      body: "#110C20",
      text: "#FFFFFF",
      accentColor: "#FF4FD8",
      accentBright: "#44E7FF",
      projectCard: "#1D1431",
      buttonText: "#FFFFFF",
    });
  });

  it("synthwave light stays readable while keeping magenta and cyan accents", () => {
    const theme = resolveTheme({ family: "synthwave", mode: "light" });
    expect(theme).toMatchObject({
      body: "#FFF8FF",
      text: "#32294D",
      accentColor: "#D93CFF",
      accentBright: "#3ED8FF",
      projectCard: "#F2E1F8",
      buttonText: "#32294D",
    });
  });

  it("black-gold is available in the theme picker", () => {
    expect(themeFamilyOptions).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          value: "black-gold",
          label: "Black Gold",
        }),
      ])
    );
  });

  it("black-gold dark uses the requested graphite and muted gold palette", () => {
    const theme = resolveTheme({ family: "black-gold", mode: "dark" });
    expect(theme).toMatchObject({
      body: "#111214",
      text: "#F3F0E8",
      accentColor: "#C9A227",
      accentBright: "#D7B654",
      projectCard: "#17191C",
      buttonText: "#F3F0E8",
    });
  });

  it("black-gold light stays clean and high-end with restrained contrast", () => {
    const theme = resolveTheme({ family: "black-gold", mode: "light" });
    expect(theme).toMatchObject({
      body: "#FAF8F3",
      text: "#2F2A24",
      accentColor: "#C9A227",
      accentBright: "#D7B654",
      projectCard: "#EFEAE0",
      buttonText: "#2F2A24",
    });
  });
});
