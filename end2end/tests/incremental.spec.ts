import { test, expect } from "@playwright/test";
test(
  'renders a list of "mood cards" on the page',
  { tag: "@task01" },
  async ({ page }) => {
    await page.goto("/");

    await expect(page.getByTestId(/mood-card-.*/)).toHaveCount(39);
  },
);

test(
  "loading state is displayed while mood cards are being loaded",
  { tag: "@task02" },
  async ({ page }) => {
    await page.goto("/");

    await expect(page.getByLabel("loading").first()).toBeVisible();
  },
);

test(
  "search input is focused when entering the page",
  { tag: "@task03" },
  async ({ page }) => {
    await page.goto("/");

    await expect(page.getByPlaceholder("Search")).toBeFocused();
  },
);

test(
  'ability to select and deselect "mood cards"',
  { tag: "@task04" },
  async ({ page }) => {
    await page.goto("/");

    const card = page.getByTestId("mood-card-Happiness");

    await card.getByRole("checkbox").click();
    await expect(card).toHaveAttribute("aria-checked", "true");
    await expect(card).toHaveClass(/border-green-500/);

    await card.getByRole("checkbox").click();
    await expect(card).toHaveAttribute("aria-checked", "false");
    await expect(card).toHaveClass(/border-neutral-50/);
  },
);

test(
  'limit number of possible "mood cards" selection to 3',
  { tag: "@task05" },
  async ({ page }) => {
    await page.goto("/");

    const moods = ["Happiness", "Love", "Serenity"];

    const cards = await Promise.all(
      moods.map(async (mood) => page.getByTestId(`mood-card-${mood}`)),
    );

    for (const card of cards) {
      await card.getByRole("checkbox").click();
      await expect(card).toHaveAttribute("aria-checked", "true");
      await expect(card).toHaveClass(/border-green-500/);
    }

    const card = page.getByTestId("mood-card-Anger");
    await card.getByRole("checkbox").click();
    await expect(card).toHaveAttribute("aria-checked", "false");
    await expect(card).toHaveClass(/border-neutral-50/);
  },
);

test(
  'renders a list of 3 "mood cards" on the page',
  { tag: "@task06" },
  async ({ page }) => {
    await page.goto("/");

    await expect(page.getByTestId(/mood-card-.*/)).toHaveCount(3);
  },
);

test('"mood cards" pagination', { tag: "@task07" }, async ({ page }) => {
  await page.goto("/");

  await expect(page.getByTestId(/mood-card-.*/)).toHaveCount(3);

  const firstPageMoods = ["Happiness", "Sadness", "Anger"];

  for (const mood of firstPageMoods) {
    await expect(page.getByTestId(`mood-card-${mood}`)).toBeVisible();
    await page.getByTestId(`mood-card-${mood}`).getByRole("checkbox").click();
  }

  await page.getByRole("button").filter({ hasText: "Next page" }).click();

  const secondPageMoods = ["Love", "Fear", "Excitement"];

  for (const mood of secondPageMoods) {
    await expect(page.getByTestId(`mood-card-${mood}`)).toBeVisible();
  }

  await page.getByRole("button").filter({ hasText: "Previous page" }).click();

  for (const mood of firstPageMoods) {
    const card = page.getByTestId(`mood-card-${mood}`);
    await expect(card).toHaveAttribute("aria-checked", "true");
    await expect(card).toHaveClass(/border-green-500/);
  }
});

test(
  "navigation button are disabled while waiting for response",
  { tag: "@task08" },
  async ({ context }) => {
    const page = await context.newPage();
    await page.goto("/");

    await expect(page.getByTestId(/mood-card-.*/)).toHaveCount(3);

    await page.getByRole("button").filter({ hasText: "Next page" }).click();

    await expect(
      page.getByRole("button").filter({ hasText: "Previous page" }),
    ).toBeDisabled();

    await expect(page.getByTestId(/mood-card-.*/)).toHaveCount(3);
  },
);

test(
  "ability to search for a given mood",
  { tag: "@tag09" },
  async ({ page }) => {
    await page.goto("/");

    const moods = ["Love", "Serenity", "Excitement"];

    for (const mood of moods) {
      await page.getByPlaceholder("Search").fill(mood);
      await expect(page.getByTestId(/mood-card-.*/)).toHaveCount(1);
      const card = page.getByTestId(`mood-card-${mood}`);
      await expect(card).toBeVisible();
      await card.getByRole("checkbox").click();
    }

    for (const mood of moods) {
      await page.getByPlaceholder("Search").fill(mood);
      const card = page.getByTestId(`mood-card-${mood}`);
      await expect(card).toHaveAttribute("aria-checked", "true");
      await expect(card).toHaveClass(/border-green-500/);
    }
  },
);

test(
  "'NoResults' is displayed when no search result have been found",
  { tag: "@task11" },
  async ({ page }) => {
    await page.goto("/");

    await page.getByPlaceholder("Search").fill("xxxxxxx");

    await expect(page.getByText(/no moods .* found!/i)).toBeVisible();
  },
);

test(
  "additional mood information is displayed when clicking on the mood",
  { tag: "@task12" },
  async ({ page }) => {
    await page.goto("/");

    await page.getByTestId("mood-card-Happiness").click();

    await expect(
      page.locator("section").getByRole("heading", { name: /Happiness/ }),
    ).toBeVisible();
    await expect(page).toHaveURL(/.*\/mood\/1/);

    await page.locator("section").getByRole("button").click();

    await expect(
      page.locator("section").getByRole("heading", { name: /Happiness/ }),
    ).toBeHidden();
    await expect(page).toHaveURL("/");
  },
);

test(
  "loading state is displayed while mood details are being loaded",
  { tag: "@task13" },
  async ({ page }) => {
    await page.goto("/");

    await page.getByTestId("mood-card-Happiness").click();

    await expect(page.getByLabel("loading")).toBeVisible();
  },
);

test(
  "count of 'mood cards' is displayed",
  { tag: "@task15" },
  async ({ page }) => {
    await page.goto("/");

    await expect(page.getByText("Count: 39")).toBeVisible();
  },
);

test(
  "navigation buttons are disabled when user reaches first and last page",
  { tag: "@task16" },
  async ({ page }) => {
    test.setTimeout(1 * 1000 * 60 * 2);
    await page.goto("/");

    await expect(
      page.getByRole("button").filter({ hasText: "Previous page" }),
    ).toBeHidden();
    await expect(
      page.getByRole("button").filter({ hasText: "Next page" }),
    ).toBeVisible();

    for (let i = 0; i < Math.floor(39 / 3) - 1; i++) {
      await expect(
        page
          .getByTestId(/mood-card-.*/)
          .filter({ has: page.getByRole("heading") }),
      ).toHaveCount(3);
      await page.getByRole("button").filter({ hasText: "Next page" }).click();
    }

    await expect(
      page.getByRole("button").filter({ hasText: "Next page" }),
    ).toBeHidden();

    await expect(
      page.getByRole("button").filter({ hasText: "Previous page" }),
    ).toBeVisible();
  },
);
