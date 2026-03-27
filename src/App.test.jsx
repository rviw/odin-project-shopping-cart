import { afterEach, beforeEach, vi, describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import routes from "./routes.jsx";

vi.mock("./components/Header", () => ({
  default: () => <div data-testid="header">Header</div>,
}));

const originalFetch = globalThis.fetch;

describe("App layout", () => {
  beforeEach(() => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue([]),
    });
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it("renders the shared header and the current route", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/shop"],
    });

    render(<RouterProvider router={router} />);

    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(
      await screen.findByRole("heading", { name: "Shop" }),
    ).toBeInTheDocument();
  });
});
