import { test, expect } from "@playwright/test";

test.describe("Cards", () => {
  test("loading skeleton are displayed when fetching mood cards", async ({
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
      await card.click();
      await expect(card).toHaveAttribute("aria-checked", "true");
    }

    await page.getByRole("button").filter({ hasText: "Next page" }).click();

    const card = page.getByTestId(/mood-card-.*/).first();

    await card.click();
    await expect(card).toHaveAttribute("aria-checked", "false");
  });

  test("error message is displayed when user tries to select more than 3 moods", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(page.getByTestId(/mood-card-.*/).first()).toBeVisible();
    const cards = await page.getByTestId(/mood-card-.*/).all();

    for (const card of cards) {
      await card.click();
      await expect(card).toHaveAttribute("aria-checked", "true");
    }

    await page.getByRole("button").filter({ hasText: "Next page" }).click();

    await page
      .getByTestId(/mood-card-.*/)
      .first()
      .click();

    await expect(
      page.getByText(/You can only select up to 3 moods/i),
    ).toBeVisible();
  });
});

test.describe("Navigation", () => {
  test("ability to search given mood", async ({ page }) => {
    await page.goto("/");

    await page.getByPlaceholder("Search").fill("Happiness");
    const card = page.getByTestId(`mood-card-Happiness`);
    await expect(card).toBeVisible();
  });

  test("search query is included in the url", async ({ page }) => {
    await page.goto("/");

    await page.getByPlaceholder("Search").fill("Happiness");

    await expect(page).toHaveURL(/.*\/\?search=Happiness/);
  });

  test("page number is included in the url", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("button").filter({ hasText: "Next page" }),
    ).toBeEnabled();

    await page.getByRole("button").filter({ hasText: "Next page" }).click();

    await expect(page).toHaveURL(/.*\/\?page=1/);

    await page.getByRole("button").filter({ hasText: "Previous page" }).click();

    await expect(page).toHaveURL(/.*\/\?page=0/);
  });

  test("selection state is preserved when navigating between pages", async ({
    page,
  }) => {
    await page.goto("/");

    const moods = ["Happiness", "Sadness"];

    for (const mood of moods) {
      await page.getByPlaceholder("Search").fill(mood);
      const card = page.getByTestId(`mood-card-${mood}`);
      await expect(card).toBeVisible();
      await card.getByRole("checkbox").click();
    }

    await page.getByRole("button").filter({ hasText: /clear/i }).click();

    for (const mood of moods) {
      const card = page.getByTestId(`mood-card-${mood}`);
      await expect(card).toBeVisible();
      await expect(card).toHaveAttribute("aria-checked", "true");
    }
  });

  test("search query is preserved when navigating between pages", async ({
    page,
  }) => {
    await page.goto("/");
    await page.getByPlaceholder("Search").fill("a");

    await page.getByRole("button").filter({ hasText: "Next page" }).click();

    await expect(page).toHaveURL(/.*\/\?search=a&page=1/);
  });

  test("search query is preserved when user clicks on 'Learn more'", async ({
    page,
  }) => {
    await page.goto("/");
    await page.getByPlaceholder("Search").fill("a");

    await page.getByRole("button").filter({ hasText: "Next page" }).click();

    await page.getByTestId("mood-card-Fear").getByRole("link").click();

    await expect(page).toHaveURL(/.*\/mood\/5\?search=a&page=1/);

    await page.getByRole("button").filter({ hasText: "Close" }).click();

    await expect(page).toHaveURL(/.*\?search=a&page=1/);
  });

  test("message is displayed when no search result have been found", async ({
    page,
  }) => {
    await page.goto("/");

    await page.getByPlaceholder("Search").fill("xxxxxxx");

    await expect(page.getByText(/no moods found/i)).toBeVisible();
  });

  test("navigation buttons are disabled when user reaches first and last page", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(
      page.getByRole("button").filter({ hasText: "Previous page" }),
    ).toBeDisabled();
    await expect(
      page.getByRole("button").filter({ hasText: "Next page" }),
    ).toBeEnabled();

    await page.goto("/?page=12");

    await expect(
      page.getByRole("button").filter({ hasText: "Previous page" }),
    ).toBeEnabled();
    await expect(
      page.getByRole("button").filter({ hasText: "Next page" }),
    ).toBeDisabled();
  });
});

test.describe("Details", () => {
  test("loading state is displayed when clicking on the mood card", async ({
    page,
  }) => {
    await page.goto("/");

    await page.getByTestId("mood-card-Happiness").getByRole("link").click();

    await expect(page.getByLabel("loading")).toBeVisible();
  });

  test("additional mood information is displayed when clicking on the mood", async ({
    page,
  }) => {
    await page.goto("/");

    await page.getByTestId("mood-card-Happiness").getByRole("link").click();

    await expect(
      page.getByRole("heading", { name: /Happiness/ }),
    ).toBeVisible();

    await expect(page).toHaveURL(/.*\/mood\/1/);

    await page.getByRole("button").filter({ hasText: "Close" }).click();

    await expect(page.getByRole("heading", { name: /Happiness/ })).toBeHidden();

    await expect(page).toHaveURL("/");
  });

  test("detail card states open when navigating", async ({ page }) => {
    await page.goto("/");

    await page.getByTestId("mood-card-Happiness").getByRole("link").click();

    await expect(
      page.getByRole("heading", { name: /Happiness/ }),
    ).toBeVisible();

    await page.getByPlaceholder("Search").fill("a");

    await expect(
      page.getByRole("heading", { name: /Happiness/ }),
    ).toBeVisible();

    await page.getByRole("button").filter({ hasText: "Next page" }).click();

    await expect(
      page.getByRole("heading", { name: /Happiness/ }),
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

  test("mood card is selected when clicking on the card", async ({ page }) => {
    await page.goto("/");

    const card = page.getByTestId("mood-card-Happiness");

    await card.click();
    await expect(card).toHaveAttribute("aria-checked", "true");

    await expect(card.getByRole("checkbox")).toHaveAttribute(
      "aria-checked",
      "true",
    );
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
});

test.describe("Save", () => {
  test("confirmation dialog is displayed when user saves the selected moods", async ({
    page,
  }) => {
    await page.goto("/");

    const cards = await page.getByTestId(/mood-card-.*/).all();
    for (const card of cards) {
      await card.click();
    }

    await page.getByRole("button", { name: "Save" }).click();

    await expect(page.getByRole("dialog")).toBeVisible();
  });
});
