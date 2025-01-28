import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { LanguageProvider } from "@/contexts/LanguageContext"
import { AuthProvider } from "@/contexts/AuthContext"
import "@/styles/globals.css"
import { NewBlogNotification } from "@/components/NewBlogNotification"

export const metadata = {
  title: "LinkUp",
  description: "Transform Your Startup Journey with LinkUp",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="min-h-screen bg-white antialiased flex flex-col">
        <AuthProvider>
          <LanguageProvider>
            <Nav />
            <main className="flex-grow">{children}</main>
            <NewBlogNotification />
            <Footer />
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

