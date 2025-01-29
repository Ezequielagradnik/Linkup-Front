"use client"

import { useLanguage } from "@/contexts/LanguageContext"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Partnership() {
  const { language } = useLanguage()

  const content = {
    en: {
      title: "Powered by Vefy",
      description: "Upon graduation, connect with investors through Vefy's technology platform",
      subtitle: "Strategic Partnership",
      features: [
        "Direct access to Vefy's investor network",
        "Seamless startup-investor matching",
        "Enhanced visibility in the investment community",
      ],
      cta: "Learn More",
    },
    es: {
      title: "Impulsado por Vefy",
      description: "Al graduarte, conecta con inversores a través de la plataforma tecnológica de Vefy",
      subtitle: "Alianza Estratégica",
      features: [
        "Acceso directo a la red de inversores de Vefy",
        "Conexión perfecta entre startup e inversor",
        "Mayor visibilidad en la comunidad inversora",
      ],
      cta: "Saber Más",
    },
  }

  const t = content[language]

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-4 py-2 bg-secondary-100 rounded-full mb-6">
            <span className="text-secondary-600 text-sm font-medium">{t.subtitle}</span>
          </div>
          <div className="flex justify-center mb-8">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/c4f5be_fb9253bba51e4053bef711741927a802~mv2-a4yLiYQjBmAzSJQ1Kn3BJCsbinapfN.png"
              alt="Vefy Logo"
              className="h-12 object-contain"
            />
          </div>
          <h2 className="text-4xl font-bold text-primary-900 mb-4">{t.title}</h2>
          <p className="text-xl text-gray-600 mb-8">{t.description}</p>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {t.features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <p className="text-gray-700">{feature}</p>
              </div>
            ))}
          </div>
          <Button
            asChild
            className="bg-secondary-500 hover:bg-secondary-600 text-white px-8 py-6 text-lg rounded-xl
              shadow-[0_4px_14px_0_rgb(0,118,255,0.39)] hover:shadow-[0_6px_20px_rgba(0,118,255,0.23)]"
          >
            <Link href="/about">{t.cta}</Link>
          </Button>
        </div>
      </div>
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      </div>
    </section>
  )
}

