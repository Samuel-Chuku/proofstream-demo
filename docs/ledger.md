# Ledger

`transfer(from, to, amount)` moves value between accounts.

It must reject a transfer that would overdraw the sending account, and must
reject non-positive amounts.
