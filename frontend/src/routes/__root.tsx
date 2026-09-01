import { createRootRoute } from "@tanstack/react-router";
import { z } from "zod";
import App from "@/App";
import { MoodsProvider } from "@/lib/moods-context";

const searchSchema = z.object({
  page: z.number().catch(0),
  search: z.string().catch(""),
});

export const Route = createRootRoute({
  validateSearch: searchSchema,
  component: () => (
    <MoodsProvider>
      <App />
    </MoodsProvider>
  ),
});
