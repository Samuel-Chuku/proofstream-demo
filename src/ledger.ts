export type Entry = { id: string; amount: number; memo?: string };

export function total(entries: Entry[]): number {
  return entries.reduce((sum, e) => sum + e.amount, 0);
}

export function isValid(e: Entry): boolean {
  return e.amount > 0 && e.id.length > 0;
}

export type Account = { id: string; balance: number };

export function balanceOf(account: Account): number {
  return account.balance;
}

export function accountBalance(account: Account): number {
  return balanceOf(account);
}
