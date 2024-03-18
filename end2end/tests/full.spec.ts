import { test, expect } from "@playwright/test";

test.describe("Cards", () => {
  test.skip("loading skeleton are displayed when fetching mood cards", async ({
    context,
  }) => {
    const page = await context.newPage();
    await page.goto("/");

    for (let i = 0; i < 3; i += 1) {
      await expect(page.getByLabel("loading").nth(i)).toBeVisible();
    }
  });

  test("renders a list of 3 mood cards", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByTestId(/mood-card-.*/)).toHaveCount(3);
  });

  test('ability to select not more than 3 "mood cards"', async ({ page }) => {
    await page.goto("/");

    await expect(page.getByTestId(/mood-card-.*/).first()).toBeVisible();
    const cards = await page.getByTestId(/mood-card-.*/).all();

    for (const card of cards) {
      await card.getByRole("checkbox").click();
      await expect(card).toHaveAttribute("aria-checked", "true");
      await expect(card).toHaveClass(/border-green-500/);
    }

    await page.getByRole("button").filter({ hasText: "Next page" }).click();

    const card = page.getByTestId(/mood-card-.*/).first();

    await card.getByRole("checkbox").click();
    await expect(card).toHaveAttribute("aria-checked", "false");
    await expect(card).toHaveClass(/border-neutral-50/);
  });
});

test.describe("Navigation", () => {
  test("ability to search given mood", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("button").filter({ hasText: "Next page" }).click();

    const moods = ["Love", "Serenity", "Excitement"];

    for (const mood of moods) {
      await page.getByPlaceholder("Search").fill(mood);
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
  });

  test("search should be debounced", async ({ page }) => {
    await page.goto("/");

    const moods = ["Love", "Serenity", "Excitement"];
    for (const mood of moods) {
      await page.getByPlaceholder("Search").fill(mood);
    }

    // eslint-disable-next-line playwright/no-wait-for-timeout
    await page.waitForTimeout(500);
    const card = page.getByTestId(`mood-card-${moods[moods.length - 1]}`);
    await expect(card).toBeVisible();
  });

  test("message is displayed when no search result have been found", async ({
    page,
  }) => {
    await page.goto("/");

    await page.getByPlaceholder("Search").fill("xxxxxxx");

    await expect(page.getByText(/no moods .* found!/i)).toBeVisible();
  });

  test("navigation buttons are disabled when user reaches first and last page", async ({
    page,
  }) => {
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
  });
});

test.describe("Details", () => {
  test("loading state is displayed when clicking on the mood card", async ({
    page,
  }) => {
    await page.goto("/");

    await page.getByTestId("mood-card-Happiness").click();

    await expect(page.getByLabel("loading")).toBeVisible();
  });
  test("additional mood information is displayed when clicking on the mood", async ({
    page,
  }) => {
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
  });

  test("only one state update is performed when clicking on the mood cards", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(page.getByTestId(/mood-card-.*/).first()).toBeVisible();

    const cards = ["Happiness", "Sadness"];

    for (let i = 0; i < 3; i += 1) {
      for (const card of cards) {
        await page.getByTestId(`mood-card-${card}`).click();
      }
    }

    // eslint-disable-next-line playwright/no-wait-for-timeout
    await page.waitForTimeout(500);
    await page.getByTestId(`mood-card-Anger`).click();

    await expect(
      page.locator("section").getByRole("heading", { name: /Anger/ }),
    ).toBeVisible();
  });
});

test.describe("UX", () => {
  test("search input is focused when entering the page", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByPlaceholder("Search")).toBeFocused();
  });

  test("count of 'mood cards' is displayed", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByText("Count: 39")).toBeVisible();

    await page.getByPlaceholder("Search").fill("Ha");

    await expect(page.getByText("Count: 2")).toBeVisible();
  });

  test("mood card is selected only when select button is clicked", async ({
    page,
  }) => {
    await page.goto("/");

    const card = page.getByTestId("mood-card-Happiness");

    card.click();
    await expect(card).toHaveAttribute("aria-checked", "false");
    await expect(card).toHaveClass(/border-neutral-50/);

    await card.getByRole("checkbox").click();
    await expect(card).toHaveAttribute("aria-checked", "true");
    await expect(card).toHaveClass(/border-green-500/);
  });
});
