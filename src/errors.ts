export class LedgerError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'LedgerError';
  }
}

export class OverdraftError extends LedgerError {
  constructor(
    readonly accountId: string,
    readonly balance: number,
    readonly requested: number,
  ) {
    super(`overdraft blocked: ${accountId} holds ${balance} but ${requested} was requested`);
    this.name = 'OverdraftError';
  }
}

export class InvalidAmountError extends LedgerError {
  constructor(readonly amount: unknown) {
    super(`transfer amount must be a positive number, got ${String(amount)}`);
    this.name = 'InvalidAmountError';
  }
}

export class SelfTransferError extends LedgerError {
  constructor(readonly accountId: string) {
    super(`cannot transfer from ${accountId} to itself`);
    this.name = 'SelfTransferError';
  }
}
