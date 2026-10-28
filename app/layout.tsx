import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ลูกค้าและออร์เดอร์',
  description: 'ตารางสรุปลูกค้าและออร์เดอร์จากฐานข้อมูล SQLite',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  )
}
