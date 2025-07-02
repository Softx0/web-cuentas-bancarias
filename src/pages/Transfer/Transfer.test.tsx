import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../../context/AuthContext";
import { AccountsProvider } from "../../context/AccountsContext";
import Transfer from "./Transfer";

const mockNavigate = jest.fn();

// Mock del hook useNavigate
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

// Mock del bankingService
jest.mock("../../services/bankingService", () => ({
  bankingService: {
    getAccounts: jest.fn().mockResolvedValue([
      {
        id: "1",
        accountNumber: "1234567890",
        accountType: "checking",
        balance: 2500000,
        currency: "DOP",
        name: "Cuenta Corriente Principal",
        isActive: true,
        createdAt: "2023-01-15",
        lastTransactionDate: "2024-01-10",
      },
      {
        id: "2",
        accountNumber: "0987654321",
        accountType: "savings",
        balance: 5750000,
        currency: "DOP",
        name: "Cuenta de Ahorros",
        isActive: true,
        createdAt: "2023-03-20",
        lastTransactionDate: "2024-01-08",
      },
      {
        id: "3",
        accountNumber: "1122334455",
        accountType: "credit",
        balance: -850000,
        currency: "DOP",
        name: "Tarjeta de Crédito",
        isActive: true,
        createdAt: "2023-06-10",
        lastTransactionDate: "2024-01-09",
      },
    ]),
    transfer: jest.fn().mockResolvedValue({
      success: true,
      message: "Transferencia realizada exitosamente",
    }),
  },
}));

// Mock de alert
const mockAlert = jest.fn();
global.alert = mockAlert;

// Wrapper con todos los providers necesarios
const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <AccountsProvider>{component}</AccountsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

describe("Transfer Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("shows loading state initially", () => {
    renderWithProviders(<Transfer />);
    expect(screen.getByText("Cargando cuentas...")).toBeInTheDocument();
  });

  test("renders transfer form after loading", async () => {
    renderWithProviders(<Transfer />);

    await waitFor(() => {
      expect(screen.getByText("Nueva Transferencia")).toBeInTheDocument();
    });

    expect(screen.getByText("Cuenta Origen")).toBeInTheDocument();
    expect(screen.getByText("Cuenta Destino")).toBeInTheDocument();
    expect(screen.getByText("Monto a Transferir")).toBeInTheDocument();
    expect(screen.getByText("Fecha de Aplicación")).toBeInTheDocument();
    expect(screen.getByText("Descripción")).toBeInTheDocument();
  });

  test("shows back button and navigation", async () => {
    renderWithProviders(<Transfer />);

    await waitFor(() => {
      expect(screen.getByText("← Volver")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("← Volver"));
    expect(mockNavigate).toHaveBeenCalledWith("/accounts");
  });

  test("populates account dropdowns correctly", async () => {
    renderWithProviders(<Transfer />);

    await waitFor(() => {
      expect(screen.getByText("Cuenta Origen")).toBeInTheDocument();
    });

    // Solo cuentas no-crédito deben aparecer en origen
    const fromAccountSelect = screen.getByLabelText("Cuenta Origen");
    expect(fromAccountSelect).toBeInTheDocument();
  });

  test("validates required fields", async () => {
    renderWithProviders(<Transfer />);

    await waitFor(() => {
      expect(screen.getByText("Transferir")).toBeInTheDocument();
    });

    // Intentar enviar formulario vacío
    fireEvent.click(screen.getByText("Transferir"));

    await waitFor(() => {
      expect(
        screen.getByText("Selecciona una cuenta origen")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Selecciona una cuenta destino")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Ingresa un monto válido mayor a 0")
      ).toBeInTheDocument();
      expect(screen.getByText("Ingresa una descripción")).toBeInTheDocument();
    });
  });

  test("shows available balance when from account is selected", async () => {
    renderWithProviders(<Transfer />);

    await waitFor(() => {
      expect(screen.getByText("Cuenta Origen")).toBeInTheDocument();
    });

    // Seleccionar cuenta origen
    const fromAccountSelect = screen.getByLabelText("Cuenta Origen");
    fireEvent.change(fromAccountSelect, { target: { value: "1" } });

    await waitFor(() => {
      expect(screen.getByText("Saldo disponible:")).toBeInTheDocument();
    });
  });

  test("disables destination account dropdown until origin is selected", async () => {
    renderWithProviders(<Transfer />);

    await waitFor(() => {
      expect(screen.getByLabelText("Cuenta Destino")).toBeDisabled();
    });
  });

  test("validates insufficient funds", async () => {
    renderWithProviders(<Transfer />);

    await waitFor(() => {
      expect(screen.getByText("Cuenta Origen")).toBeInTheDocument();
    });

    // Seleccionar cuenta origen
    const fromAccountSelect = screen.getByLabelText("Cuenta Origen");
    fireEvent.change(fromAccountSelect, { target: { value: "1" } });

    // Ingresar monto mayor al saldo
    const amountInput = screen.getByPlaceholderText("0.00");
    fireEvent.change(amountInput, { target: { value: "3000000" } });

    // Llenar otros campos requeridos
    const toAccountSelect = screen.getByLabelText("Cuenta Destino");
    fireEvent.change(toAccountSelect, { target: { value: "2" } });

    const descriptionInput = screen.getByPlaceholderText(
      "Describe el motivo de la transferencia..."
    );
    fireEvent.change(descriptionInput, { target: { value: "Test transfer" } });

    // Intentar enviar
    fireEvent.click(screen.getByText("Transferir"));

    await waitFor(() => {
      expect(screen.getByText(/Saldo insuficiente/)).toBeInTheDocument();
    });
  });

  test("shows transfer summary when all fields are filled", async () => {
    renderWithProviders(<Transfer />);

    await waitFor(() => {
      expect(screen.getByText("Cuenta Origen")).toBeInTheDocument();
    });

    // Llenar formulario
    const fromAccountSelect = screen.getByLabelText("Cuenta Origen");
    fireEvent.change(fromAccountSelect, { target: { value: "1" } });

    const toAccountSelect = screen.getByLabelText("Cuenta Destino");
    fireEvent.change(toAccountSelect, { target: { value: "2" } });

    const amountInput = screen.getByPlaceholderText("0.00");
    fireEvent.change(amountInput, { target: { value: "100000" } });

    await waitFor(() => {
      expect(
        screen.getByText("Resumen de la Transferencia")
      ).toBeInTheDocument();
    });
  });

  test("clears form when clear button is clicked", async () => {
    renderWithProviders(<Transfer />);

    await waitFor(() => {
      expect(screen.getByText("Cuenta Origen")).toBeInTheDocument();
    });

    // Llenar algunos campos
    const fromAccountSelect = screen.getByLabelText("Cuenta Origen");
    fireEvent.change(fromAccountSelect, { target: { value: "1" } });

    const amountInput = screen.getByPlaceholderText("0.00");
    fireEvent.change(amountInput, { target: { value: "100000" } });

    // Limpiar formulario
    fireEvent.click(screen.getByText("Limpiar"));

    expect(fromAccountSelect).toHaveValue("");
    expect(amountInput).toHaveValue("");
  });

  test("navigates to accounts on cancel", async () => {
    renderWithProviders(<Transfer />);

    await waitFor(() => {
      expect(screen.getByText("Cancelar")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Cancelar"));
    expect(mockNavigate).toHaveBeenCalledWith("/accounts");
  });
});
