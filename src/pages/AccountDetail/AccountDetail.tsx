import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAccounts } from "../../context/AccountsContext";
import { FilterOptions } from "../../types/banking.types";
import { Button } from "../../components/common/Button/Button";
import { Card } from "../../components/common/Card/Card";
import { Select } from "../../components/common/Select/Select";
import { Table } from "../../components/common/Table/Table";
import { TransactionRow } from "../../components/banking/TransactionRow/TransactionRow";

const AccountDetail: React.FC = () => {
  const { accountId } = useParams<{ accountId: string }>();
  const navigate = useNavigate();
  const { state, selectAccount, applyFilters } = useAccounts();

  const [filters, setFilters] = useState<FilterOptions>({
    dateFrom: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    dateTo: new Date().toISOString().split("T")[0],
    transactionType: "all",
  });

  useEffect(() => {
    if (accountId) {
      selectAccount(accountId);
    }
  }, [accountId, selectAccount]);

  useEffect(() => {
    applyFilters(filters);
  }, [filters, applyFilters]);

  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const formatCurrency = (amount: number, currency: string = "DOP"): string => {
    return new Intl.NumberFormat("es-DO", {
      style: "currency",
      currency: currency,
    }).format(amount);
  };

  const getAccountTypeLabel = (type: string): string => {
    const types = {
      checking: "Cuenta Corriente",
      savings: "Cuenta de Ahorros",
      credit: "Tarjeta de Crédito",
    };
    return types[type as keyof typeof types] || type;
  };

  const resetFilters = () => {
    setFilters({
      dateFrom: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      dateTo: new Date().toISOString().split("T")[0],
      transactionType: "all",
    });
  };

  if (state.loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">
            Cargando detalles de la cuenta...
          </p>
        </div>
      </div>
    );
  }

  if (state.error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Error al cargar la cuenta
          </h2>
          <p className="text-red-600 mb-6">{state.error}</p>
          <div className="space-x-4">
            <Button onClick={() => accountId && selectAccount(accountId)}>
              Reintentar
            </Button>
            <Button variant="outline" onClick={() => navigate("/accounts")}>
              Volver a Cuentas
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!state.selectedAccount) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 text-5xl mb-4">🔍</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Cuenta no encontrada
          </h2>
          <p className="text-gray-600 mb-6">
            La cuenta solicitada no existe o no tienes acceso a ella
          </p>
          <Button onClick={() => navigate("/accounts")}>
            Volver a Cuentas
          </Button>
        </div>
      </div>
    );
  }

  const account = state.selectedAccount;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={() => navigate("/accounts")}>
                ← Volver
              </Button>
              <h1 className="text-xl font-semibold">Detalle de Cuenta</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button onClick={() => navigate("/transfer")}>Transferir</Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Información de la Cuenta */}
          <Card className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {account.name}
                </h2>
                <div className="space-y-2">
                  <p>
                    <span className="font-medium">Tipo:</span>{" "}
                    {getAccountTypeLabel(account.accountType)}
                  </p>
                  <p>
                    <span className="font-medium">Número:</span> ****
                    {account.accountNumber.slice(-4)}
                  </p>
                  <p>
                    <span className="font-medium">Moneda:</span>{" "}
                    {account.currency}
                  </p>
                  <p>
                    <span className="font-medium">Estado:</span>
                    <span
                      className={`ml-2 px-2 py-1 text-xs rounded-full ${
                        account.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {account.isActive ? "Activa" : "Inactiva"}
                    </span>
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500 mb-2">Saldo Actual</p>
                <p
                  className={`text-4xl font-bold ${
                    account.balance >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {formatCurrency(account.balance, account.currency)}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Última transacción:{" "}
                  {new Date(account.lastTransactionDate).toLocaleDateString(
                    "es-DO"
                  )}
                </p>
              </div>
            </div>
          </Card>

          {/* Filtros de Transacciones */}
          <Card className="mb-6">
            <h3 className="text-lg font-semibold mb-4">
              Filtrar Transacciones
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Desde
                </label>
                <input
                  type="date"
                  value={filters.dateFrom}
                  onChange={(e) =>
                    handleFilterChange("dateFrom", e.target.value)
                  }
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Hasta
                </label>
                <input
                  type="date"
                  value={filters.dateTo}
                  onChange={(e) => handleFilterChange("dateTo", e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <Select
                label="Tipo de Transacción"
                value={filters.transactionType}
                onChange={(value) =>
                  handleFilterChange("transactionType", value)
                }
                options={[
                  { value: "all", label: "Todas" },
                  { value: "credit", label: "Solo Créditos" },
                  { value: "debit", label: "Solo Débitos" },
                ]}
              />
              <div className="flex items-end">
                <Button
                  onClick={resetFilters}
                  variant="outline"
                  className="w-full"
                >
                  Limpiar Filtros
                </Button>
              </div>
            </div>
          </Card>

          {/* Lista de Transacciones */}
          <Card>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">
                Transacciones ({state.filteredTransactions.length})
              </h3>
            </div>

            {state.filteredTransactions.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">📋</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No se encontraron transacciones
                </h3>
                <p className="text-gray-500 mb-6">
                  No hay transacciones que coincidan con los filtros aplicados
                </p>
                <Button variant="outline" onClick={resetFilters}>
                  Limpiar Filtros
                </Button>
              </div>
            ) : (
              <Table
                headers={[
                  "Fecha",
                  "Descripción",
                  "Categoría",
                  "Monto",
                  "Saldo",
                ]}
              >
                {state.filteredTransactions.map((transaction) => (
                  <TransactionRow
                    key={transaction.id}
                    transaction={transaction}
                  />
                ))}
              </Table>
            )}
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AccountDetail;
