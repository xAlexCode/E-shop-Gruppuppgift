import { describe, expect, it } from "vitest";

// Kräver att `npm run dev` är igång.
const BASE_URL = "http://localhost:3000";

describe("startsidan", () => {
  it("svarar 200 och visar headern med Korka Upp", async () => {
    const response = await fetch(`${BASE_URL}/`);
    const html = await response.text();

    expect(response.status).toBe(200);
    expect(html).toContain("Korka Upp");
    expect(html).toContain('href="/viner?typ=rott"');
  });
});
