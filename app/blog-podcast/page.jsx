"use client"

import { useState } from "react"
import { useLanguage } from "@/contexts/LanguageContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

export default function BlogAndPodcast() {
  const { language } = useLanguage()
  const [activeTab, setActiveTab] = useState("blog")

  const content = {
    en: {
      title: "Blog & Podcast",
      description: "Discover insights and stories from successful founders and industry experts",
      blogTab: "Blog",
      podcastTab: "Podcast",
      podcastComingSoon: "Coming soon! Find more of our posts on our website's blog and in our growing community.",
      joinCommunity: "Want to be part of our community? Leave us a comment.",
      blogs: [
        {
          title: "How to Build a Product People Want (Real Example)",
          date: "January 29, 2024",
          content: `💡 Did you know that Dropbox validated their idea with a simple video before writing a single line of code?

Most startups fail because they create products nobody wants. The secret is to validate before building.

🔍 Real case: Dropbox
Before developing their software, Drew Houston created a simple video showing how the product would work. That video generated 75,000 waitlist registrations in a single day.

💡 Learnings for founders:
⿡ You don't need a perfect product to validate your idea.
⿢ Real demand is measured with interested users, not opinions.
⿣ An MVP can be just a video, a landing page, or a presentation.

🔥 How could you apply this to your startup? Share your idea in the LinkUp community and get real feedback.`,
          readMore: "Read more",
        },
        {
          title: "The Secret to Startup Success Isn't in the Product",
          date: "January 27, 2024",
          content: `🚀 The biggest differentiator between a successful startup and one that fails isn't the product, it's the execution.

Many people believe that great startups were born with an incredible idea. But the truth is that most started with something completely different and pivoted along the way.

📉 Airbnb wasn't selling accommodation at first, but air mattresses in strangers' homes.
📉 Slack was a video game before becoming the most used communication tool.
📉 Instagram was a check-in app before becoming the leading photo network.

🔥 The key isn't the idea, it's the speed of learning.
Founders who listen to the market, iterate quickly, and constantly test are the ones who end up building winning products.

Is your startup executing quickly or just building without feedback?

🔁 Leave us a comment if you want to be part of our community and Share your experience.`,
          readMore: "Read more",
        },
      ],
    },
    es: {
      title: "Blog y Podcast",
      description: "Descubre ideas e historias de fundadores exitosos y expertos de la industria",
      blogTab: "Blog",
      podcastTab: "Podcast",
      podcastComingSoon:
        "¡Próximamente encuentra más de nuestros posts en nuestro blog en nuestra página web y en nuestra comunidad que va creciendo poco a poco!",
      joinCommunity: "¿Quieres ser parte de nuestra comunidad? Déjanos un comentario.",
      blogs: [
        {
          title: "Cómo Construir un Producto que la Gente Quiera (Ejemplo Real)",
          date: "29 de Enero, 2024",
          content: `💡 ¿Sabías que Dropbox validó su idea con un simple video antes de escribir una línea de código?

La mayoría de startups fallan porque crean productos que nadie quiere. El secreto es validar antes de construir.

🔍 Caso real: Dropbox
Antes de desarrollar su software, Drew Houston creó un simple video mostrando cómo funcionaría el producto. Ese video generó 75,000 registros en lista de espera en un solo día.

💡 Aprendizajes para founders:
⿡ No necesitas un producto perfecto para validar tu idea.
⿢ La demanda real se mide con usuarios interesados, no con opiniones.
⿣ Un MVP puede ser solo un video, una landing page o una presentación.

🔥 ¿Cómo podrías aplicar esto en tu startup? Publica tu idea en la comunidad LinkUp y recibe feedback real.`,
          readMore: "Leer más",
        },
        {
          title: "El Secreto del Éxito de las Startups No Está en el Producto",
          date: "27 de Enero, 2024",
          content: `🚀 El mayor diferenciador entre una startup exitosa y una que fracasa no es el producto, es la ejecución.

Mucha gente cree que las grandes startups nacieron con una idea increíble. Pero la verdad es que la mayoría empezó con algo completamente diferente y pivotó en el camino.

📉 Airbnb no vendía hospedaje al principio, sino colchones inflables en casas de extraños.
📉 Slack era un videojuego antes de ser la herramienta de comunicación más usada.
📉 Instagram era una app de check-ins antes de convertirse en la red de fotos líder.

🔥 La clave no es la idea, es la velocidad de aprendizaje.
Los founders que escuchan el mercado, iteran rápido y prueban constantemente son los que terminan construyendo productos ganadores.

¿Tu startup está ejecutando rápido o solo construyendo sin feedback?

🔁 Déjanos un comentario si quieres ser parte de nuestra comunidad y Comparte tu experiencia.`,
          readMore: "Leer más",
        },
      ],
    },
  }

  const t = content[language]

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-primary-900 mb-4 text-center">{t.title}</h1>
        <p className="text-center text-gray-600 mb-8">{t.description}</p>

        <Tabs defaultValue="blog" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger
              value="blog"
              className="rounded-full data-[state=active]:bg-secondary-500 data-[state=active]:text-white"
            >
              {t.blogTab}
            </TabsTrigger>
            <TabsTrigger
              value="podcast"
              className="rounded-full data-[state=active]:bg-secondary-500 data-[state=active]:text-white"
            >
              {t.podcastTab}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="blog">
            <div className="grid gap-8">
              {t.blogs.map((blog, index) => (
                <Card key={index} className="bg-white hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-500">{blog.date}</span>
                    </div>
                    <CardTitle className="text-xl font-bold text-primary-900 mb-2">{blog.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose max-w-none">
                      <p className="whitespace-pre-line text-gray-600">{blog.content}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="podcast">
            <Card className="bg-white">
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <p className="text-lg text-gray-600 max-w-2xl mb-4">{t.podcastComingSoon}</p>
                <p className="text-sm text-gray-500">{t.joinCommunity}</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

