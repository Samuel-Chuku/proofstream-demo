import assert from 'node:assert/strict';
import { test } from 'node:test';
import { history, transfer, type Account, type TransferRecord } from './ledger';

const alice = (): Account => ({ id: 'alice', balance: 100 });
const bob = (): Account => ({ id: 'bob', balance: 10 });

test('a successful transfer moves balances and is recorded', () => {
  const r = transfer([], alice(), bob(), 40, 1_700_000_000);

  assert.equal(r.from.balance, 60);
  assert.equal(r.to.balance, 50);
  assert.deepEqual(r.records, [
    { from: 'alice', to: 'bob', amount: 40, timestamp: 1_700_000_000 },
  ]);
});

test('a blocked overdraft throws and records nothing', () => {
  const records: TransferRecord[] = [];
  assert.throws(() => transfer(records, bob(), alice(), 999), /overdraft blocked/);
  assert.equal(records.length, 0);
});

test('history returns only the records touching an account', () => {
  const records: TransferRecord[] = [
    { from: 'alice', to: 'bob', amount: 5, timestamp: 1 },
    { from: 'carol', to: 'dave', amount: 7, timestamp: 2 },
  ];
  assert.deepEqual(history(records, 'bob').map((r) => r.timestamp), [1]);
});
