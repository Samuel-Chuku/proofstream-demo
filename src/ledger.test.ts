import assert from 'node:assert/strict';
import { test } from 'node:test';
import { applyTransfer, history, type Account, type TransferRecord } from './ledger';

const alice = (): Account => ({ id: 'alice', balance: 100 });
const bob = (): Account => ({ id: 'bob', balance: 10 });

test('a successful transfer moves balances and is recorded', () => {
  const result = applyTransfer([], alice(), bob(), 40, 1_700_000_000);

  assert.equal(result.from.balance, 60);
  assert.equal(result.to.balance, 50);
  assert.deepEqual(result.records, [
    { from: 'alice', to: 'bob', amount: 40, timestamp: 1_700_000_000 },
  ]);
});

test('a blocked overdraft throws and records nothing', () => {
  const records: TransferRecord[] = [];

  assert.throws(() => applyTransfer(records, bob(), alice(), 999), /overdraft blocked/);
  assert.equal(records.length, 0);
});

test('the log is append-only and never mutated in place', () => {
  const first = applyTransfer([], alice(), bob(), 10, 1);
  const second = applyTransfer(first.records, alice(), bob(), 20, 2);

  assert.equal(first.records.length, 1);
  assert.equal(second.records.length, 2);
});

test('history returns only the records touching an account', () => {
  const records: TransferRecord[] = [
    { from: 'alice', to: 'bob', amount: 5, timestamp: 1 },
    { from: 'carol', to: 'dave', amount: 7, timestamp: 2 },
    { from: 'bob', to: 'carol', amount: 3, timestamp: 3 },
  ];

  assert.deepEqual(
    history(records, 'bob').map((r) => r.timestamp),
    [1, 3],
  );
  assert.deepEqual(history(records, 'nobody'), []);
});
