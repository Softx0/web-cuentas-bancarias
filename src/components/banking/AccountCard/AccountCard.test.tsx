import { render, screen, fireEvent } from "@testing-library/react";
import { AccountCard } from "./AccountCard";
import { Account } from "../../../types/banking.types";

const mockAccount: Account = {
  id: "1",
  accountNumber: "1234567890",
  accountType: "checking",
  balance: 2500000,
  currency: "DOP",
  name: "Cuenta Corriente Principal",
  isActive: true,
  createdAt: "2023-01-15",
  lastTransactionDate: "2024-01-10",
};

const mockSavingsAccount: Account = {
  id: "2",
  accountNumber: "0987654321",
  accountType: "savings",
  balance: 5750000,
  currency: "DOP",
  name: "Cuenta de Ahorros",
  isActive: true,
  createdAt: "2023-03-20",
  lastTransactionDate: "2024-01-08",
};

const mockCreditAccount: Account = {
  id: "3",
  accountNumber: "1122334455",
  accountType: "credit",
  balance: -850000,
  currency: "DOP",
  name: "Tarjeta de Crédito",
  isActive: true,
  createdAt: "2023-06-10",
  lastTransactionDate: "2024-01-09",
};

describe("AccountCard Component", () => {
  test("renders account information correctly", () => {
    render(<AccountCard account={mockAccount} />);

    expect(screen.getByText("Cuenta Corriente Principal")).toBeInTheDocument();
    expect(screen.getByText("Cuenta Corriente")).toBeInTheDocument();
    expect(screen.getByText("****7890")).toBeInTheDocument();
  });

  test("displays correct account type labels", () => {
    const { rerender } = render(<AccountCard account={mockAccount} />);
    expect(screen.getByText("Cuenta Corriente")).toBeInTheDocument();

    rerender(<AccountCard account={mockSavingsAccount} />);
    expect(screen.getByText("Cuenta de Ahorros")).toBeInTheDocument();

    rerender(<AccountCard account={mockCreditAccount} />);
    expect(screen.getByText("Tarjeta de Crédito")).toBeInTheDocument();
  });

  test("displays correct account type icons", () => {
    const { rerender } = render(<AccountCard account={mockAccount} />);
    expect(screen.getByText("💳")).toBeInTheDocument();

    rerender(<AccountCard account={mockSavingsAccount} />);
    expect(screen.getByText("🏦")).toBeInTheDocument();

    rerender(<AccountCard account={mockCreditAccount} />);
    expect(screen.getByText("💰")).toBeInTheDocument();
  });

  test("formats currency correctly", () => {
    render(<AccountCard account={mockAccount} />);

    // El formateo específico puede variar según el locale
    expect(screen.getByText(/2[.,]500[.,]000/)).toBeInTheDocument();
  });

  test("shows positive balance in green", () => {
    const { container } = render(<AccountCard account={mockAccount} />);
    const balanceElement = container.querySelector(".text-green-600");
    expect(balanceElement).toBeInTheDocument();
  });

  test("shows negative balance in red", () => {
    const { container } = render(<AccountCard account={mockCreditAccount} />);
    const balanceElement = container.querySelector(".text-red-600");
    expect(balanceElement).toBeInTheDocument();
  });

  test("displays last transaction date", () => {
    render(<AccountCard account={mockAccount} />);
    expect(screen.getByText(/Última actividad:/)).toBeInTheDocument();
  });

  test("calls onClick when card is clicked", () => {
    const mockClick = jest.fn();
    render(<AccountCard account={mockAccount} onClick={mockClick} />);

    fireEvent.click(screen.getByText("Cuenta Corriente Principal"));
    expect(mockClick).toHaveBeenCalledTimes(1);
  });

  test("shows last 4 digits of account number", () => {
    render(<AccountCard account={mockAccount} />);
    expect(screen.getByText("****7890")).toBeInTheDocument();
  });

  test("handles missing onClick gracefully", () => {
    render(<AccountCard account={mockAccount} />);

    // No debería lanzar error al hacer click sin onClick
    fireEvent.click(screen.getByText("Cuenta Corriente Principal"));
  });
});
