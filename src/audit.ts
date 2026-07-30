export type AuditRecord = {
  at: string;
  action: 'transfer' | 'credit' | 'debit';
  accountId: string;
  before: number;
  after: number;
  correlationId?: string;
};

export type AuditSink = (record: AuditRecord) => void;

export function consoleSink(record: AuditRecord): void {
  console.log(JSON.stringify(record));
}

/** Records a balance change. Returns the record so callers can assert on it. */
export function auditBalanceChange(
  sink: AuditSink,
  action: AuditRecord['action'],
  accountId: string,
  before: number,
  after: number,
  correlationId?: string,
): AuditRecord {
  const record: AuditRecord = {
    at: new Date().toISOString(),
    action,
    accountId,
    before,
    after,
    correlationId,
  };
  sink(record);
  return record;
}
