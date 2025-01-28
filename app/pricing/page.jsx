import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function PricingPage() {
  const plans = [
    {
      name: "Plan Básico",
      price: "349",
      description: "Perfecto para empezar tu journey como founder",
      features: [
        "Escuela de Startups",
        "Mentor IA 24/7",
        "Comunidad Founders",
        "Recursos descargables",
        "Acceso a webinars mensuales",
      ],
    },
    {
      name: "Plan Intermedio",
      price: "499",
      description: "El plan más popular para founders comprometidos",
      features: [
        "Todo lo del plan Básico",
        "Acceso a Vefy",
        "Eventos Demo Days",
        "Exposición a Inversores y Gente Clave",
        "Potenciales Prospecciones",
      ],
    },
    {
      name: "Plan Pro",
      price: "999",
      description: "Máximo apoyo para startups en crecimiento",
      features: [
        "Todo lo del plan Intermedio",
        "Acceso a cursos y contenido de LinkUp de por vida",
        "Comunidad VIP en WhatsApp",
        "Calls semanales con inversores",
        "Mentoría personalizada mensual",
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-primary-900 mb-4">Planes diseñados para tu éxito</h1>
          <p className="text-lg text-primary-700 max-w-2xl mx-auto">
            Elige el plan que mejor se adapte a tus necesidades y comienza tu journey hacia el éxito
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <Card key={index} className="bg-white">
              <CardHeader>
                <CardTitle>
                  <div className="text-2xl font-bold text-primary-800 mb-2">{plan.name}</div>
                  <div className="flex items-baseline mb-2">
                    <span className="text-4xl font-bold text-primary-900">${plan.price}</span>
                    <span className="text-primary-600 ml-2">/mes</span>
                  </div>
                  <p className="text-sm text-primary-600">{plan.description}</p>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <Check className="h-5 w-5 text-secondary-500 mr-2" />
                      <span className="text-sm text-primary-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  className="w-full bg-secondary-500 hover:bg-secondary-600 text-white transition-all duration-300 
                    rounded-xl py-6 shadow-[0_4px_14px_0_rgb(0,118,255,0.39)] hover:shadow-[0_6px_20px_rgba(0,118,255,0.23)]
                    hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Link href="/apply">
                    <span className="text-lg font-medium">Comenzar Ahora</span>
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-primary-900 mb-4">¿Necesitas un plan personalizado?</h2>
          <p className="text-primary-700 mb-6">
            Contáctanos para crear un plan que se ajuste perfectamente a las necesidades específicas de tu startup.
          </p>
          <Button
            asChild
            className="bg-secondary-500 hover:bg-secondary-600 text-white transition-all duration-300 
              rounded-xl py-3 px-6 shadow-[0_4px_14px_0_rgb(0,118,255,0.39)] hover:shadow-[0_6px_20px_rgba(0,118,255,0.23)]"
          >
            <Link href="/contact">Contactar al equipo de ventas</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

