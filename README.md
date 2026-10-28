# Customer Orders Dashboard

## Introduction

A single-page Next.js App Router dashboard backed by SQLite. It reads the supplied customer and order seed data and keeps customers without orders visible.

## Run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Data behavior

- `data/seed.sql` is copied from the provided seed file.
- SQLite is initialized automatically at `data/customers.db` on first request.
- The customer table uses a `LEFT JOIN`, so customers without orders display `ยังไม่มีออร์เดอร์`.
- Each order is rendered as its own row.

## Reference

| Column | Source |
| --- | --- |
| ชื่อลูกค้า | `customers.name` |
| เมือง | `customers.city` |
| เลขออร์เดอร์ | `orders.id` |
| ยอดเงิน | `orders.amount` |
| สถานะ | `orders.status` |
