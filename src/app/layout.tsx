import "./globals.css"
import Providers from "./providers"

export const metadata = {
  title: "Next.js Todos",
  description: "Todo app with TanStack Query",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
