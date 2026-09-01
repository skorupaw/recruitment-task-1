import { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import {
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import userEvent from "@testing-library/user-event";
import { Toaster } from "@/ui";

/**
 * Mounts the given UI as a route component in a memory router.
 *
 * @param path - the route path the UI is mounted at (e.g. "/mood/$moodId")
 * @param routes - the initial history entries (e.g. ["/mood/1"])
 */
const createTestRouter = (ui: ReactElement, path: string, routes: string[]) => {
  const rootRoute = createRootRoute();
  const testRoute = createRoute({
    getParentRoute: () => rootRoute,
    path,
    component: () => ui,
  });

  return createRouter({
    routeTree: rootRoute.addChildren([testRoute]),
    history: createMemoryHistory({ initialEntries: routes }),
  });
};

const customRender = (
  ui: ReactElement,
  { path = "/", routes = ["/"] }: { path?: string; routes?: string[] } = {},
  options?: Omit<RenderOptions, "wrapper">,
) => ({
  user: userEvent.setup(),
  ...render(
    <>
      <RouterProvider router={createTestRouter(ui, path, routes)} />
      <Toaster />
    </>,
    options,
  ),
});

export * from "@testing-library/react";
export { customRender as render };
