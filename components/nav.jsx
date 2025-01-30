"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { LanguageToggle } from "@/components/LanguageToggle"
import { useLanguage } from "@/contexts/LanguageContext"
import { useAuth } from "@/contexts/AuthContext"

export function Nav() {
  const [isOpen, setIsOpen] = useState(false)
  const { language } = useLanguage()
  const { user, logout } = useAuth()

  const menuItems = [
    { name: language === "en" ? "Home" : "Inicio", path: "/" },
    { name: language === "en" ? "Blog & Podcast" : "Blog y Podcast", path: "/blog-podcast" },
    { name: language === "en" ? "About" : "Acerca de", path: "/about" },
    { name: language === "en" ? "Pricing" : "Precios", path: "/pricing" },
    { name: language === "en" ? "Contact" : "Contacto", path: "/contact" },
    ...(user?.isAdmin ? [{ name: language === "en" ? "Admin" : "Administrador", path: "/admin/dashboard" }] : []),
  ]

  const MobileMenuItem = ({ href, children }) => (
    <Link
      href={href}
      onClick={() => setIsOpen(false)}
      className="text-lg font-medium text-primary-900 hover:text-secondary-600 transition-colors py-3"
    >
      {children}
    </Link>
  )

  return (
    <nav className="fixed top-0 w-full bg-white border-b border-gray-100 z-50 shadow-sm">
      <div className="container flex items-center justify-between h-16">
        {/* Logo and Language Toggle */}
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Imagen%20de%20WhatsApp%202025-01-26%20a%20las%2015.19.42_e01988de.jpg-cpajLuZWHffaR1AfdCOjwttm1CwJLm.jpeg"
              alt="LinkUp Logo"
              className="h-8 w-8 rounded-full"
            />
            <span className="font-bold text-xl text-primary-900">LinkUp</span>
          </Link>
          <LanguageToggle />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className="text-sm font-medium text-primary-900 hover:text-secondary-600 transition-all duration-300 relative after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-secondary-600 after:transition-all hover:after:w-full"
            >
              {item.name}
            </Link>
          ))}
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-primary-900">Welcome, {user.username}</span>
              <Button onClick={logout} variant="ghost" className="hover:bg-secondary-50 rounded-full">
                {language === "en" ? "Logout" : "Cerrar sesión"}
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="text-sm font-medium text-primary-900 hover:text-secondary-600 transition-all duration-300"
              >
                {language === "en" ? "Login" : "Iniciar sesión"}
              </Link>
              <Button asChild className="bg-blue-600 text-white hover:bg-blue-700 rounded-full">
                <Link href="/apply">{language === "en" ? "Apply Now" : "Aplicar Ahora"}</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden hover:bg-secondary-50 rounded-full">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px] bg-white p-0">
            <div className="flex flex-col h-full">
              <div className="p-4 border-b">
                <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center space-x-2">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Imagen%20de%20WhatsApp%202025-01-26%20a%20las%2015.19.42_e01988de.jpg-cpajLuZWHffaR1AfdCOjwttm1CwJLm.jpeg"
                    alt="LinkUp Logo"
                    className="h-8 w-8 rounded-full"
                  />
                  <span className="font-bold text-xl text-primary-900">LinkUp</span>
                </Link>
                <div className="mt-4">
                  <LanguageToggle />
                </div>
              </div>
              <div className="flex-1 overflow-auto">
                <div className="flex flex-col px-4 py-6 space-y-4">
                  {menuItems.map((item) => (
                    <MobileMenuItem key={item.path} href={item.path}>
                      {item.name}
                    </MobileMenuItem>
                  ))}
                  {user ? (
                    <>
                      <span className="text-sm font-medium text-primary-900">Welcome, {user.username}</span>
                      <Button
                        onClick={() => {
                          logout()
                          setIsOpen(false)
                        }}
                        variant="ghost"
                        className="rounded-full"
                      >
                        {language === "en" ? "Logout" : "Cerrar sesión"}
                      </Button>
                    </>
                  ) : (
                    <>
                      <MobileMenuItem href="/login">{language === "en" ? "Login" : "Iniciar sesión"}</MobileMenuItem>
                      <Button
                        asChild
                        className="bg-blue-600 hover:bg-blue-700 text-white rounded-full"
                        onClick={() => setIsOpen(false)}
                      >
                        <Link href="/apply">{language === "en" ? "Apply Now" : "Aplicar Ahora"}</Link>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}

