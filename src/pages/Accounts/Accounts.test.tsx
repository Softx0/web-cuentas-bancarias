import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../../context/AuthContext";
import { AccountsProvider } from "../../context/AccountsContext";
import Accounts from "./Accounts";

const mockNavigate = jest.fn();
const mockLogout = jest.fn();

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
  },
}));

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

describe("Accounts Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("shows loading state initially", () => {
    renderWithProviders(<Accounts />);
    expect(screen.getByText("Cargando cuentas...")).toBeInTheDocument();
  });

  test("renders accounts page with header", async () => {
    renderWithProviders(<Accounts />);

    await waitFor(() => {
      expect(screen.getByText("Mis Cuentas")).toBeInTheDocument();
    });

    expect(screen.getByText(/Hola,/)).toBeInTheDocument();
    expect(screen.getByText("Transferir")).toBeInTheDocument();
    expect(screen.getByText("Cerrar Sesión")).toBeInTheDocument();
  });

  test("renders accounts summary section", async () => {
    renderWithProviders(<Accounts />);

    await waitFor(() => {
      expect(screen.getByText("Resumen de Cuentas")).toBeInTheDocument();
    });

    expect(screen.getByText("Total en Cuentas")).toBeInTheDocument();
    expect(screen.getByText("Número de Cuentas")).toBeInTheDocument();
    expect(screen.getByText("Deuda en Tarjetas")).toBeInTheDocument();
  });

  test("renders list of accounts", async () => {
    renderWithProviders(<Accounts />);

    await waitFor(() => {
      expect(screen.getByText("Todas las Cuentas")).toBeInTheDocument();
    });

    expect(screen.getByText("Cuenta Corriente Principal")).toBeInTheDocument();
    expect(screen.getByText("Cuenta de Ahorros")).toBeInTheDocument();
    expect(screen.getByText("Tarjeta de Crédito")).toBeInTheDocument();
  });

  test("calculates total balance correctly", async () => {
    renderWithProviders(<Accounts />);

    await waitFor(() => {
      // El total debería ser 2,500,000 + 5,750,000 = 8,250,000 (excluyendo crédito)
      expect(screen.getByText(/8[.,]250[.,]000/)).toBeInTheDocument();
    });
  });

  test("shows correct number of active accounts", async () => {
    renderWithProviders(<Accounts />);

    await waitFor(() => {
      expect(screen.getByText("3")).toBeInTheDocument(); // 3 cuentas activas
    });
  });

  test("calculates credit debt correctly", async () => {
    renderWithProviders(<Accounts />);

    await waitFor(() => {
      // La deuda debería ser 850,000 (valor absoluto del balance negativo)
      expect(screen.getByText(/850[.,]000/)).toBeInTheDocument();
    });
  });

  test("navigates to account detail when account card is clicked", async () => {
    renderWithProviders(<Accounts />);

    await waitFor(() => {
      expect(
        screen.getByText("Cuenta Corriente Principal")
      ).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Cuenta Corriente Principal"));
    expect(mockNavigate).toHaveBeenCalledWith("/account/1");
  });

  test("navigates to transfer page when transfer button is clicked", async () => {
    renderWithProviders(<Accounts />);

    await waitFor(() => {
      expect(screen.getByText("Transferir")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Transferir"));
    expect(mockNavigate).toHaveBeenCalledWith("/transfer");
  });

  test("navigates to transfer page when new transfer button is clicked", async () => {
    renderWithProviders(<Accounts />);

    await waitFor(() => {
      expect(screen.getByText("Nueva Transferencia")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Nueva Transferencia"));
    expect(mockNavigate).toHaveBeenCalledWith("/transfer");
  });
});
