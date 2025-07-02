import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAccounts} from "../../context/AccountsContext";
import {TransferRequest} from "../../types/banking.types";
import {Button} from "../../components/common/Button/Button";
import {Card} from "../../components/common/Card/Card";
import {Select} from "../../components/common/Select/Select";

const Transfer: React.FC = () => {
  const navigate = useNavigate();
  const {state, loadAccounts, transferMoney} = useAccounts();

  const [formData, setFormData] = useState({
    fromAccountId: "",
    toAccountId: "",
    amount: "",
    description: "",
    date: new Date().toISOString().split("T")[0]
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isTransferring, setIsTransferring] = useState(false);

  useEffect(() => {
    loadAccounts();
  }, [loadAccounts]);

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("es-DO", {
      style: "currency",
      currency: "DOP"
    }).format(amount);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fromAccountId) {
      newErrors.fromAccountId = "Selecciona una cuenta origen";
    }

    if (!formData.toAccountId) {
      newErrors.toAccountId = "Selecciona una cuenta destino";
    }

    if (formData.fromAccountId === formData.toAccountId) {
      newErrors.toAccountId = "La cuenta destino debe ser diferente a la origen";
    }

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = "Ingresa un monto válido mayor a 0";
    }

    const amount = parseFloat(formData.amount);
    const fromAccount = state.accounts.find((acc) => acc.id === formData.fromAccountId);

    if (fromAccount && amount > fromAccount.balance) {
      newErrors.amount = `Saldo insuficiente. Disponible: ${formatCurrency(fromAccount.balance)}`;
    }

    if (!formData.description.trim()) {
      newErrors.description = "Ingresa una descripción";
    }

    if (!formData.date) {
      newErrors.date = "Selecciona una fecha";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof typeof formData, value: string): void => {
    setFormData((prev) => ({...prev, [field]: value}));

    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors((prev) => ({...prev, [field]: ""}));
    }
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsTransferring(true);

    try {
      const transferData: TransferRequest = {
        fromAccountId: formData.fromAccountId,
        toAccountId: formData.toAccountId,
        amount: parseFloat(formData.amount),
        description: formData.description,
        reference: `TRF${Date.now()}`
      };

      const result = await transferMoney(transferData);

      if (result.success) {
        // Mostrar mensaje de éxito y redirigir
        alert("¡Transferencia realizada exitosamente!");
        navigate("/accounts");
      } else {
        setErrors({general: result.message});
      }
    } catch (error) {
      setErrors({general: "Error al procesar la transferencia"});
    } finally {
      setIsTransferring(false);
    }
  };

  const resetForm = (): void => {
    setFormData({
      fromAccountId: "",
      toAccountId: "",
      amount: "",
      description: "",
      date: new Date().toISOString().split("T")[0]
    });

    setErrors({});
  };

  // Filtrar cuentas activas para los dropdowns
  const activeAccounts = state.accounts.filter((acc) => acc.isActive);

  // Opciones para el dropdown de cuenta origen (excluir tarjetas de crédito)
  const fromAccountOptions = activeAccounts
    .filter((acc) => acc.accountType !== "credit")
    .map((acc) => ({
      value: acc.id,
      label: `${acc.name} - ${formatCurrency(acc.balance)}`
    }));

  // Opciones para el dropdown de cuenta destino (excluir la cuenta origen seleccionada)
  const toAccountOptions = activeAccounts
    .filter((acc) => acc.id !== formData.fromAccountId)
    .map((acc) => ({
      value: acc.id,
      label: `${acc.name} - ****${acc.accountNumber.slice(-4)}`
    }));

  const selectedFromAccount = state.accounts.find((acc) => acc.id === formData.fromAccountId);

  if (state.loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando cuentas...</p>
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
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={() => navigate("/accounts")}>
                ← Volver
              </Button>
              <h1 className="text-xl font-semibold">Transferir Dinero</h1>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <Card>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Nueva Transferencia</h2>
              <p className="text-gray-600">Transfiere dinero entre tus cuentas de forma segura</p>
            </div>

            {errors.general && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-600 text-sm">{errors.general}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Cuenta Origen */}
              <Select
                label="Cuenta Origen"
                value={formData.fromAccountId}
                onChange={(value) => handleInputChange("fromAccountId", value)}
                options={fromAccountOptions}
                error={errors.fromAccountId}
                placeholder="Selecciona la cuenta de origen"
              />

              {/* Información de la cuenta origen */}
              {selectedFromAccount && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
                  <p className="text-sm text-blue-800">
                    <span className="font-medium">Saldo disponible:</span> {formatCurrency(selectedFromAccount.balance)}
                  </p>
                </div>
              )}

              {/* Cuenta Destino */}
              <Select
                label="Cuenta Destino"
                value={formData.toAccountId}
                onChange={(value) => handleInputChange("toAccountId", value)}
                options={toAccountOptions}
                error={errors.toAccountId}
                placeholder="Selecciona la cuenta destino"
                disabled={!formData.fromAccountId}
              />

              {/* Monto */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Monto a Transferir</label>
                <div className="relative">
                  <span className="absolute left-1 top-1/2 transform -translate-y-1/2 text-gray-500">DOP$</span>
                  <input
                    type="number"
                    step="0.01"
                    min="0.01"
                    value={formData.amount}
                    onChange={(e) => handleInputChange("amount", e.target.value)}
                    className={`block w-full pl-12 pr-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.amount ? "border-red-300 focus:border-red-500" : "border-gray-300 focus:border-blue-500"
                    }`}
                    placeholder="0.00"
                  />
                </div>
                {errors.amount && <p className="mt-1 text-sm text-red-600">{errors.amount}</p>}
              </div>

              {/* Fecha de Aplicación */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Aplicación</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange("date", e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.date ? "border-red-300 focus:border-red-500" : "border-gray-300 focus:border-blue-500"
                  }`}
                />
                {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date}</p>}
              </div>

              {/* Descripción */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  rows={3}
                  maxLength={200}
                  className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.description ? "border-red-300 focus:border-red-500" : "border-gray-300 focus:border-blue-500"
                  }`}
                  placeholder="Describe el motivo de la transferencia..."
                />
                <p className="mt-1 text-sm text-gray-500">{formData.description.length}/200 caracteres</p>
                {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
              </div>

              {/* Resumen de la transferencia */}
              {formData.fromAccountId && formData.toAccountId && formData.amount && (
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-md">
                  <h4 className="font-medium text-gray-900 mb-2">Resumen de la Transferencia</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>
                      <span className="font-medium">De:</span> {state.accounts.find((acc) => acc.id === formData.fromAccountId)?.name}
                    </p>
                    <p>
                      <span className="font-medium">Para:</span> {state.accounts.find((acc) => acc.id === formData.toAccountId)?.name}
                    </p>
                    <p>
                      <span className="font-medium">Monto:</span> {formatCurrency(parseFloat(formData.amount) || 0)}
                    </p>
                    <p>
                      <span className="font-medium">Fecha:</span> {new Date(formData.date).toLocaleDateString("es-DO")}
                    </p>
                  </div>
                </div>
              )}

              {/* Botones */}
              <div className="flex space-x-4 pt-6">
                <Button type="button" variant="outline" onClick={() => navigate("/accounts")} className="flex-1">
                  Cancelar
                </Button>
                <Button type="button" variant="secondary" onClick={resetForm} className="flex-1">
                  Limpiar
                </Button>
                <Button type="submit" loading={isTransferring} disabled={isTransferring} className="flex-1">
                  {isTransferring ? "Procesando..." : "Transferir"}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Transfer;
