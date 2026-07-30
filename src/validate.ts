import type { Account } from './ledger';

export function assertValidAmount(amount: number): void {
  if (!Number.isFinite(amount)) throw new Error('amount must be a finite number');
  if (amount <= 0) throw new Error('amount must be positive');
  if (Math.round(amount * 100) !== amount * 100) {
    throw new Error('amount must not have sub-cent precision');
  }
}

export function assertValidAccount(account: Account): void {
  if (!account.id || account.id.trim().length === 0) {
    throw new Error('account id must not be empty');
  }
  if (!Number.isFinite(account.balance)) {
    throw new Error('account balance must be a finite number');
  }
}
