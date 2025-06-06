import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Wake on LAN',
  description: 'Aplicativo Wake on LAN com autenticação',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`bg-blue-500 ${inter.className}`}>
        <div className="flex h-screen">
          {children}
        </div>
      </body>
    </html>
  )
}
