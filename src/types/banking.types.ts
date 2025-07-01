export interface Account {
  id: string;
  accountNumber: string;
  accountType: "checking" | "savings" | "credit";
  balance: number;
  currency: "DOP" | "USD" | "EUR";
  name: string;
  isActive: boolean;
  createdAt: string;
  lastTransactionDate: string;
}

export interface Transaction {
  id: string;
  accountId: string;
  type: "debit" | "credit";
  amount: number;
  description: string;
  date: string;
  balance: number;
  reference: string;
  category: string;
}

export interface TransferRequest {
  fromAccountId: string;
  toAccountId: string;
  amount: number;
  description: string;
  reference?: string;
}

export interface FilterOptions {
  dateFrom: string;
  dateTo: string;
  transactionType: "all" | "debit" | "credit";
}

export interface AccountsState {
  accounts: Account[];
  selectedAccount: Account | null;
  transactions: Transaction[];
  filteredTransactions: Transaction[];
  filters: FilterOptions;
  loading: boolean;
  error: string | null;
}
