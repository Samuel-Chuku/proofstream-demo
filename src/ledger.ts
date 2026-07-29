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

export function canCover(account: Account, amount: number): boolean {
  return account.balance >= amount;
}

export function transfer(from: Account, to: Account, amount: number): [Account, Account] {
  if (!Number.isFinite(amount) || amount <= 0) {
    throw new Error(`transfer amount must be a positive number, got ${amount}`);
  }
  if (from.id === to.id) {
    throw new Error(`cannot transfer from ${from.id} to itself`);
  }
  if (!canCover(from, amount)) {
    throw new Error(
      `overdraft blocked: ${from.id} holds ${from.balance} but ${amount} was requested`,
    );
  }
  return [
    { ...from, balance: from.balance - amount },
    { ...to, balance: to.balance + amount },
  ];
}

export type TransferRecord = {
  from: string;
  to: string;
  amount: number;
  at: number;
};

/** Append a completed transfer to the log. Never mutates the existing log. */
export function recordTransfer(
  records: TransferRecord[],
  from: Account,
  to: Account,
  amount: number,
  at: number = Date.now(),
): TransferRecord[] {
  return [...records, { from: from.id, to: to.id, amount, at }];
}

/** Every record this account either sent or received, oldest first. */
export function history(records: TransferRecord[], accountId: string): TransferRecord[] {
  return records.filter((r) => r.from === accountId || r.to === accountId);
}
