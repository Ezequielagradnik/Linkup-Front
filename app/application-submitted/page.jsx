"use client"

import { useLanguage } from "@/contexts/LanguageContext"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ApplicationSubmitted() {
  const { language } = useLanguage()

  const content = {
    en: {
      title: "Application Submitted",
      message: "Thank you for applying to LinkUp! We have received your application and will review it shortly.",
      nextSteps: "Next steps:",
      steps: [
        "Our team will review your application within 48 hours.",
        "You will receive an email with further instructions.",
        "If selected, we will schedule a call to discuss your startup in more detail.",
      ],
      backToHome: "Back to Home",
    },
    es: {
      title: "Solicitud Enviada",
      message: "¡Gracias por aplicar a LinkUp! Hemos recibido tu solicitud y la revisaremos en breve.",
      nextSteps: "Próximos pasos:",
      steps: [
        "Nuestro equipo revisará tu solicitud en las próximas 48 horas.",
        "Recibirás un correo electrónico con instrucciones adicionales.",
        "Si eres seleccionado, programaremos una llamada para discutir tu startup en más detalle.",
      ],
      backToHome: "Volver al Inicio",
    },
  }

  const t = content[language]

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary-50 to-white flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">{t.title}</h2>
          <p className="mt-2 text-sm text-gray-600">{t.message}</p>
        </div>
        <div className="mt-8 space-y-6">
          <div className="rounded-md bg-white shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">{t.nextSteps}</h3>
            <ul className="space-y-4 text-sm text-gray-600">
              {t.steps.map((step, index) => (
                <li key={index} className="flex items-start">
                  <span className="flex-shrink-0 h-6 w-6 rounded-full bg-secondary-100 text-secondary-800 flex items-center justify-center mr-2">
                    {index + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ul>
          </div>
          <Button asChild className="w-full">
            <Link href="/">{t.backToHome}</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

