"use client"

import { useState } from "react"
import { useLanguage } from "@/contexts/LanguageContext"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ChevronRight, Headphones, BookOpen } from "lucide-react"

export default function BlogAndPodcast() {
  const { language } = useLanguage()
  const [activeTab, setActiveTab] = useState("blog")
  const [expandedPost, setExpandedPost] = useState(null)

  const content = {
    en: {
      title: "Blog & Podcast",
      description: "Discover insights and stories from successful founders and industry experts",
      blogTab: "Blog",
      podcastTab: "Podcast",
      podcastComingSoon: "Exciting content coming soon!",
      podcastDescription:
        "Stay tuned for our upcoming podcast series featuring interviews with industry leaders and startup founders.",
      readMore: "Read More",
      readLess: "Read Less",
      blogs: [
        {
          title: "Why Your MVP Should Never Be Free",
          date: "February 1, 2024",
          excerpt:
            "If you think launching your MVP for free will help validate your idea, we have news for you: it could be the worst mistake for your startup. Here's why.",
          content: `❌ Why should your MVP never be free? ❌
If you think launching your MVP for free will help validate your idea, we have news for you: it could be the worst mistake for your startup. Here's why. 👇

💡 1. If they don't pay, you haven't validated anything
An MVP should not only attract users but prove they're willing to pay for the solution. If people aren't spending money on your product, you don't have real validation.

⚠ 2. Free doesn't give you quality feedback
Users who don't pay try your product without commitment and rarely give useful feedback. Paying customers will demand improvements, and that's key to growth.

⏳ 3. It delays monetization and weakens your startup
If you get people used to using your product for free, it'll be hard to make them pay later. From day one, establish a clear revenue model.

🔥 4. Without revenue, there's no growth
If you don't charge, you can't reinvest in improvements, marketing, or scaling. Your startup needs money to survive and evolve.

💵 So, what should you do?
✅ Charge from the beginning (even if it's a low price).
✅ Offer a trial period, but with a defined payment plan.
✅ Test models like subscription, one-time payment, or usage-based charging.

💬 What do you think? Was your MVP free or did you charge from the start? Tell us in the comments. 👇

📌 Follow LinkUp for more content on startups, investment, and growth! 🚀

#Entrepreneurship #Startups #MVP #Business #Validation #LinkUp`,
        },
        {
          title: "How to Build a Product People Want (Real Example)",
          date: "January 29, 2024",
          excerpt:
            "Discover how Dropbox validated their idea with a simple video before writing a single line of code, and learn key strategies for product validation.",
          content: `💡 Did you know that Dropbox validated their idea with a simple video before writing a single line of code?

Most startups fail because they create products nobody wants. The secret is to validate before building.

🔍 Real case: Dropbox
Before developing their software, Drew Houston created a simple video showing how the product would work. That video generated 75,000 waitlist registrations in a single day.

💡 Learnings for founders:
⿡ You don't need a perfect product to validate your idea.
⿢ Real demand is measured with interested users, not opinions.
⿣ An MVP can be just a video, a landing page, or a presentation.

🔥 How could you apply this to your startup? Share your idea in the LinkUp community and get real feedback.`,
        },
        {
          title: "The Secret to Startup Success Isn't in the Product",
          date: "January 27, 2024",
          excerpt:
            "Learn why execution, not just the product, is the key differentiator between successful startups and those that fail. Explore real-world examples of pivots that led to success.",
          content: `🚀 The biggest differentiator between a successful startup and one that fails isn't the product, it's the execution.

Many people believe that great startups were born with an incredible idea. But the truth is that most started with something completely different and pivoted along the way.

📉 Airbnb wasn't selling accommodation at first, but air mattresses in strangers' homes.
📉 Slack was a video game before becoming the most used communication tool.
📉 Instagram was a check-in app before becoming the leading photo network.

🔥 The key isn't the idea, it's the speed of learning.
Founders who listen to the market, iterate quickly, and constantly test are the ones who end up building winning products.

Is your startup executing quickly or just building without feedback?

🔁 Leave us a comment if you want to be part of our community and Share your experience.`,
        },
      ],
    },
    es: {
      title: "Blog y Podcast",
      description: "Descubre ideas e historias de fundadores exitosos y expertos de la industria",
      blogTab: "Blog",
      podcastTab: "Podcast",
      podcastComingSoon: "¡Contenido emocionante próximamente!",
      podcastDescription:
        "Mantente atento a nuestra próxima serie de podcasts con entrevistas a líderes de la industria y fundadores de startups.",
      readMore: "Leer Más",
      readLess: "Leer Menos",
      blogs: [
        {
          title: "¿Por qué tu MVP nunca debe ser gratis?",
          date: "1 de Febrero, 2024",
          excerpt:
            "Si crees que lanzar tu MVP gratis te ayudará a validar tu idea, tenemos noticias para ti: puede ser el peor error para tu startup. Aquí te explicamos por qué.",
          content: `❌ ¿Por qué tu MVP nunca debe ser gratis? ❌
Si crees que lanzar tu MVP gratis te ayudará a validar tu idea, tenemos noticias para ti: puede ser el peor error para tu startup. Aquí te explicamos por qué. 👇

💡 1. Si no pagan, no validaste nada
Un MVP no solo debe atraer usuarios, sino probar que están dispuestos a pagar por la solución. Si la gente no gasta dinero en tu producto, no tienes validación real.

⚠ 2. Gratis no te da feedback de calidad
Usuarios que no pagan prueban tu producto sin compromiso y rara vez te dan feedback útil. Los clientes que pagan te exigirán mejoras, y eso es clave para crecer.

⏳ 3. Retrasa la monetización y debilita tu startup
Si acostumbras a la gente a usar tu producto gratis, luego será difícil que paguen. Desde el día 1, establece un modelo de ingresos claro.

🔥 4. Sin ingresos, sin crecimiento
Si no cobras, no puedes reinvertir en mejoras, marketing ni escalar. Tu startup necesita dinero para sobrevivir y evolucionar.

💵 Entonces, ¿qué hacer?
✅ Cobrar desde el principio (aunque sea un precio bajo).
✅ Ofrecer un período de prueba, pero con un plan de pago definido.
✅ Probar modelos como suscripción, pago único o cobro por uso.

💬 ¿Qué opinas? ¿Tu MVP fue gratis o cobraste desde el inicio? Cuéntanos en los comentarios. 👇

📌 Sigue a LinkUp para más contenido sobre startups, inversión y crecimiento! 🚀

#Emprendimiento #Startups #MVP #Negocios #Validación #LinkUp`,
        },
        {
          title: "Cómo Construir un Producto que la Gente Quiera (Ejemplo Real)",
          date: "29 de Enero, 2024",
          excerpt:
            "Descubre cómo Dropbox validó su idea con un simple video antes de escribir una línea de código, y aprende estrategias clave para la validación de productos.",
          content: `💡 ¿Sabías que Dropbox validó su idea con un simple video antes de escribir una línea de código?

La mayoría de startups fallan porque crean productos que nadie quiere. El secreto es validar antes de construir.

🔍 Caso real: Dropbox
Antes de desarrollar su software, Drew Houston creó un simple video mostrando cómo funcionaría el producto. Ese video generó 75,000 registros en lista de espera en un solo día.

💡 Aprendizajes para founders:
⿡ No necesitas un producto perfecto para validar tu idea.
⿢ La demanda real se mide con usuarios interesados, no con opiniones.
⿣ Un MVP puede ser solo un video, una landing page o una presentación.

🔥 ¿Cómo podrías aplicar esto en tu startup? Publica tu idea en la comunidad LinkUp y recibe feedback real.`,
        },
        {
          title: "El Secreto del Éxito de las Startups No Está en el Producto",
          date: "27 de Enero, 2024",
          excerpt:
            "Aprende por qué la ejecución, no solo el producto, es el factor diferenciador clave entre las startups exitosas y las que fracasan. Explora ejemplos reales de pivotes que llevaron al éxito.",
          content: `🚀 El mayor diferenciador entre una startup exitosa y una que fracasa no es el producto, es la ejecución.

Mucha gente cree que las grandes startups nacieron con una idea increíble. Pero la verdad es que la mayoría empezó con algo completamente diferente y pivotó en el camino.

📉 Airbnb no vendía hospedaje al principio, sino colchones inflables en casas de extraños.
📉 Slack era un videojuego antes de ser la herramienta de comunicación más usada.
📉 Instagram era una app de check-ins antes de convertirse en la red de fotos líder.

🔥 La clave no es la idea, es la velocidad de aprendizaje.
Los founders que escuchan el mercado, iteran rápido y prueban constantemente son los que terminan construyendo productos ganadores.

¿Tu startup está ejecutando rápido o solo construyendo sin feedback?

🔁 Déjanos un comentario si quieres ser parte de nuestra comunidad y Comparte tu experiencia.`,
        },
      ],
    },
  }

  const t = content[language]

  const toggleExpand = (index) => {
    if (expandedPost === index) {
      setExpandedPost(null)
    } else {
      setExpandedPost(index)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-20">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-primary-900 mb-4 text-center">{t.title}</h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">{t.description}</p>

        <Tabs defaultValue="blog" className="max-w-4xl mx-auto">
          <TabsList className="w-full mb-8 bg-transparent border-b border-gray-200">
            <TabsTrigger
              value="blog"
              className="px-8 py-2 -mb-px text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700 border-b-2 border-transparent data-[state=active]:border-secondary-500 data-[state=active]:text-secondary-600"
            >
              <BookOpen className="w-4 h-4 mr-2 inline-block" />
              {t.blogTab}
            </TabsTrigger>
            <TabsTrigger
              value="podcast"
              className="px-8 py-2 -mb-px text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700 border-b-2 border-transparent data-[state=active]:border-secondary-500 data-[state=active]:text-secondary-600"
            >
              <Headphones className="w-4 h-4 mr-2 inline-block" />
              {t.podcastTab}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="blog">
            <div className="grid gap-8">
              {t.blogs.map((blog, index) => (
                <Card
                  key={index}
                  className="bg-white hover:shadow-lg transition-shadow duration-300 overflow-hidden border-2 border-gray-200"
                >
                  <CardHeader className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-secondary-600 font-medium">{blog.date}</span>
                    </div>
                    <CardTitle className="text-2xl font-bold text-primary-900 mb-2">{blog.title}</CardTitle>
                    <CardDescription className="text-gray-600">{blog.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="prose max-w-none mb-4">
                      <p className="text-gray-600">
                        {expandedPost === index
                          ? blog.content
                          : `${blog.content.split("\n").slice(0, 3).join("\n")}...`}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      className="mt-4 border-2 border-secondary-500 text-secondary-600 hover:bg-secondary-50"
                      onClick={() => toggleExpand(index)}
                    >
                      {expandedPost === index ? t.readLess : t.readMore}
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="podcast">
            <Card className="bg-white overflow-hidden border-2 border-gray-200">
              <CardContent className="flex flex-col md:flex-row items-center justify-between p-8">
                <div className="mb-6 md:mb-0 md:mr-6">
                  <h3 className="text-2xl font-bold text-primary-900 mb-2">{t.podcastComingSoon}</h3>
                  <p className="text-gray-600 max-w-md mb-4">{t.podcastDescription}</p>
                </div>
                <div className="w-48 h-48 bg-secondary-200 rounded-full flex items-center justify-center">
                  <Headphones className="w-24 h-24 text-secondary-500" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

