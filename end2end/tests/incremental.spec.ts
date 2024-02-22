import { test, expect } from "@playwright/test";
test('@task01 renders a list of "mood cards" on the page', async ({ page }) => {
  await page.goto("/");

  await expect(page.getByTestId(/mood-card-.*/)).toHaveCount(39);
});

test("@task02 loading state is displayed while mood cards are being loaded", async ({
  page,
}) => {
  await page.goto("/");

  await expect(page.getByLabel("loading").first()).toBeVisible();
});

test("@task03 search input is focused when entering the page", async ({
  page,
}) => {
  await page.goto("/");

  await expect(page.getByPlaceholder("Search")).toBeFocused();
});

test('@task04 ability to select "mood cards"', async ({ page }) => {
  await page.goto("/");

  const card = page.getByTestId("mood-card-Happiness");

  await card.getByRole("button").click();
  await expect(card).toHaveAttribute("aria-checked", "true");
  await expect(card).toHaveClass(/border-green-500/);

  await card.getByRole("button").click();
  await expect(card).toHaveAttribute("aria-checked", "false");
  await expect(card).toHaveClass(/border-neutral-50/);
});

test('@task05 ability to select only 3 "mood cards"', async ({ page }) => {
  await page.goto("/");

  const moods = ["Happiness", "Love", "Serenity"];

  const cards = await Promise.all(
    moods.map(async (mood) => page.getByTestId(`mood-card-${mood}`)),
  );

  for (const card of cards) {
    await card.getByRole("button").click();
    await expect(card).toHaveAttribute("aria-checked", "true");
    await expect(card).toHaveClass(/border-green-500/);
  }

  const card = page.getByTestId("mood-card-Anger");
  await card.getByRole("button").click();
  await expect(card).toHaveAttribute("aria-checked", "false");
  await expect(card).toHaveClass(/border-neutral-50/);
});

test('@task06 renders a list of 3 "mood cards" on the page', async ({
  page,
}) => {
  await page.goto("/");

  await expect(page.getByTestId(/mood-card-.*/)).toHaveCount(3);
});

test('@task07 "mood cards" pagination', async ({ page }) => {
  await page.goto("/");

  await expect(page.getByTestId(/mood-card-.*/)).toHaveCount(3);

  await page.getByRole("button").filter({ hasText: "Next page" }).click();

  const firstPageMoods = ["Happiness", "Sadness", "Anger"];

  for (const mood of firstPageMoods) {
    await expect(page.getByTestId(`mood-card-${mood}`)).toBeVisible();
    await page.getByTestId(`mood-card-${mood}`).getByRole("button").click();
  }

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

test("@task08 navigation button are disabled while waiting for response", async ({
  page,
}) => {
  await page.goto("/");

  await expect(page.getByTestId(/mood-card-.*/)).toHaveCount(3);

  await page.getByRole("button").filter({ hasText: "Next page" }).click();

  await expect(
    page.getByRole("button").filter({ hasText: "Previous page" }),
  ).toBeDisabled();
  await expect(page.getByTestId(/mood-card-.*/)).toHaveCount(3);

  await page.getByRole("button").filter({ hasText: "Previous page" }).click();

  await expect(
    page.getByRole("button").filter({ hasText: "Next page" }),
  ).toBeDisabled();
  await expect(page.getByTestId(/mood-card-.*/)).toHaveCount(3);
});

test("@task09 ability to search for a given mood", async ({ page }) => {
  await page.goto("/");

  const moods = ["Love", "Serenity", "Excitement"];

  for (const mood of moods) {
    await page.getByPlaceholder("Search").fill(mood);
    await expect(page.getByTestId(/mood-card-.*/)).toHaveCount(1);
    const card = page.getByTestId(`mood-card-${mood}`);
    await expect(card).toBeVisible();
    await card.getByRole("button").click();
  }

  for (const mood of moods) {
    await page.getByPlaceholder("Search").fill(mood);
    const card = page.getByTestId(`mood-card-${mood}`);
    await expect(card).toHaveAttribute("aria-checked", "true");
    await expect(card).toHaveClass(/border-green-500/);
  }
});

test("@task11 'NoResults' is displayed when no search result have been found", async ({
  page,
}) => {
  await page.goto("/");

  await page.getByPlaceholder("Search").fill("xxxxxxx");

  await expect(page.getByText("No moods found!")).toBeVisible();
});

test("@task12 additional mood information is displayed when clicking on the mood", async ({
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

test("@task13 loading state is displayed while mood details are being loaded", async ({
  page,
}) => {
  await page.goto("/");

  await page.getByTestId("mood-card-Happiness").click();

  await expect(page.locator("section").getByLabel("loading")).toBeVisible();
});

test("@task15 count of 'mood cards' is displayed", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByText("Count: 39")).toBeVisible();
});

test("@task16 navigation buttons are disabled when user reaches first and last page", async ({
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
