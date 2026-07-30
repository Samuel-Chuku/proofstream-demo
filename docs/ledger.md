# Ledger

The ledger tracks accounts and transfers between them.

## Functions

- `transfer(from, to, amount)` — moves value, throws on overdraft
- `applyTransfer(records, from, to, amount)` — transfer plus history append
- `history(records, accountId)` — records touching an account
