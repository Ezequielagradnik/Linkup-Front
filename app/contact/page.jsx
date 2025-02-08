"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Mail, Phone, Calendar } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

export default function Contact() {
  const { language } = useLanguage()

  const content = {
    en: {
      title: "Contact Us",
      email: {
        title: "Get in Touch",
        description:
          "Have questions or need more information about how LinkUp can accelerate your startup journey or connect you with the right investors? We're here to help!",
        button: "Email Us",
      },
      whatsapp: {
        title: "WhatsApp Support",
        description:
          "Do you have any questions or want to know more? Write to us on WhatsApp and discover how LinkUp can transform your startup. We're here to help you!",
        button: "WhatsApp Us",
      },
      meeting: {
        title: "Schedule a Meeting",
        description:
          "Want to have a meeting and be part of the project or get information on how to proceed as a StartUp, investor, etc.? Schedule a meeting with us and get your questions answered.",
        button: "Book a Call",
      },
    },
    es: {
      title: "Contáctanos",
      email: {
        title: "Ponte en Contacto",
        description:
          "¿Tienes preguntas o necesitas más información sobre cómo LinkUp puede acelerar el viaje de tu startup o conectarte con los inversores adecuados? ¡Estamos aquí para ayudarte!",
        button: "Envíanos un Email",
      },
      whatsapp: {
        title: "Soporte por WhatsApp",
        description:
          "¿Tienes alguna pregunta o quieres saber más? Escríbenos por WhatsApp y descubre cómo LinkUp puede transformar tu startup. ¡Estamos aquí para ayudarte!",
        button: "Escríbenos por WhatsApp",
      },
      meeting: {
        title: "Agenda una Reunión",
        description:
          "¿Quieres tener una reunión y ser parte del proyecto o informarte para ver cómo proseguir como StartUp, inversor, etc.? Agenda una reunión con nosotros y resuelve tus dudas.",
        button: "Reserva una Llamada",
      },
    },
  }

  const t = content[language]

  return (
    <div className="min-h-screen bg-gray-50 pt-20 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <h1 className="text-4xl font-bold text-primary-900 mb-8 text-center">{t.title}</h1>
        <div className="max-w-3xl mx-auto space-y-12">
          <section className="bg-white p-8 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl">
            <h2 className="text-2xl font-semibold text-primary-800 mb-4 flex items-center">
              <Mail className="mr-2 text-secondary-500" />
              {t.email.title}
            </h2>
            <p className="text-gray-600 mb-6">{t.email.description}</p>
            <Button
              asChild
              className="bg-secondary-500 hover:bg-secondary-600 transition-all duration-300 transform hover:scale-105"
            >
              <Link href="mailto:linkup.startups@gmail.com">{t.email.button}</Link>
            </Button>
          </section>

          <section className="bg-white p-8 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl">
            <h2 className="text-2xl font-semibold text-primary-800 mb-4 flex items-center">
              <Phone className="mr-2 text-secondary-500" />
              {t.whatsapp.title}
            </h2>
            <p className="text-gray-600 mb-6">{t.whatsapp.description}</p>
            <Button
              asChild
              className="bg-secondary-500 hover:bg-secondary-600 transition-all duration-300 transform hover:scale-105"
            >
              <Link href="https://wa.me/5491131954757">{t.whatsapp.button}</Link>
            </Button>
          </section>

          <section className="bg-white p-8 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl">
            <h2 className="text-2xl font-semibold text-primary-800 mb-4 flex items-center">
              <Calendar className="mr-2 text-secondary-500" />
              {t.meeting.title}
            </h2>
            <p className="text-gray-600 mb-6">{t.meeting.description}</p>
            <Button
              asChild
              className="bg-secondary-500 hover:bg-secondary-600 transition-all duration-300 transform hover:scale-105"
            >
              <Link href="https://calendly.com/benjokapu/30min?month=2025-02">{t.meeting.button}</Link>
            </Button>
          </section>
        </div>
      </div>
    </div>
  )
}

