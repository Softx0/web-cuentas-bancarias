import { Account, Transaction, TransferRequest } from "../types/banking.types";

class BankingService {
  private readonly ACCOUNTS_KEY = "banking_accounts";
  private readonly TRANSACTIONS_KEY = "banking_transactions";

  // Simular delay de red
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Mock data inicial
  private getInitialAccounts(): Account[] {
    return [
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
    ];
  }

  private getInitialTransactions(): Transaction[] {
    const transactions: Transaction[] = [];
    const accounts = this.getInitialAccounts();

    // Generar transacciones para cada cuenta
    accounts.forEach((account) => {
      for (let i = 0; i < 20; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);

        const transactionType = Math.random() > 0.6 ? "credit" : "debit";
        const description =
          transactionType === "credit"
            ? this.getCreditDescription()
            : this.getDebitDescription();
        const category =
          transactionType === "credit"
            ? this.getCreditCategory()
            : this.getDebitCategory();

        transactions.push({
          id: `${account.id}-${i}`,
          accountId: account.id,
          type: transactionType,
          amount: Math.floor(Math.random() * 500000) + 10000,
          description: description,
          date: date.toISOString().split("T")[0],
          balance: account.balance,
          reference: `REF${Date.now()}${i}`,
          category: category,
        });
      }
    });

    return transactions.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }

  private getDebitDescription(): string {
    const debitDescriptions = [
      "Compra en supermercado",
      "Pago de servicios",
      "Retiro cajero automático",
      "Transferencia enviada",
      "Pago tarjeta crédito",
      "Compra online",
      "Pago de préstamo",
      "Compra en farmacia",
      "Pago de combustible",
      "Compra en restaurante",
    ];
    return debitDescriptions[
      Math.floor(Math.random() * debitDescriptions.length)
    ];
  }

  private getCreditDescription(): string {
    const creditDescriptions = [
      "Transferencia recibida",
      "Depósito en efectivo",
      "Salario mensual",
      "Pago de nómina",
      "Devolución de compra",
      "Intereses ganados",
      "Bono recibido",
      "Reembolso de seguro",
      "Dividendos recibidos",
      "Depósito por transferencia",
    ];
    return creditDescriptions[
      Math.floor(Math.random() * creditDescriptions.length)
    ];
  }

  private getDebitCategory(): string {
    const debitCategories = [
      "Alimentación",
      "Transporte",
      "Servicios",
      "Entretenimiento",
      "Transferencias",
      "Pagos",
      "Compras",
      "Combustible",
    ];
    return debitCategories[Math.floor(Math.random() * debitCategories.length)];
  }

  private getCreditCategory(): string {
    const creditCategories = [
      "Salario",
      "Transferencias",
      "Depósitos",
      "Reembolsos",
      "Intereses",
      "Bonos",
      "Ingresos",
      "Otros",
    ];
    return creditCategories[
      Math.floor(Math.random() * creditCategories.length)
    ];
  }

  // Endpoints simulados
  async getAccounts(): Promise<Account[]> {
    await this.delay(800);

    let accounts = JSON.parse(
      localStorage.getItem(this.ACCOUNTS_KEY) || "null"
    );

    if (!accounts) {
      accounts = this.getInitialAccounts();
      localStorage.setItem(this.ACCOUNTS_KEY, JSON.stringify(accounts));
    }

    return accounts;
  }

  async getAccountById(accountId: string): Promise<Account | null> {
    await this.delay(500);

    const accounts = await this.getAccounts();
    return accounts.find((acc) => acc.id === accountId) || null;
  }

  async getTransactions(accountId: string): Promise<Transaction[]> {
    await this.delay(600);

    let transactions = JSON.parse(
      localStorage.getItem(this.TRANSACTIONS_KEY) || "null"
    );

    if (!transactions) {
      transactions = this.getInitialTransactions();
      localStorage.setItem(this.TRANSACTIONS_KEY, JSON.stringify(transactions));
    }

    return transactions.filter((tx: Transaction) => tx.accountId === accountId);
  }

  async transfer(
    transferData: TransferRequest
  ): Promise<{ success: boolean; message: string }> {
    await this.delay(1200);

    try {
      const accounts = await this.getAccounts();
      const transactions = JSON.parse(
        localStorage.getItem(this.TRANSACTIONS_KEY) || "[]"
      );

      const fromAccount = accounts.find(
        (acc) => acc.id === transferData.fromAccountId
      );
      const toAccount = accounts.find(
        (acc) => acc.id === transferData.toAccountId
      );

      if (!fromAccount || !toAccount) {
        throw new Error("Cuenta no encontrada");
      }

      if (fromAccount.balance < transferData.amount) {
        throw new Error("Saldo insuficiente");
      }

      // Actualizar balances
      fromAccount.balance -= transferData.amount;
      toAccount.balance += transferData.amount;

      // Crear transacciones
      const now = new Date().toISOString().split("T")[0];
      const reference = `TRF${Date.now()}`;

      transactions.push(
        {
          id: `${Date.now()}-debit`,
          accountId: fromAccount.id,
          type: "debit" as const,
          amount: transferData.amount,
          description: `Transferencia a ${toAccount.name}`,
          date: now,
          balance: fromAccount.balance,
          reference,
          category: "Transferencias",
        },
        {
          id: `${Date.now()}-credit`,
          accountId: toAccount.id,
          type: "credit" as const,
          amount: transferData.amount,
          description: `Transferencia desde ${fromAccount.name}`,
          date: now,
          balance: toAccount.balance,
          reference,
          category: "Transferencias",
        }
      );

      // Guardar cambios
      localStorage.setItem(this.ACCOUNTS_KEY, JSON.stringify(accounts));
      localStorage.setItem(this.TRANSACTIONS_KEY, JSON.stringify(transactions));

      return {
        success: true,
        message: "Transferencia realizada exitosamente",
      };
    } catch (error) {
      return {
        success: false,
        message:
          error instanceof Error ? error.message : "Error en la transferencia",
      };
    }
  }
}

export const bankingService = new BankingService();
