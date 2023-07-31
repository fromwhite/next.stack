import './globals.css'
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: 'serverless function',
  description: 'multiple serverless function on vercel',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
      {children}
      <Analytics />
      </body>
    </html>
  )
}
