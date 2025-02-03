"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Users, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/LanguageContext"

export default function Register() {
  const { language } = useLanguage()

  const content = {
    en: {
      title: "Join Our Community",
      description: "Connect with like-minded founders and accelerate your startup journey",
      cardTitle: "Exclusive WhatsApp Community",
      cardDescription: "Our WhatsApp community is exclusively available to LinkUp members. Here's what you'll get:",
      benefits: [
        "Direct access to experienced founders",
        "Real-time support and guidance",
        "Exclusive networking opportunities",
        "Early access to events and resources",
        "Collaborative problem-solving environment",
      ],
      note: "To join our thriving WhatsApp community, you'll need to be a LinkUp member. Apply now to get started!",
      cta: "Apply to Join",
      backHome: "Back to Home",
    },
    es: {
      title: "Únete a Nuestra Comunidad",
      description: "Conéctate con fundadores afines y acelera el crecimiento de tu startup",
      cardTitle: "Comunidad Exclusiva de WhatsApp",
      cardDescription:
        "Nuestra comunidad de WhatsApp está disponible exclusivamente para miembros de LinkUp. Esto es lo que obtendrás:",
      benefits: [
        "Acceso directo a fundadores con experiencia",
        "Soporte y orientación en tiempo real",
        "Oportunidades exclusivas de networking",
        "Acceso anticipado a eventos y recursos",
        "Entorno colaborativo para resolver problemas",
      ],
      note: "Para unirte a nuestra próspera comunidad de WhatsApp, necesitas ser miembro de LinkUp. ¡Aplica ahora para comenzar!",
      cta: "Aplicar para Unirte",
      backHome: "Volver al Inicio",
    },
  }

  const t = content[language]

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary-50 to-white pt-20">
      <div className="container max-w-4xl py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary-900 mb-4">{t.title}</h1>
          <p className="text-xl text-gray-600">{t.description}</p>
        </div>

        <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="text-center pb-6">
            <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-8 h-8 text-secondary-500" />
            </div>
            <CardTitle className="text-2xl font-bold text-primary-900 mb-2">{t.cardTitle}</CardTitle>
            <CardDescription className="text-gray-600">{t.cardDescription}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <ul className="space-y-4">
                {t.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-secondary-500 rounded-full mr-3"></div>
                    {benefit}
                  </li>
                ))}
              </ul>

              <div className="border-t border-gray-200 pt-6 mt-6">
                <p className="text-gray-600 mb-8 text-center">{t.note}</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    asChild
                    className="bg-secondary-500 hover:bg-secondary-600 text-white px-8 py-6 rounded-xl
                      shadow-[0_4px_14px_0_rgb(0,118,255,0.39)] hover:shadow-[0_6px_20px_rgba(0,118,255,0.23)]"
                  >
                    <Link href="/apply" className="flex items-center">
                      {t.cta}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="rounded-xl border-2 border-gray-200 hover:border-secondary-500 hover:bg-secondary-50"
                  >
         
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

