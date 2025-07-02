import React from "react";
import {Account} from "../../../types/banking.types";
import {Card} from "../../common/Card/Card";

interface AccountCardProps {
  account: Account;
  onClick?: () => void;
}

export const AccountCard: React.FC<AccountCardProps> = ({account, onClick}) => {
  const formatCurrency = (amount: number, currency: string): string => {
    return new Intl.NumberFormat("es-DO", {
      style: "currency",
      currency
    }).format(amount);
  };

  const getAccountTypeLabel = (type: string): string => {
    const types = {
      checking: "Cuenta Corriente",
      savings: "Cuenta de Ahorros",
      credit: "Tarjeta de Crédito"
    };

    return types[type as keyof typeof types] || type;
  };

  const getAccountTypeIcon = (type: string): string => {
    const icons = {
      checking: "💳",
      savings: "🏦",
      credit: "💰"
    };

    return icons[type as keyof typeof icons] || "💳";
  };

  return (
    <Card hoverable onClick={onClick} className="w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="text-2xl">{getAccountTypeIcon(account.accountType)}</div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{account.name}</h3>
            <p className="text-sm text-gray-500">{getAccountTypeLabel(account.accountType)}</p>
            <p className="text-xs text-gray-400">****{account.accountNumber.slice(-4)}</p>
          </div>
        </div>
        <div className="text-right">
          <p className={`text-xl font-bold ${account.balance >= 0 ? "text-green-600" : "text-red-600"}`}>{formatCurrency(account.balance, account.currency)}</p>
          <p className="text-xs text-gray-400">Última actividad: {new Date(account.lastTransactionDate).toLocaleDateString("es-DO")}</p>
        </div>
      </div>
    </Card>
  );
};
