"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Users, Rocket, Target } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/LanguageContext"

export default function About() {
  const { language } = useLanguage()

  const content = {
    en: {
      title: "About LinkUp",
      subtitle: "Empowering the next generation of tech entrepreneurs",
      mission: {
        title: "Our Mission",
        description:
          "To provide comprehensive resources, expert guidance, and a supportive community to help startups thrive in today's competitive tech landscape.",
      },
      vision: {
        title: "Our Vision",
        description:
          "A world where every innovative tech idea has the opportunity to become a successful business, driving progress and positive change.",
      },
      approach: {
        title: "Our Approach",
        description:
          "Combining cutting-edge technology, industry expertise, and personalized mentorship to accelerate startup growth and success.",
      },
      team: {
        title: "Meet Our Team",
        members: [
          { name: "Nicolas Said", role: "CEO & Founder" },
          { name: "Benjamin Kaputiansky", role: "CTO & Founder" },
        ],
      },
      cta: {
        title: "Ready to Start Your Journey?",
        description: "Join LinkUp today and take the first step towards startup success.",
        button: "Apply Now",
      },
    },
    es: {
      title: "Acerca de LinkUp",
      subtitle: "Empoderando a la próxima generación de emprendedores tecnológicos",
      mission: {
        title: "Nuestra Misión",
        description:
          "Proporcionar recursos integrales, orientación experta y una comunidad de apoyo para ayudar a las startups a prosperar en el competitivo panorama tecnológico actual.",
      },
      vision: {
        title: "Nuestra Visión",
        description:
          "Un mundo donde cada idea tecnológica innovadora tenga la oportunidad de convertirse en un negocio exitoso, impulsando el progreso y el cambio positivo.",
      },
      approach: {
        title: "Nuestro Enfoque",
        description:
          "Combinar tecnología de vanguardia, experiencia en la industria y mentoría personalizada para acelerar el crecimiento y el éxito de las startups.",
      },
      team: {
        title: "Conoce a Nuestro Equipo",
        members: [
          { name: "Nicolas Said", role: "CEO y Fundador" },
          { name: "Benjamin Kaputiansky", role: "CTO y Fundador" },
        ],
      },
      cta: {
        title: "¿Listo para Comenzar tu Viaje?",
        description: "Únete a LinkUp hoy y da el primer paso hacia el éxito de tu startup.",
        button: "Aplicar Ahora",
      },
    },
  }

  const t = content[language]

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="container py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-primary-900 mb-4">{t.title}</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{t.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="bg-secondary-50 border-secondary-200">
            <CardHeader>
              <Users className="w-12 h-12 text-secondary-600 mb-4" />
              <CardTitle className="text-2xl text-primary-900">{t.mission.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600">{t.mission.description}</CardContent>
          </Card>
          <Card className="bg-secondary-50 border-secondary-200">
            <CardHeader>
              <Rocket className="w-12 h-12 text-secondary-600 mb-4" />
              <CardTitle className="text-2xl text-primary-900">{t.vision.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600">{t.vision.description}</CardContent>
          </Card>
          <Card className="bg-secondary-50 border-secondary-200">
            <CardHeader>
              <Target className="w-12 h-12 text-secondary-600 mb-4" />
              <CardTitle className="text-2xl text-primary-900">{t.approach.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600">{t.approach.description}</CardContent>
          </Card>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-primary-900 mb-8 text-center">{t.team.title}</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {t.team.members.map((member, index) => (
              <div key={index} className="text-center">
                <img
                  src="/placeholder.svg?height=200&width=200"
                  alt={member.name}
                  className="w-48 h-48 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold text-primary-900">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-20 relative">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10">
            <div className="h-[310px] w-[310px] rounded-full bg-secondary-500/20 blur-[100px]"></div>
          </div>
          <h2 className="text-3xl font-bold text-primary-900 mb-4">{t.cta.title}</h2>
          <p className="text-xl text-gray-600 mb-8">{t.cta.description}</p>
          <Button
            asChild
            className="group relative overflow-hidden rounded-xl bg-secondary-500 px-8 py-3 text-white transition-all duration-300 hover:bg-secondary-600 shadow-[0_4px_14px_0_rgb(0,118,255,0.39)] hover:shadow-[0_6px_20px_rgba(0,118,255,0.23)]"
          >
            <Link href="/apply" className="flex items-center">
              {t.cta.button}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

