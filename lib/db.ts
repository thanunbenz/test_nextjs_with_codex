import Database from 'better-sqlite3'
import fs from 'node:fs'
import path from 'node:path'

export type CustomerOrderRow = {
  customerId: number
  customerName: string
  city: string
  orderId: number | null
  amount: number | null
  status: string | null
  createdAt: string | null
}

const databasePath = path.join(process.cwd(), 'data', 'customers.db')
const seedPath = path.join(process.cwd(), 'data', 'seed.sql')

function getDatabase() {
  const database = new Database(databasePath)
  database.pragma('journal_mode = WAL')

  const hasCustomers = database
    .prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name = 'customers'")
    .get()

  if (!hasCustomers) {
    database.exec(fs.readFileSync(seedPath, 'utf8'))
  }

  return database
}

export function getCustomerOrders() {
  const database = getDatabase()
  try {
    return database
      .prepare(`
        SELECT
          c.id AS customerId,
          c.name AS customerName,
          c.city,
          o.id AS orderId,
          o.amount,
          o.status,
          o.created_at AS createdAt
        FROM customers c
        LEFT JOIN orders o ON o.customer_id = c.id
        ORDER BY c.id ASC, o.created_at ASC, o.id ASC
      `)
      .all() as CustomerOrderRow[]
  } finally {
    database.close()
  }
}
