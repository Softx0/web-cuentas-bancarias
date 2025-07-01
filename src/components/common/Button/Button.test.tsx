import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./Button";

describe("Button Component", () => {
  test("renders button with text", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  test("calls onClick when clicked", () => {
    const mockClick = jest.fn();
    render(<Button onClick={mockClick}>Click me</Button>);

    fireEvent.click(screen.getByText("Click me"));
    expect(mockClick).toHaveBeenCalledTimes(1);
  });

  test("shows loading state", () => {
    render(<Button loading>Click me</Button>);
    expect(screen.getByText("Cargando...")).toBeInTheDocument();
  });

  test("is disabled when disabled prop is true", () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  test("is disabled when loading prop is true", () => {
    render(<Button loading>Click me</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  test("applies correct variant classes", () => {
    const { container: primaryContainer } = render(
      <Button variant="primary">Primary</Button>
    );
    expect(primaryContainer.firstChild).toHaveClass("bg-blue-600");

    const { container: secondaryContainer } = render(
      <Button variant="secondary">Secondary</Button>
    );
    expect(secondaryContainer.firstChild).toHaveClass("bg-gray-600");

    const { container: outlineContainer } = render(
      <Button variant="outline">Outline</Button>
    );
    expect(outlineContainer.firstChild).toHaveClass(
      "border",
      "border-gray-300"
    );

    const { container: dangerContainer } = render(
      <Button variant="danger">Danger</Button>
    );
    expect(dangerContainer.firstChild).toHaveClass("bg-red-600");
  });

  test("applies correct size classes", () => {
    const { container: smContainer } = render(<Button size="sm">Small</Button>);
    expect(smContainer.firstChild).toHaveClass("px-3", "py-1.5", "text-sm");

    const { container: mdContainer } = render(
      <Button size="md">Medium</Button>
    );
    expect(mdContainer.firstChild).toHaveClass("px-4", "py-2", "text-sm");

    const { container: lgContainer } = render(<Button size="lg">Large</Button>);
    expect(lgContainer.firstChild).toHaveClass("px-6", "py-3", "text-base");
  });

  test("applies custom className", () => {
    const { container } = render(
      <Button className="custom-class">Custom</Button>
    );
    expect(container.firstChild).toHaveClass("custom-class");
  });

  test("sets correct button type", () => {
    render(<Button type="submit">Submit</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
  });

  test("does not call onClick when disabled", () => {
    const mockClick = jest.fn();
    render(
      <Button disabled onClick={mockClick}>
        Disabled
      </Button>
    );

    fireEvent.click(screen.getByText("Disabled"));
    expect(mockClick).not.toHaveBeenCalled();
  });

  test("does not call onClick when loading", () => {
    const mockClick = jest.fn();
    render(
      <Button loading onClick={mockClick}>
        Loading
      </Button>
    );

    fireEvent.click(screen.getByText("Cargando..."));
    expect(mockClick).not.toHaveBeenCalled();
  });
});
