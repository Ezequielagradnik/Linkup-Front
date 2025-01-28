import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Hero({ language }) {
  const content = {
    en: {
      title: "Transform Your Startup Journey with LinkUp",
      description:
        "Join the ultimate platform for startups. Get expert guidance, connect with mentors, and access the resources you need to succeed.",
      cta1: "Start Your Journey",
      cta2: "Explore Programs",
      stats: [
        { number: "500+", label: "Startups Graduated" },
        { number: "24/7", label: "Mentor Support" },
        { number: "50+", label: "Expert Instructors" },
        { number: "90%", label: "Success Rate" },
      ],
    },
    es: {
      title: "Transforma tu Viaje de Startup con LinkUp",
      description:
        "Únete a la plataforma definitiva para startups. Obtén orientación experta, conéctate con mentores y accede a los recursos que necesitas para tener éxito.",
      cta1: "Comienza tu Viaje",
      cta2: "Explora Programas",
      stats: [
        { number: "500+", label: "Startups Graduadas" },
        { number: "24/7", label: "Soporte de Mentores" },
        { number: "50+", label: "Instructores Expertos" },
        { number: "90%", label: "Tasa de Éxito" },
      ],
    },
  }

  const t = content[language]

  return (
    <div className="relative min-h-screen flex items-center bg-white overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-secondary-500/20 blur-[100px]"></div>
      </div>

      <div className="container relative pt-20 pb-16 text-center">
        <div className="relative mx-auto max-w-3xl">
          <div className="absolute -top-4 -z-10 left-1/2 -translate-x-1/2 transform">
            <div className="h-[310px] w-[310px] rounded-full bg-secondary-500/20 blur-[100px]"></div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-primary-900 mb-6">{t.title}</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">{t.description}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mx-auto max-w-md">
            <Button
              asChild
              size="lg"
              className="group relative w-full sm:w-auto px-8 py-3 overflow-hidden rounded-xl bg-secondary-500 text-white transition-all duration-300 hover:bg-secondary-600 hover:shadow-[0_6px_20px_rgba(0,118,255,0.23)]"
            >
              <Link href="/apply">{t.cta1}</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="group relative w-full sm:w-auto overflow-hidden rounded-xl border-2 border-secondary-500 px-8 py-3 text-secondary-600 transition-all duration-300 hover:text-white"
            >
              <Link href="/pricing">
                <span className="relative z-10">{t.cta2}</span>
                <div className="absolute inset-0 z-0 bg-secondary-500 opacity-0 transition-all duration-300 group-hover:opacity-100"></div>
              </Link>
            </Button>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {t.stats.map((stat) => (
            <div
              key={stat.label}
              className="group relative overflow-hidden rounded-xl bg-white p-6 transition-all duration-300 hover:shadow-lg border border-gray-200"
            >
              <div className="absolute inset-0 bg-secondary-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              <div className="relative">
                <div className="text-3xl font-bold text-secondary-600 mb-2">{stat.number}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

