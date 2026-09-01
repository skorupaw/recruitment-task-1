import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { Toaster } from "@/ui";

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export function Root() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default Root;
