import { formatCurrency, formatNumber, capitalize } from "@/utils/formatters";

describe("formatCurrency", () => {
  it("formats NGN amounts correctly", () => {
    const result = formatCurrency(200000);
    expect(result).toContain("200,000");
    expect(result).toMatch(/NGN|₦/);
  });

  it("includes decimal places", () => {
    expect(formatCurrency(1500)).toContain("1,500.00");
  });
});

describe("formatNumber", () => {
  it("formats numbers with commas", () => {
    expect(formatNumber(2453)).toBe("2,453");
  });

  it("handles large numbers", () => {
    expect(formatNumber(102453)).toBe("102,453");
  });

  it("handles zero", () => {
    expect(formatNumber(0)).toBe("0");
  });
});

describe("capitalize", () => {
  it("capitalizes the first letter", () => {
    expect(capitalize("active")).toBe("Active");
  });

  it("does not affect already-capitalized strings", () => {
    expect(capitalize("Pending")).toBe("Pending");
  });

  it("handles empty string", () => {
    expect(capitalize("")).toBe("");
  });
});
