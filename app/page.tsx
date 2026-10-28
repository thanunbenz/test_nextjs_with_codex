import { getCustomerOrders } from '../lib/db'

const currency = new Intl.NumberFormat('th-TH', {
  style: 'currency',
  currency: 'THB',
  maximumFractionDigits: 0,
})

export default function Home() {
  const rows = getCustomerOrders()
  const customers = new Set(rows.map((row) => row.customerId)).size
  const orderCount = rows.filter((row) => row.orderId !== null).length
  const totalAmount = rows.reduce((total, row) => total + (row.amount ?? 0), 0)

  return (
    <main className="page-shell">
      <section className="hero">
        <div className="eyebrow"><span className="eyebrow-dot" /> CUSTOMER OVERVIEW</div>
        <div className="hero-row">
          <div>
            <h1>ลูกค้าและออร์เดอร์</h1>
            <p>ข้อมูลล่าสุดจากฐานข้อมูล SQLite ของคุณ</p>
          </div>
          <div className="hero-mark" aria-hidden="true">◎</div>
        </div>
      </section>

      <section className="stats-grid" aria-label="สรุปข้อมูล">
        <div className="stat-card"><span className="stat-label">ลูกค้าทั้งหมด</span><strong>{customers}</strong><span className="stat-note">ราย</span></div>
        <div className="stat-card"><span className="stat-label">ออร์เดอร์ทั้งหมด</span><strong>{orderCount}</strong><span className="stat-note">รายการ</span></div>
        <div className="stat-card stat-card-accent"><span className="stat-label">ยอดเงินรวม</span><strong>{currency.format(totalAmount)}</strong><span className="stat-note">จากทุกออร์เดอร์</span></div>
      </section>

      <section className="table-card">
        <div className="table-heading">
          <div><h2>รายการลูกค้า</h2><p>แสดงลูกค้าทุกราย รวมถึงผู้ที่ยังไม่มีออร์เดอร์</p></div>
          <span className="row-count">{rows.length} แถว</span>
        </div>
        <div className="table-scroll">
          <table>
            <thead><tr><th>ชื่อลูกค้า</th><th>เมือง</th><th>เลขออร์เดอร์</th><th>ยอดเงิน</th><th>สถานะ</th></tr></thead>
            <tbody>
              {rows.map((row) => (
                <tr key={`${row.customerId}-${row.orderId ?? 'none'}`}>
                  <td><span className="customer-name">{row.customerName}</span></td>
                  <td className="muted">{row.city}</td>
                  <td>{row.orderId === null ? <span className="empty-order">ยังไม่มีออร์เดอร์</span> : <span className="order-id">#{row.orderId}</span>}</td>
                  <td className="amount">{row.amount === null ? '—' : currency.format(row.amount)}</td>
                  <td>{row.status === null ? <span className="status empty-status">—</span> : <span className={`status status-${row.status}`}>{row.status}</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <footer>อัปเดตจาก seed.sql · SQLite</footer>
    </main>
  )
}
