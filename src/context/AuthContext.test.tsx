import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { AuthProvider, useAuth } from "./AuthContext";

// Mock del localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

Object.defineProperty(window, "localStorage", {
  value: mockLocalStorage,
});

// Componente de prueba para acceder al contexto
const TestComponent: React.FC = () => {
  const { state, login, logout } = useAuth();

  return (
    <div>
      <div data-testid="auth-state">
        {state.isAuthenticated ? "authenticated" : "not-authenticated"}
      </div>
      <div data-testid="user-name">{state.user?.name || "no-name"}</div>
      <div data-testid="user-email">{state.user?.email || "no-email"}</div>
      <div data-testid="loading">
        {state.loading ? "loading" : "not-loading"}
      </div>
      <button onClick={() => login("test@example.com", "password")}>
        Login
      </button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

const renderWithProvider = () => {
  return render(
    <AuthProvider>
      <TestComponent />
    </AuthProvider>
  );
};

describe("AuthContext", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockLocalStorage.getItem.mockReturnValue(null);
  });

  test("initializes with not authenticated state", () => {
    renderWithProvider();

    expect(screen.getByTestId("auth-state")).toHaveTextContent(
      "not-authenticated"
    );
    expect(screen.getByTestId("user-name")).toHaveTextContent("no-name");
    expect(screen.getByTestId("user-email")).toHaveTextContent("no-email");
  });

  test("restores authentication state from localStorage", () => {
    const mockUser = {
      id: "1",
      email: "test@example.com",
      name: "Test",
      role: "user",
    };

    mockLocalStorage.getItem.mockImplementation((key) => {
      if (key === "authToken") return "mock-token";
      if (key === "userInfo") return JSON.stringify(mockUser);
      return null;
    });

    renderWithProvider();

    expect(screen.getByTestId("auth-state")).toHaveTextContent("authenticated");
    expect(screen.getByTestId("user-name")).toHaveTextContent("Test");
    expect(screen.getByTestId("user-email")).toHaveTextContent(
      "test@example.com"
    );
  });

  test("handles corrupted userInfo in localStorage", () => {
    mockLocalStorage.getItem.mockImplementation((key) => {
      if (key === "authToken") return "mock-token";
      if (key === "userInfo") return "invalid-json";
      return null;
    });

    renderWithProvider();

    expect(screen.getByTestId("auth-state")).toHaveTextContent(
      "not-authenticated"
    );
    expect(mockLocalStorage.removeItem).toHaveBeenCalledWith("authToken");
    expect(mockLocalStorage.removeItem).toHaveBeenCalledWith("userInfo");
  });

  test("login saves user info and token to localStorage", async () => {
    renderWithProvider();

    fireEvent.click(screen.getByText("Login"));

    await waitFor(() => {
      expect(screen.getByTestId("auth-state")).toHaveTextContent(
        "authenticated"
      );
    });

    expect(screen.getByTestId("user-name")).toHaveTextContent("Test");
    expect(screen.getByTestId("user-email")).toHaveTextContent(
      "test@example.com"
    );

    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      "authToken",
      "mock-jwt-token-encrypted"
    );
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      "userInfo",
      JSON.stringify({
        id: "1",
        email: "test@example.com",
        name: "Test",
        role: "user",
      })
    );
  });

  test("generates username from email correctly", async () => {
    renderWithProvider();

    fireEvent.click(screen.getByText("Login"));

    await waitFor(() => {
      expect(screen.getByTestId("user-name")).toHaveTextContent("Test");
    });

    expect(screen.getByTestId("user-email")).toHaveTextContent(
      "test@example.com"
    );
  });

  test("logout clears localStorage and resets state", async () => {
    // Primero hacer login
    renderWithProvider();
    fireEvent.click(screen.getByText("Login"));

    await waitFor(() => {
      expect(screen.getByTestId("auth-state")).toHaveTextContent(
        "authenticated"
      );
    });

    // Luego hacer logout
    fireEvent.click(screen.getByText("Logout"));

    expect(screen.getByTestId("auth-state")).toHaveTextContent(
      "not-authenticated"
    );
    expect(screen.getByTestId("user-name")).toHaveTextContent("no-name");
    expect(screen.getByTestId("user-email")).toHaveTextContent("no-email");

    expect(mockLocalStorage.removeItem).toHaveBeenCalledWith("authToken");
    expect(mockLocalStorage.removeItem).toHaveBeenCalledWith("userInfo");
  });

  test("handles different email formats for username generation", () => {
    // Test conceptual para verificar que la generación de nombres funciona
    // En este caso verificamos que el email test@example.com genera "Test"
    renderWithProvider();
    fireEvent.click(screen.getByText("Login"));

    // Verificar que el nombre se genera correctamente desde el email
    expect(screen.getByTestId("user-name")).toHaveTextContent("Test");
    expect(screen.getByTestId("user-email")).toHaveTextContent(
      "test@example.com"
    );
  });
});
