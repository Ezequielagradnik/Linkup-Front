"use client"

import { useLanguage } from "@/contexts/LanguageContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, MessageCircle, Rocket } from "lucide-react"

export default function Community() {
  const { language } = useLanguage()

  const features = [
    {
      icon: Users,
      title: language === "en" ? "Network Growth" : "Crecimiento de Red",
      description: language === "en" ? "Connect with like-minded entrepreneurs" : "Conéctate con emprendedores afines",
    },
    {
      icon: MessageCircle,
      title: language === "en" ? "Expert Support" : "Soporte Experto",
      description:
        language === "en" ? "Get advice from experienced mentors" : "Obtén consejos de mentores experimentados",
    },
    {
      icon: Rocket,
      title: language === "en" ? "Growth Resources" : "Recursos de Crecimiento",
      description:
        language === "en" ? "Access exclusive startup resources" : "Accede a recursos exclusivos para startups",
    },
  ]

  const stats = [
    {
      number: "500+",
      label: language === "en" ? "Active Members" : "Miembros Activos",
    },
    {
      number: "50+",
      label: language === "en" ? "Success Stories" : "Casos de Éxito",
    },
    {
      number: "24/7",
      label: language === "en" ? "Community Support" : "Soporte Comunitario",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-blue-500/[0.025] -z-10" />
        <div className="container mx-auto px-4 pt-24 pb-8 text-center relative">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
            {language === "en" ? "Welcome to LinkUp Community" : "Bienvenido a la Comunidad LinkUp"}
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            {language === "en"
              ? "Join a thriving ecosystem of entrepreneurs, innovators, and changemakers."
              : "Únete a un ecosistema próspero de emprendedores, innovadores y agentes de cambio."}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="p-6 rounded-2xl bg-white shadow-lg">
                <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
                <feature.icon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Community Card */}
        <div className="flex justify-center">
          <Card className="flex flex-col max-w-md w-full bg-gradient-to-br from-white to-blue-50 border-2 border-blue-100">
            <CardHeader className="space-y-4">
              <div className="flex justify-center">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LINKUP-removebg-preview-H4uudgwmEMqvfk5xeTIBJIgVNGQTC1.png"
                  alt="LinkUp Logo"
                  className="w-32 h-32 md:w-40 md:h-40 object-contain"
                />
              </div>
              <CardTitle className="text-center text-2xl">🔥 LinkUp Community 🚀</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription className="mb-6 text-center text-lg">
                {language === "en"
                  ? "Join our exclusive community of entrepreneurs and innovators. Get access to resources, mentorship, and networking opportunities."
                  : "Únete a nuestra exclusiva comunidad de emprendedores e innovadores. Obtén acceso a recursos, mentoría y oportunidades de networking."}
              </CardDescription>
              <Button
                asChild
                className="w-full rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-all text-lg py-6"
              >
                <a href="https://chat.whatsapp.com/EnCAyI9GmzH0veB89u66PO " target="_blank" rel="noopener noreferrer">
                  {language === "en" ? "Join Now" : "Unirse Ahora"}
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Testimonial */}
        <div className="max-w-2xl mx-auto mt-16 text-center">
          <blockquote className="text-xl italic text-gray-600 mb-4">
            {language === "en"
              ? '"LinkUp Community has been instrumental in helping me grow my startup. The support and resources are invaluable."'
              : '"La Comunidad LinkUp ha sido fundamental para ayudarme a hacer crecer mi startup. El apoyo y los recursos son invaluables."'}
          </blockquote>
          <p className="font-semibold">{language === "en" ? "- Nicolas Said" : "- Nicolas Said"}</p>
        </div>
      </div>
    </div>
  )
}

