import { afterEach, beforeEach, vi, describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Shop from "./Shop";

vi.mock(import("../components/ProductCard"), () => ({
  default: ({ product }) => (
    <div data-testid="product-card">{product.title}</div>
  ),
}));

const originalFetch = globalThis.fetch;

describe("Shop", () => {
  beforeEach(() => {
    globalThis.fetch = vi.fn();
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it("renders loading state first", () => {
    fetch.mockResolvedValue(new Promise(() => {}));

    render(<Shop />);

    expect(screen.getByRole("status")).toHaveTextContent("Loading...");
  });

  it("renders mocked product cards after a successful fetch", async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue([
        {
          id: 1,
          title: "Sample1",
          price: 100,
          image: "https://example.com/img/sample1.png",
        },
        {
          id: 2,
          title: "Sample2",
          price: 10,
          image: "https://example.com/img/sample2.png",
        },
      ]),
    });

    render(<Shop />);

    expect(await screen.findByText("Sample1")).toBeInTheDocument();
    expect(await screen.findByText("Sample2")).toBeInTheDocument();
    expect(screen.getAllByTestId("product-card")).toHaveLength(2);
  });

  it("renders an error message when the request fails", async () => {
    fetch.mockResolvedValue({
      ok: false,
      json: vi.fn(),
    });

    render(<Shop />);

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Failed to load products.",
    );
  });
});
