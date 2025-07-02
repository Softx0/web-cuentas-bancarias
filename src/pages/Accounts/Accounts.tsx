import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAccounts } from "../../context/AccountsContext";
import { useAuth } from "../../context/AuthContext";
import { AccountCard } from "../../components/banking/AccountCard/AccountCard";
import { Button } from "../../components/common/Button/Button";

const Accounts: React.FC = () => {
  const navigate = useNavigate();
  const { state: authState, logout } = useAuth();
  const { state: accountsState, loadAccounts } = useAccounts();

  useEffect(() => {
    loadAccounts();
  }, []);

  const handleAccountClick = (accountId: string) => {
    navigate(`/account/${accountId}`);
  };

  if (accountsState.loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando cuentas...</p>
        </div>
      </div>
    );
  }

  if (accountsState.error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Error al cargar las cuentas
          </h2>
          <p className="text-red-600 mb-6">{accountsState.error}</p>
          <div className="space-x-4">
            <Button onClick={loadAccounts}>Reintentar</Button>
            <Button variant="outline" onClick={logout}>
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold">Mis Cuentas</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <span className="text-gray-700 block">
                  Hola, {authState.user?.name}
                </span>
                <span className="text-gray-500 text-sm block">
                  {authState.user?.email}
                </span>
              </div>
              <Button variant="danger" onClick={logout}>
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Resumen de Cuentas */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Resumen de Cuentas
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-medium text-gray-900">
                  Total en Cuentas
                </h3>
                <p className="text-2xl font-bold text-green-600">
                  {new Intl.NumberFormat("es-DO", {
                    style: "currency",
                    currency: "DOP",
                  }).format(
                    accountsState.accounts
                      .filter((acc) => acc.accountType !== "credit")
                      .reduce((total, acc) => total + acc.balance, 0)
                  )}
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-medium text-gray-900">
                  Número de Cuentas
                </h3>
                <p className="text-2xl font-bold text-blue-600">
                  {accountsState.accounts.filter((acc) => acc.isActive).length}
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-medium text-gray-900">
                  Deuda en Tarjetas
                </h3>
                <p className="text-2xl font-bold text-red-600">
                  {new Intl.NumberFormat("es-DO", {
                    style: "currency",
                    currency: "DOP",
                  }).format(
                    Math.abs(
                      accountsState.accounts
                        .filter((acc) => acc.accountType === "credit")
                        .reduce(
                          (total, acc) =>
                            total + (acc.balance < 0 ? acc.balance : 0),
                          0
                        )
                    )
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Lista de Cuentas */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Todas las Cuentas
              </h2>
              <Button onClick={() => navigate("/transfer")}>
                Nueva Transferencia
              </Button>
            </div>

            {accountsState.accounts.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">🏦</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No tienes cuentas registradas
                </h3>
                <p className="text-gray-500 mb-6">
                  Contacta a tu asesor para abrir una nueva cuenta
                </p>
                <Button variant="outline" onClick={loadAccounts}>
                  Actualizar
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {accountsState.accounts.map((account) => (
                  <AccountCard
                    key={account.id}
                    account={account}
                    onClick={() => handleAccountClick(account.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Accounts;
