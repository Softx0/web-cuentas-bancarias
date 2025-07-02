import {render, screen, fireEvent} from "@testing-library/react";
import {Table, TableRow, TableCell} from "./Table";

describe("Table Components", () => {
  const mockHeaders = ["Header 1", "Header 2", "Header 3"];

  describe("Table Component", () => {
    test("renders table with headers", () => {
      render(
        <Table headers={mockHeaders}>
          <TableRow>
            <TableCell>Cell 1</TableCell>
            <TableCell>Cell 2</TableCell>
            <TableCell>Cell 3</TableCell>
          </TableRow>
        </Table>
      );

      expect(screen.getByText("Header 1")).toBeInTheDocument();
      expect(screen.getByText("Header 2")).toBeInTheDocument();
      expect(screen.getByText("Header 3")).toBeInTheDocument();
      expect(screen.getByText("Cell 1")).toBeInTheDocument();
      expect(screen.getByText("Cell 2")).toBeInTheDocument();
      expect(screen.getByText("Cell 3")).toBeInTheDocument();
    });

    test("applies custom className", () => {
      const {container} = render(
        <Table headers={mockHeaders} className="custom-table">
          <TableRow>
            <TableCell>Content</TableCell>
          </TableRow>
        </Table>
      );

      expect(container.firstChild).toHaveClass("custom-table");
    });

    test("renders table structure correctly", () => {
      render(
        <Table headers={mockHeaders}>
          <TableRow>
            <TableCell>Test</TableCell>
          </TableRow>
        </Table>
      );

      expect(screen.getByRole("table")).toBeInTheDocument();
      expect(screen.getByRole("columnheader", {name: "Header 1"})).toBeInTheDocument();
    });
  });

  describe("TableRow Component", () => {
    test("renders table row with children", () => {
      render(
        <table>
          <tbody>
            <TableRow>
              <TableCell>Row Content</TableCell>
            </TableRow>
          </tbody>
        </table>
      );

      expect(screen.getByText("Row Content")).toBeInTheDocument();
    });

    test("calls onClick when row is clicked", () => {
      const mockClick = jest.fn();

      render(
        <table>
          <tbody>
            <TableRow onClick={mockClick}>
              <TableCell>Clickable Row</TableCell>
            </TableRow>
          </tbody>
        </table>
      );

      fireEvent.click(screen.getByText("Clickable Row"));
      expect(mockClick).toHaveBeenCalledTimes(1);
    });

    test("applies cursor-pointer class when onClick is provided", () => {
      const mockClick = jest.fn();

      render(
        <table>
          <tbody>
            <TableRow onClick={mockClick}>
              <TableCell>Clickable Row</TableCell>
            </TableRow>
          </tbody>
        </table>
      );

      const row = screen.getByRole("row");

      expect(row).toHaveClass("cursor-pointer");
    });

    test("does not apply cursor-pointer class when onClick is not provided", () => {
      render(
        <table>
          <tbody>
            <TableRow>
              <TableCell>Non-clickable Row</TableCell>
            </TableRow>
          </tbody>
        </table>
      );

      const row = screen.getByRole("row");

      expect(row).not.toHaveClass("cursor-pointer");
    });

    test("applies custom className", () => {
      render(
        <table>
          <tbody>
            <TableRow className="custom-row">
              <TableCell>Content</TableCell>
            </TableRow>
          </tbody>
        </table>
      );

      const row = screen.getByRole("row");

      expect(row).toHaveClass("custom-row");
    });
  });

  describe("TableCell Component", () => {
    test("renders table cell with content", () => {
      render(
        <table>
          <tbody>
            <tr>
              <TableCell>Cell Content</TableCell>
            </tr>
          </tbody>
        </table>
      );

      expect(screen.getByText("Cell Content")).toBeInTheDocument();
    });

    test("applies custom className", () => {
      render(
        <table>
          <tbody>
            <tr>
              <TableCell className="custom-cell">Content</TableCell>
            </tr>
          </tbody>
        </table>
      );

      const cell = screen.getByRole("cell");

      expect(cell).toHaveClass("custom-cell");
    });

    test("applies default styles", () => {
      render(
        <table>
          <tbody>
            <tr>
              <TableCell>Content</TableCell>
            </tr>
          </tbody>
        </table>
      );

      const cell = screen.getByRole("cell");

      expect(cell).toHaveClass("px-6", "py-4", "whitespace-nowrap", "text-sm", "text-gray-900");
    });
  });

  describe("Table Integration", () => {
    test("renders complete table with multiple rows", () => {
      render(
        <Table headers={["Name", "Email", "Role"]}>
          <TableRow>
            <TableCell>Juan Pérez</TableCell>
            <TableCell>juan@email.com</TableCell>
            <TableCell>Admin</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>María García</TableCell>
            <TableCell>maria@email.com</TableCell>
            <TableCell>User</TableCell>
          </TableRow>
        </Table>
      );

      expect(screen.getByText("Name")).toBeInTheDocument();
      expect(screen.getByText("Email")).toBeInTheDocument();
      expect(screen.getByText("Role")).toBeInTheDocument();
      expect(screen.getByText("Juan Pérez")).toBeInTheDocument();
      expect(screen.getByText("María García")).toBeInTheDocument();
    });
  });
});
