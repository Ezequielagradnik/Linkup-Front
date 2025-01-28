import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export function Pricing({ language }) {
  const content = {
    en: {
      title: "Plans designed for your success",
      description: "Choose the plan that best fits your needs and start your journey to success",
      plans: [
        {
          name: "Basic Plan",
          price: "349",
          description: "Perfect for starting your journey as a founder",
          features: [
            "Startup School",
            "AI Mentor 24/7",
            "Founders Community",
            "Downloadable Resources",
            "Access to Monthly Webinars",
          ],
        },
        {
          name: "Intermediate Plan",
          price: "499",
          description: "The most popular plan for committed founders",
          features: [
            "Everything in Basic Plan",
            "Access to Vefy",
            "Demo Day Events",
            "Exposure to Investors and Key People",
            "Potential Prospects",
          ],
        },
        {
          name: "Pro Plan",
          price: "999",
          description: "Maximum support for growing startups",
          features: [
            "Everything in Intermediate Plan",
            "Lifetime Access to LinkUp Courses and Content",
            "VIP WhatsApp Community",
            "Weekly Calls with Investors",
            "Monthly Personalized Mentoring",
          ],
        },
      ],
      cta: "Start Now",
    },
    es: {
      title: "Planes diseñados para tu éxito",
      description: "Elige el plan que mejor se adapte a tus necesidades y comienza tu journey hacia el éxito",
      plans: [
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
      ],
      cta: "Comenzar Ahora",
    },
  }

  const t = content[language]

  return (
    <section className="py-24">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-primary-900 mb-4">{t.title}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t.description}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {t.plans.map((plan, index) => (
            <Card
              key={index}
              className="group bg-white rounded-xl transition-all duration-300 hover:shadow-lg border border-gray-200"
            >
              <CardHeader>
                <CardTitle>
                  <div className="text-2xl font-bold text-primary-900 mb-2">{plan.name}</div>
                  <div className="flex items-baseline mb-2">
                    <span className="text-4xl font-bold text-primary-900">${plan.price}</span>
                    <span className="text-gray-600 ml-2">/mes</span>
                  </div>
                  <p className="text-sm text-gray-600">{plan.description}</p>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <Check className="h-5 w-5 text-secondary-500 mr-2" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  className="w-full bg-secondary-500 text-white hover:bg-secondary-600 transition-all duration-300 
                    rounded-xl py-6 shadow-[0_4px_14px_0_rgb(0,118,255,0.39)] hover:shadow-[0_6px_20px_rgba(0,118,255,0.23)]
                    hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Link href="/apply">
                    <span className="text-lg font-medium">{t.cta}</span>
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

