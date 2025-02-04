"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"
import Link from "next/link"

export function Pricing({ language }) {
  const content = {
    en: {
      title: "Plans designed for your success",
      description: "Choose the plan that best fits your needs and start your journey to success",
      plans: [
        {
          name: "Starter Plan (Basic)",
          price: "499",
          description: "Perfect for starting your journey as a founder",
          features: [
            "Startup School",
            "24/7 AI Mentor with personalized responses.",
            "Access to the private community of founders",
            "Exclusive resources: templates, tools and practical guides",
            "Interactive Guide prepared for your startup, (from idea to functional startup)",  
            "The selected startups will gain access to the benefits of the Pro Plan"
    ],
        },
        {
          name: "Pro Plan",
          price: "849",
          description: "Maximum support for growing startups",
          features: [
            "Everything in Starter Plan",
            "Lifetime Access to LinkUp Courses and Content",
            "Access to the PRO Community: High-level networking with advanced founders",
            "Access to Vefy.Site: Platform to connect with investors",
            "Premium resources: Templates, courses, tools and exclusive content to boost your startup",
            "Access to Events and Webinars",
          ],
        },
      ],
      cta: "Start Now",
      enterprise: {
        title: "Need a customized plan?",
        description: "Contact us to create a plan that perfectly fits your startup's specific needs.",
        button: "Contact Sales Team",
      },
    },
    es: {
      title: "Planes diseñados para tu éxito",
      description: "Elige el plan que mejor se adapte a tus necesidades y alcanza el éxito con nosotros",
      plans: [
        {
          name: "Plan Starter (Básico)",
          price: "499",
          description: "Perfecto para iniciar tu desarrollo empresarial",
          features: [
            "Escuela de Startups",
            "Mentor IA 24/7 con respuestas personalizadas",
            "Acceso a la comunidad privada de founders",
            "Recursos exclusivos: plantillas, herramientas y guías prácticas",
            "Guia Interactiva preparada para tu startup, (desde idea hasta startup funcional)",
            "Las startups seleccionadas tendrán acceso a los beneficios del Plan Pro",
          ],
        },
        {
          name: "Plan Pro",
          price: "849",
          description: "Máximo apoyo para startups en crecimiento",
          features: [
            "Todo lo del plan Basico, más:",
            "Acceso a LinkUp de por vida",
            "Acceso a la Comunidad PRO: Networking de alto nivel con founders avanzados",
            "Acceso a Vefy.Site: Plataforma para conectar con inversores",
            "Recursos premium: Plantillas, herramientas, cursos y contenido exclusivo para potenciar tu startup",
            "Acceso a Eventos y Webinars",
          ],
        },
      ],
      cta: "Comenzar Ahora",
      enterprise: {
        title: "¿Necesitas un plan personalizado?",
        description:
          "Contáctanos para crear un plan que se ajuste perfectamente a las necesidades específicas de tu startup.",
        button: "Contactar al equipo de ventas",
      },
    },
  }

  const t = content[language]

  const handleEnterpriseClick = () => {
    const message = encodeURIComponent(
      language === "en"
        ? "Hello, I would like to inquire about the Enterprise Plan for my startup. Could you provide more information about customized solutions?"
        : "Hola, me gustaría consultar sobre el Plan Enterprise para mi startup. ¿Podrían brindarme más información sobre soluciones personalizadas?",
    )
    window.open(`https://wa.me/5491131954757?text=${message}`, "_blank")
  }

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-primary-900 mb-4">{t.title}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t.description}</p>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
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

        {/* Enterprise Section with new design */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="border-t border-gray-200 pt-16">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-primary-900 mb-4">{t.enterprise.title}</h2>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">{t.enterprise.description}</p>
              <Button
                onClick={handleEnterpriseClick}
                className="bg-secondary-500 hover:bg-secondary-600 text-white transition-all duration-300 
                  px-8 py-3 text-lg rounded-xl shadow-[0_4px_14px_0_rgb(0,118,255,0.39)] hover:shadow-[0_6px_20px_rgba(0,118,255,0.23)]"
              >
                {t.enterprise.button}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

