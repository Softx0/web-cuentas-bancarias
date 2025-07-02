import { render, screen, fireEvent } from "@testing-library/react";
import { Select, Option } from "./Select";

const mockOptions: Option[] = [
  { value: "option1", label: "Opción 1" },
  { value: "option2", label: "Opción 2" },
  { value: "option3", label: "Opción 3" },
];

describe("Select Component", () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  test("renders select with options", () => {
    render(
      <Select
        options={mockOptions}
        value=""
        onChange={mockOnChange}
        placeholder="Seleccionar opción"
      />
    );

    expect(screen.getByDisplayValue("Seleccionar opción")).toBeInTheDocument();
    expect(screen.getByText("Opción 1")).toBeInTheDocument();
    expect(screen.getByText("Opción 2")).toBeInTheDocument();
    expect(screen.getByText("Opción 3")).toBeInTheDocument();
  });

  test("displays label when provided", () => {
    render(
      <Select
        options={mockOptions}
        value=""
        onChange={mockOnChange}
        label="Test Label"
      />
    );

    expect(screen.getByText("Test Label")).toBeInTheDocument();
  });

  test("calls onChange when option is selected", () => {
    render(<Select options={mockOptions} value="" onChange={mockOnChange} />);

    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "option2" } });

    expect(mockOnChange).toHaveBeenCalledWith("option2");
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  test("displays selected value", () => {
    render(
      <Select options={mockOptions} value="option2" onChange={mockOnChange} />
    );

    const select = screen.getByRole("combobox") as HTMLSelectElement;
    expect(select.value).toBe("option2");
  });

  test("displays error message when error prop is provided", () => {
    render(
      <Select
        options={mockOptions}
        value=""
        onChange={mockOnChange}
        error="Este campo es requerido"
      />
    );

    expect(screen.getByText("Este campo es requerido")).toBeInTheDocument();
  });

  test("applies error styles when error is present", () => {
    render(
      <Select
        options={mockOptions}
        value=""
        onChange={mockOnChange}
        error="Error message"
      />
    );

    const select = screen.getByRole("combobox");
    expect(select).toHaveClass("border-red-300");
  });

  test("applies normal styles when no error", () => {
    render(<Select options={mockOptions} value="" onChange={mockOnChange} />);

    const select = screen.getByRole("combobox");
    expect(select).toHaveClass("border-gray-300");
  });

  test("applies custom className", () => {
    const { container } = render(
      <Select
        options={mockOptions}
        value=""
        onChange={mockOnChange}
        className="custom-class"
      />
    );

    expect(container.firstChild).toHaveClass("custom-class");
  });
});
