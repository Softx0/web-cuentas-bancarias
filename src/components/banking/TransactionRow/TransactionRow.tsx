import React from "react";
import { Transaction } from "../../../types/banking.types";

interface TransactionRowProps {
  transaction: Transaction;
}

export const TransactionRow: React.FC<TransactionRowProps> = ({
  transaction,
}) => {
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("es-DO", {
      style: "currency",
      currency: "DOP",
    }).format(amount);
  };

  const formatDate = (date: string): string => {
    return new Date(date).toLocaleDateString("es-DO");
  };

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {formatDate(transaction.date)}
      </td>
      <td className="px-6 py-4 text-sm text-gray-900">
        <div className="flex flex-col">
          <span className="font-medium">{transaction.description}</span>
          <span className="text-xs text-gray-500">{transaction.reference}</span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
          {transaction.category}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-right">
        <span
          className={
            transaction.type === "credit" ? "text-green-600" : "text-red-600"
          }
        >
          {transaction.type === "credit" ? "+" : "-"}
          {formatCurrency(transaction.amount)}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
        {formatCurrency(transaction.balance)}
      </td>
    </tr>
  );
};
