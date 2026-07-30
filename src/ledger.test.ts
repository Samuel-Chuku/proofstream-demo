import assert from 'node:assert/strict';
import { test } from 'node:test';
import { balanceOf, type Account } from './ledger';

const alice = (): Account => ({ id: 'alice', balance: 100 });

test('balanceOf reports the account balance', () => {
  assert.equal(balanceOf(alice()), 100);
});
