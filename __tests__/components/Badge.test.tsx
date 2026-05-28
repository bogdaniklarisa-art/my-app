import { render, screen } from "@testing-library/react";
import { Badge } from "@/components/ui/Badge/Badge";

describe("Badge", () => {
  it("renders the status text", () => {
    render(<Badge status="active" />);
    expect(screen.getByRole("status")).toHaveTextContent("active");
  });

  it("applies the correct class for each status", () => {
    const statuses = ["active", "inactive", "pending", "blacklisted"] as const;
    statuses.forEach((status) => {
      const { container } = render(<Badge status={status} />);
      expect(container.firstChild).toHaveClass(status);
    });
  });

  it("is accessible with role=status", () => {
    render(<Badge status="pending" />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });
});
