import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Pagination } from "@/components/features/Pagination/Pagination";

const defaultProps = {
  page: 1,
  totalPages: 10,
  pageSize: 10,
  total: 100,
  onPageChange: jest.fn(),
  onPageSizeChange: jest.fn(),
};

describe("Pagination", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders navigation buttons", () => {
    render(<Pagination {...defaultProps} />);
    expect(screen.getByLabelText("Previous page")).toBeInTheDocument();
    expect(screen.getByLabelText("Next page")).toBeInTheDocument();
  });

  it("disables previous button on first page", () => {
    render(<Pagination {...defaultProps} page={1} />);
    expect(screen.getByLabelText("Previous page")).toBeDisabled();
  });

  it("disables next button on last page", () => {
    render(<Pagination {...defaultProps} page={10} totalPages={10} />);
    expect(screen.getByLabelText("Next page")).toBeDisabled();
  });

  it("calls onPageChange with next page when next is clicked", async () => {
    const user = userEvent.setup();
    const onPageChange = jest.fn();
    render(<Pagination {...defaultProps} page={3} onPageChange={onPageChange} />);
    await user.click(screen.getByLabelText("Next page"));
    expect(onPageChange).toHaveBeenCalledWith(4);
  });

  it("calls onPageChange with previous page when prev is clicked", async () => {
    const user = userEvent.setup();
    const onPageChange = jest.fn();
    render(<Pagination {...defaultProps} page={5} onPageChange={onPageChange} />);
    await user.click(screen.getByLabelText("Previous page"));
    expect(onPageChange).toHaveBeenCalledWith(4);
  });

  it("marks the current page button as aria-current", () => {
    render(<Pagination {...defaultProps} page={2} totalPages={5} />);
    expect(screen.getByLabelText("Page 2")).toHaveAttribute("aria-current", "page");
  });

  it("shows ellipsis for large page counts", () => {
    render(<Pagination {...defaultProps} page={5} totalPages={15} />);
    const ellipses = screen.getAllByText("...");
    expect(ellipses.length).toBeGreaterThan(0);
  });
});
