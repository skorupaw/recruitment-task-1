import { renderHook, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, test } from "vitest";
import useFetch from "./useFetch";
import { server } from "@/test-utils/msw";
import { delay, http, HttpResponse } from "msw";

describe("useFetch Hook", () => {
  const mockData = { id: 1, name: "Mock Data" };

  afterEach(() => {
    server.resetHandlers();
  });

  test("Initial state is loading with no data or error", () => {
    const { result } = renderHook(() => useFetch("/api/test"));
    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe(null);
  });

  test("Fetches data successfully", async () => {
    server.use(
      http.get("/api/test", () => {
        return HttpResponse.json(mockData);
      }),
    );

    const { result } = renderHook(() => useFetch("/api/test"));

    await waitFor(() => expect(result.current.loading).toBe(false), {
      timeout: 2000,
    });

    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBe(null);
  });

  test("Handles HTTP error", async () => {
    server.use(
      http.get("/api/test", () => {
        return HttpResponse.json({ message: "Not Found" }, { status: 404 });
      }),
    );

    const { result } = renderHook(() => useFetch("/api/test"));

    await waitFor(() => expect(result.current.loading).toBe(false), {
      timeout: 2000,
    });

    expect(result.current.data).toBe(null);
    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error?.message).toBe("HTTP error! Status: 404");
  });

  test("Aborts fetch on unmount", async () => {
    server.use(
      http.get("/api/test", () => {
        delay(100);
        return HttpResponse.json(mockData);
      }),
    );

    const { result, unmount } = renderHook(() => useFetch("/api/test"));
    unmount();

    await new Promise((resolve) => setTimeout(resolve, 200));

    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe(null);
    expect(result.current.loading).toBe(true);
  });

  test("Refetches when params change", async () => {
    server.use(
      http.get("/api/test", ({ request }) => {
        const url = new URL(request.url);
        const param = url.searchParams.get("param");
        return HttpResponse.json({ param });
      }),
    );

    const { result, rerender } = renderHook(
      ({ params }) => useFetch("/api/test", params),
      {
        initialProps: { params: { param: "initial" } },
      },
    );

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.data).toEqual({ param: "initial" });

    rerender({ params: { param: "updated" } });

    await waitFor(() =>
      expect(result.current.data).toEqual({ param: "updated" }),
    );
  });
});
