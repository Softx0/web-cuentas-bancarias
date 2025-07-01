import { render, screen, fireEvent } from "@testing-library/react";
import { Card } from "./Card";

describe("Card Component", () => {
  test("renders card with children", () => {
    render(
      <Card>
        <div>Test content</div>
      </Card>
    );
    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  test("applies correct padding classes", () => {
    const { container } = render(
      <Card padding="lg">
        <div>Test content</div>
      </Card>
    );
    expect(container.firstChild).toHaveClass("p-6");
  });

  test("applies correct shadow classes", () => {
    const { container } = render(
      <Card shadow="lg">
        <div>Test content</div>
      </Card>
    );
    expect(container.firstChild).toHaveClass("shadow-lg");
  });

  test("applies hoverable styles when hoverable prop is true", () => {
    const { container } = render(
      <Card hoverable>
        <div>Test content</div>
      </Card>
    );
    expect(container.firstChild).toHaveClass(
      "hover:shadow-lg",
      "cursor-pointer"
    );
  });

  test("calls onClick when clicked", () => {
    const mockClick = jest.fn();
    render(
      <Card onClick={mockClick}>
        <div>Test content</div>
      </Card>
    );

    fireEvent.click(screen.getByText("Test content"));
    expect(mockClick).toHaveBeenCalledTimes(1);
  });

  test("applies custom className", () => {
    const { container } = render(
      <Card className="custom-class">
        <div>Test content</div>
      </Card>
    );
    expect(container.firstChild).toHaveClass("custom-class");
  });
});
