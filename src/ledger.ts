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


export type TransferRecord = {
  from: string;
  to: string;
  amount: number;
  timestamp: number;
};

/**
 * The only way to move value. Validates, moves, and appends to the history in
 * one step, so every successful transfer is recorded by construction. Throws on
 * a rejected transfer, so the append is never reached and a blocked overdraft
 * leaves no record.
 */
export function transfer(
  records: TransferRecord[],
  from: Account,
  to: Account,
  amount: number,
  timestamp: number = Date.now(),
): { from: Account; to: Account; records: TransferRecord[] } {
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
  return {
    from: { ...from, balance: from.balance - amount },
    to: { ...to, balance: to.balance + amount },
    records: [...records, { from: from.id, to: to.id, amount, timestamp }],
  };
}

/** Every record this account either sent or received, oldest first. */
export function history(records: TransferRecord[], accountId: string): TransferRecord[] {
  return records.filter((r) => r.from === accountId || r.to === accountId);
}
