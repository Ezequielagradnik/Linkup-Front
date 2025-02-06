"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Home, ArrowLeft } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

export default function NotFound() {
  const { language } = useLanguage()

  const content = {
    en: {
      title: "Page Not Found",
      description: "Oops! Looks like you're lost. The page you're looking for doesn't exist or has been moved.",
      homeButton: "Back to Home",
      backButton: "Previous Page",
    },
    es: {
      title: "Página No Encontrada",
      description: "¡Oops! Parece que te has perdido. La página que estás buscando no existe o ha sido movida.",
      homeButton: "Volver al Inicio",
      backButton: "Página Anterior",
    },
  }

  const t = content[language]

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      </div>

      <div className="text-center max-w-xl mx-auto">
        {/* Animated 404 */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-8xl font-bold text-primary-900 mb-2">404</h1>
          <div className="h-2 w-24 mx-auto bg-secondary-500 rounded-full"></div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-bold text-primary-900">{t.title}</h2>
          <p className="text-lg text-gray-600 max-w-md mx-auto">{t.description}</p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button
              asChild
              className="bg-secondary-500 hover:bg-secondary-600 text-white px-6 py-6 rounded-xl
                shadow-[0_4px_14px_0_rgb(0,118,255,0.39)] hover:shadow-[0_6px_20px_rgba(0,118,255,0.23)]
                transition-all duration-300"
            >
              <Link href="/" className="flex items-center">
                <Home className="mr-2 h-5 w-5" />
                {t.homeButton}
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="px-6 py-6 rounded-xl border-2 border-gray-200 hover:border-secondary-500 hover:bg-secondary-50"
            >
              <Link href="javascript:history.back()" className="flex items-center">
                <ArrowLeft className="mr-2 h-5 w-5" />
                {t.backButton}
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10">
        <div className="h-[310px] w-[310px] rounded-full bg-secondary-500/20 blur-[100px]"></div>
      </div>
    </div>
  )
}

