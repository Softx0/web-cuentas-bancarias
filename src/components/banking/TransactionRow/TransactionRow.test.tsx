import { render, screen } from "@testing-library/react";
import { TransactionRow } from "./TransactionRow";
import { Transaction } from "../../../types/banking.types";

const mockCreditTransaction: Transaction = {
  id: "1",
  accountId: "acc1",
  type: "credit",
  amount: 100000,
  description: "Depósito en efectivo",
  date: "2024-01-15",
  balance: 500000,
  reference: "REF123456",
  category: "Depósitos",
};

const mockDebitTransaction: Transaction = {
  id: "2",
  accountId: "acc1",
  type: "debit",
  amount: 50000,
  description: "Retiro cajero automático",
  date: "2024-01-14",
  balance: 450000,
  reference: "REF123457",
  category: "Retiros",
};

describe("TransactionRow Component", () => {
  test("renders credit transaction correctly", () => {
    render(
      <table>
        <tbody>
          <TransactionRow transaction={mockCreditTransaction} />
        </tbody>
      </table>
    );

    expect(screen.getByText("15/1/2024")).toBeInTheDocument();
    expect(screen.getByText("Depósito en efectivo")).toBeInTheDocument();
    expect(screen.getByText("REF123456")).toBeInTheDocument();
    expect(screen.getByText("Depósitos")).toBeInTheDocument();
  });

  test("renders debit transaction correctly", () => {
    render(
      <table>
        <tbody>
          <TransactionRow transaction={mockDebitTransaction} />
        </tbody>
      </table>
    );

    expect(screen.getByText("14/1/2024")).toBeInTheDocument();
    expect(screen.getByText("Retiro cajero automático")).toBeInTheDocument();
    expect(screen.getByText("REF123457")).toBeInTheDocument();
    expect(screen.getByText("Retiros")).toBeInTheDocument();
  });

  test("displays positive amount for credit transactions", () => {
    render(
      <table>
        <tbody>
          <TransactionRow transaction={mockCreditTransaction} />
        </tbody>
      </table>
    );

    const amountElement = screen.getByText(/\+.*100[.,]000/);
    expect(amountElement).toBeInTheDocument();
    expect(amountElement).toHaveClass("text-green-600");
  });

  test("displays negative amount for debit transactions", () => {
    render(
      <table>
        <tbody>
          <TransactionRow transaction={mockDebitTransaction} />
        </tbody>
      </table>
    );

    const amountElement = screen.getByText(/-.*50[.,]000/);
    expect(amountElement).toBeInTheDocument();
    expect(amountElement).toHaveClass("text-red-600");
  });

  test("displays formatted balance", () => {
    render(
      <table>
        <tbody>
          <TransactionRow transaction={mockCreditTransaction} />
        </tbody>
      </table>
    );

    expect(screen.getByText(/500[.,]000/)).toBeInTheDocument();
  });

  test("displays category with proper styling", () => {
    render(
      <table>
        <tbody>
          <TransactionRow transaction={mockCreditTransaction} />
        </tbody>
      </table>
    );

    const categoryElement = screen.getByText("Depósitos");
    expect(categoryElement).toHaveClass(
      "px-2",
      "py-1",
      "text-xs",
      "font-medium",
      "rounded-full",
      "bg-gray-100",
      "text-gray-800"
    );
  });

  test("displays description and reference correctly", () => {
    render(
      <table>
        <tbody>
          <TransactionRow transaction={mockCreditTransaction} />
        </tbody>
      </table>
    );

    const description = screen.getByText("Depósito en efectivo");
    const reference = screen.getByText("REF123456");

    expect(description).toHaveClass("font-medium");
    expect(reference).toHaveClass("text-xs", "text-gray-500");
  });

  test("applies hover effect to row", () => {
    const { container } = render(
      <table>
        <tbody>
          <TransactionRow transaction={mockCreditTransaction} />
        </tbody>
      </table>
    );

    const row = container.querySelector("tr");
    expect(row).toHaveClass("hover:bg-gray-50");
  });

  test("formats date correctly", () => {
    const transactionWithDifferentDate = {
      ...mockCreditTransaction,
      date: "2024-12-25",
    };

    render(
      <table>
        <tbody>
          <TransactionRow transaction={transactionWithDifferentDate} />
        </tbody>
      </table>
    );

    expect(screen.getByText("25/12/2024")).toBeInTheDocument();
  });
});
