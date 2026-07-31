import assert from 'node:assert/strict';
import { test } from 'node:test';
import { balanceOf, type Account } from './ledger';

test('balanceOf reports the balance', () => {
  const a: Account = { id: 'alice', balance: 10 };
  assert.equal(balanceOf(a), 10);
});
