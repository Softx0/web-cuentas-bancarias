import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useCallback,
} from "react";
import {
  AccountsState,
  Account,
  Transaction,
  FilterOptions,
  TransferRequest,
} from "../types/banking.types";
import { bankingService } from "../services/bankingService";

type AccountsAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_ACCOUNTS"; payload: Account[] }
  | { type: "SET_SELECTED_ACCOUNT"; payload: Account | null }
  | { type: "SET_TRANSACTIONS"; payload: Transaction[] }
  | { type: "SET_FILTERED_TRANSACTIONS"; payload: Transaction[] }
  | { type: "SET_FILTERS"; payload: FilterOptions };

interface AccountsContextValue {
  state: AccountsState;
  loadAccounts: () => Promise<void>;
  selectAccount: (accountId: string) => Promise<void>;
  loadTransactions: (accountId: string) => Promise<void>;
  applyFilters: (filters: FilterOptions) => void;
  transferMoney: (
    transferData: TransferRequest
  ) => Promise<{ success: boolean; message: string }>;
}

const initialState: AccountsState = {
  accounts: [],
  selectedAccount: null,
  transactions: [],
  filteredTransactions: [],
  filters: {
    dateFrom: "",
    dateTo: "",
    transactionType: "all",
  },
  loading: false,
  error: null,
};

const accountsReducer = (
  state: AccountsState,
  action: AccountsAction
): AccountsState => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };
    case "SET_ACCOUNTS":
      return { ...state, accounts: action.payload, loading: false };
    case "SET_SELECTED_ACCOUNT":
      return { ...state, selectedAccount: action.payload };
    case "SET_TRANSACTIONS":
      return {
        ...state,
        transactions: action.payload,
        filteredTransactions: action.payload,
        loading: false,
      };
    case "SET_FILTERED_TRANSACTIONS":
      return { ...state, filteredTransactions: action.payload };
    case "SET_FILTERS":
      return { ...state, filters: action.payload };
    default:
      return state;
  }
};

const AccountsContext = createContext<AccountsContextValue | undefined>(
  undefined
);

export const AccountsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(accountsReducer, initialState);

  const loadAccounts = useCallback(async (): Promise<void> => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const accounts = await bankingService.getAccounts();
      dispatch({ type: "SET_ACCOUNTS", payload: accounts });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "Error al cargar las cuentas" });
    }
  }, []);

  const loadTransactions = useCallback(
    async (accountId: string): Promise<void> => {
      try {
        dispatch({ type: "SET_LOADING", payload: true });
        const transactions = await bankingService.getTransactions(accountId);
        dispatch({ type: "SET_TRANSACTIONS", payload: transactions });
      } catch (error) {
        dispatch({
          type: "SET_ERROR",
          payload: "Error al cargar las transacciones",
        });
      }
    },
    []
  );

  const selectAccount = useCallback(
    async (accountId: string): Promise<void> => {
      try {
        dispatch({ type: "SET_LOADING", payload: true });
        const account = await bankingService.getAccountById(accountId);
        dispatch({ type: "SET_SELECTED_ACCOUNT", payload: account });

        if (account) {
          await loadTransactions(accountId);
        }
      } catch (error) {
        dispatch({
          type: "SET_ERROR",
          payload: "Error al seleccionar la cuenta",
        });
      }
    },
    [loadTransactions]
  );

  const applyFilters = useCallback(
    (filters: FilterOptions): void => {
      dispatch({ type: "SET_FILTERS", payload: filters });

      let filteredTransactions = [...state.transactions];

      // Filtro por fecha
      if (filters.dateFrom) {
        filteredTransactions = filteredTransactions.filter(
          (transaction) =>
            new Date(transaction.date) >= new Date(filters.dateFrom)
        );
      }

      if (filters.dateTo) {
        filteredTransactions = filteredTransactions.filter(
          (transaction) =>
            new Date(transaction.date) <= new Date(filters.dateTo)
        );
      }

      // Filtro por tipo de transacción
      if (filters.transactionType !== "all") {
        filteredTransactions = filteredTransactions.filter(
          (transaction) => transaction.type === filters.transactionType
        );
      }

      dispatch({
        type: "SET_FILTERED_TRANSACTIONS",
        payload: filteredTransactions,
      });
    },
    [state.transactions]
  );

  const transferMoney = useCallback(
    async (
      transferData: TransferRequest
    ): Promise<{ success: boolean; message: string }> => {
      try {
        dispatch({ type: "SET_LOADING", payload: true });
        const result = await bankingService.transfer(transferData);

        if (result.success) {
          // Recargar las cuentas para mostrar los saldos actualizados
          await loadAccounts();

          // Si hay una cuenta seleccionada, recargar sus transacciones
          if (state.selectedAccount) {
            await loadTransactions(state.selectedAccount.id);
          }
        }

        dispatch({ type: "SET_LOADING", payload: false });
        return result;
      } catch (error) {
        dispatch({
          type: "SET_ERROR",
          payload: "Error al realizar la transferencia",
        });
        return {
          success: false,
          message: "Error al realizar la transferencia",
        };
      }
    },
    [loadAccounts, loadTransactions, state.selectedAccount]
  );

  return (
    <AccountsContext.Provider
      value={{
        state,
        loadAccounts,
        selectAccount,
        loadTransactions,
        applyFilters,
        transferMoney,
      }}
    >
      {children}
    </AccountsContext.Provider>
  );
};

export const useAccounts = (): AccountsContextValue => {
  const context = useContext(AccountsContext);
  if (!context) {
    throw new Error("useAccounts must be used within an AccountsProvider");
  }
  return context;
};
