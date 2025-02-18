"use client"

import { useState } from "react"
import { BookOpen, Brain, Lightbulb, Users, Clock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useLanguage } from "@/contexts/LanguageContext"
import { Progress } from "@/components/ui/progress"

export default function Module1() {
  const { language } = useLanguage()
  const [activeSection, setActiveSection] = useState("overview")
  const [progress, setProgress] = useState(0)

  const module = {
    title: "Módulo 1: Introducción al Mundo de las Startups",
    description:
      "Este módulo te enseñará qué es una startup, cómo funciona y los primeros pasos antes de lanzarte a emprender.",
    sections: [
      {
        id: "1.1",
        title: "¿Qué es realmente una Startup y qué la diferencia de un negocio tradicional?",
        icon: BookOpen,
        summary:
          "Exploraremos la definición de una startup, sus características únicas y cómo se diferencia de los negocios tradicionales. Analizaremos ejemplos de startups exitosas y sus modelos de negocio innovadores.",
        content: `
          Una startup es una empresa emergente con una fuerte orientación hacia la innovación y el uso de la tecnología, creada con el objetivo de encontrar un modelo de negocio escalable, repetible y sostenible en el tiempo. A diferencia de los negocios tradicionales, las startups priorizan la velocidad de crecimiento y la capacidad de adaptarse rápidamente a las necesidades del mercado.

          Las startups no siempre nacen con una estructura definida, sino que evolucionan constantemente mediante la experimentación y validación continua. Este enfoque las diferencia de los negocios tradicionales, que suelen seguir modelos más estructurados y previsibles.
        `,
        examples: [
          "Uber: Cambió la forma en que las personas se transportan al conectar conductores y pasajeros mediante una app, ofreciendo una alternativa más flexible y eficiente que los taxis tradicionales.",
          "Airbnb: Permitió a personas alquilar sus espacios a viajeros, revolucionando la industria hotelera.",
          "Spotify: Innovó en el sector de la música ofreciendo streaming bajo suscripción, eliminando la necesidad de descargar canciones.",
        ],
        reflection: [
          "¿Qué hace realmente diferente a una startup?",
          "¿Por qué crees que las startups pueden crecer más rápido que los negocios tradicionales?",
          "¿Qué papel juega la innovación en el éxito de una startup?",
        ],
        resources: [
          {
            title: "The Lean Startup",
            author: "Eric Ries",
            type: "Libro",
            description:
              "Una guía esencial sobre cómo crear y gestionar startups exitosas utilizando la innovación continua.",
            link: "https://www.amazon.com/Lean-Startup-Entrepreneurs-Continuous-Innovation/dp/0307887898",
          },
          {
            title: "How to Start a Startup",
            author: "Sam Altman",
            type: "Serie de videos",
            description:
              "Una serie de conferencias de Stanford sobre los aspectos fundamentales de iniciar una startup.",
            link: "https://www.youtube.com/playlist?list=PL5q_lef6zVkaTY_cT1k7qFNF2TidHCe-1",
          },
        ],
      },
      {
        id: "1.2",
        title: "¿Qué significa realmente emprender y qué sacrificios implica?",
        icon: Brain,
        summary:
          "Descubriremos lo que realmente significa ser un emprendedor, los desafíos que enfrentan y los sacrificios necesarios para tener éxito. Examinaremos la mentalidad emprendedora y cómo desarrollar resiliencia.",
        content: `
          Emprender no es simplemente tener una idea brillante, sino transformarla en realidad a través de acción constante, resiliencia y sacrificio. Implica salir de la zona de confort, enfrentar riesgos significativos y lidiar con una alta dosis de incertidumbre.

          Un emprendedor debe estar dispuesto a asumir fracasos como parte del aprendizaje y desarrollar una mentalidad de crecimiento, entendiendo que cada obstáculo es una oportunidad para mejorar. Este proceso no solo afecta el ámbito profesional, sino también el personal, ya que el camino del emprendimiento puede generar tensiones en relaciones personales, finanzas y salud mental.

          Principios clave de la mentalidad emprendedora:
          ● Resiliencia: Capacidad de adaptarse y recuperarse de las adversidades.
          ● Mentalidad de crecimiento: Creer que las habilidades y la inteligencia se pueden desarrollar con esfuerzo y aprendizaje constante.
          ● Gestión del riesgo: Saber medir y asumir riesgos calculados sin dejarse paralizar por el miedo.
          ● Gestión del fracaso: Ver el fracaso como parte del proceso de mejora y no como un final.
        `,
        reflection: [
          "¿Por qué es importante la resiliencia en el camino emprendedor?",
          "¿Cómo manejas la incertidumbre en tu vida diaria?",
          "¿Qué significa para ti el fracaso? ¿Cómo podrías redefinirlo para convertirlo en una oportunidad de aprendizaje?",
        ],
        resources: [
          {
            title: "The Hard Thing About Hard Things",
            author: "Ben Horowitz",
            type: "Libro",
            description: "Un libro que aborda los desafíos del emprendimiento y cómo superarlos.",
            link: "https://www.amazon.com/Hard-Thing-About-Things-Building/dp/0062273205",
          },
          {
            title: "Masters of Scale",
            type: "Podcast",
            description: "Un podcast de Reid Hoffman que explora cómo las empresas crecen de cero a miles de millones.",
            link: "https://mastersofscale.com/",
          },
        ],
      },
      {
        id: "1.3",
        title: "¿Siempre hace falta validar una idea antes de ejecutarla?",
        icon: Lightbulb,
        summary:
          "Aprenderemos la importancia de la validación de ideas en el mundo de las startups. Exploraremos diferentes métodos de validación y cuándo es necesario aplicarlos antes de lanzar un producto o servicio.",
        content: `
          Muchos founders creen que antes de lanzar una startup deben hacer encuestas y validar con miles de personas. Pero esto no siempre es necesario.

          Primero, hazte estas preguntas clave:
          - ¿El problema que resuelves ya está validado por otros negocios similares?
          - ¿Tu solución requiere un cambio de comportamiento del usuario?
          - ¿Sabes si la gente está dispuesta a pagar por tu producto/servicio?

          Si respondes "no" a la primera pregunta o "sí" a la segunda y tercera, entonces necesitas validar antes de ejecutar.
        `,
        reflection: [
          "¿Cómo determinarías si tu idea de startup necesita validación exhaustiva?",
          "¿Qué métodos de validación consideras más efectivos y por qué?",
          "¿Cómo equilibrarías la necesidad de validar con la de actuar rápidamente en el mercado?",
        ],
        resources: [
          {
            title: "The Mom Test",
            author: "Rob Fitzpatrick",
            type: "Libro",
            description: "Una guía práctica sobre cómo hablar con clientes y validar ideas de negocio.",
            link: "http://momtestbook.com/",
          },
          {
            title: "Lean Customer Development",
            author: "Cindy Alvarez",
            type: "Libro",
            description: "Técnicas para construir productos que los clientes realmente quieren.",
            link: "https://www.amazon.com/Lean-Customer-Development-Building-Customers/dp/1492023744",
          },
        ],
      },
      {
        id: "1.4",
        title: "Networking: La Clave Oculta del Éxito en Startups",
        icon: Users,
        summary:
          "Descubriremos la importancia del networking en el ecosistema de startups. Aprenderemos estrategias efectivas para construir y mantener relaciones valiosas que pueden impulsar el crecimiento de tu startup.",
        content: `
          El networking no es solo conocer gente: es la herramienta más poderosa para acelerar tu startup. Los mayores avances en el ecosistema emprendedor ocurren gracias a conexiones estratégicas con personas clave: mentores, inversionistas, otros founders y clientes potenciales.

          ¿Por qué el networking es esencial en una startup?
          ● Validación y toma de decisiones: Un buen mentor puede ahorrarte meses (o años) de trabajo guiándote en la dirección correcta.
          ● Oportunidades de pivot: Muchas startups cambian de rumbo después de recibir feedback valioso en una conversación casual.
          ● Conseguir clientes antes de lanzar: Relaciones estratégicas pueden abrir puertas a tus primeros clientes sin necesidad de publicidad.
          ● Acceso a inversión y aceleradoras: Muchas rondas de inversión no comienzan con un pitch deck, sino con una recomendación dentro del ecosistema.
        `,
        reflection: [
          "¿Cómo podrías aprovechar tu red actual para impulsar tu idea de startup?",
          "¿Qué estrategias utilizarías para construir relaciones significativas en el ecosistema emprendedor?",
          "¿Cómo equilibrarías el tiempo dedicado al networking con el desarrollo de tu producto?",
        ],
        resources: [
          {
            title: "Never Eat Alone",
            author: "Keith Ferrazzi",
            type: "Libro",
            description: "Estrategias para construir relaciones para el éxito en los negocios y en la vida.",
            link: "https://www.amazon.com/Never-Eat-Alone-Expanded-Updated/dp/0385346654",
          },
          {
            title: "Founder's Network",
            type: "Comunidad en línea",
            description: "Una comunidad global de fundadores de startups para networking y aprendizaje.",
            link: "https://foundersnetwork.com/",
          },
        ],
      },
      {
        id: "1.5",
        title: "¿Qué hacer antes de empezar para no perder tiempo y dinero?",
        icon: Clock,
        summary:
          "Exploraremos las estrategias y pasos cruciales que debes tomar antes de lanzar tu startup. Aprenderemos cómo minimizar riesgos, validar ideas eficientemente y prepararte para el éxito.",
        content: `
          Uno de los errores más comunes entre los emprendedores novatos es lanzarse al mercado sin la preparación adecuada. Validar la idea antes de invertir dinero y tiempo en el desarrollo del producto es esencial para minimizar riesgos y aumentar las probabilidades de éxito.

          Las startups que se preparan adecuadamente suelen:
          ✔ Definir su problema y mercado objetivo con precisión.
          ✔ Usar herramientas y metodologías para validar su idea sin gastar mucho dinero.
          ✔ Aprender de los errores de otros emprendedores para evitar caer en las mismas trampas.
          ✔ Construir una red de apoyo antes de lanzarse al mercado.

          🔹 3 pasos clave antes de empezar tu startup:
          1️⃣ Validación de la idea: Asegurarte de que existe un problema real y que tu solución tiene demanda.
          2️⃣ Aprender de otros emprendedores: Analizar fracasos y éxitos para evitar errores comunes.
          3️⃣ Usar herramientas y metodologías: Conocer y aplicar frameworks como Lean Startup y Business Model Canvas.
        `,
        reflection: [
          "¿Qué pasos consideras más importantes antes de lanzar una startup y por qué?",
          "¿Cómo planearías tu investigación de mercado para validar tu idea de negocio?",
          "¿Qué herramientas o metodologías te parecen más útiles para la fase inicial de una startup?",
        ],
        resources: [
          {
            title: "Zero to One",
            author: "Peter Thiel",
            type: "Libro",
            description: "Notas sobre startups o cómo construir el futuro, por el co-fundador de PayPal.",
            link: "https://www.amazon.com/Zero-One-Notes-Startups-Future/dp/0804139296",
          },
          {
            title: "Y Combinator Startup School",
            type: "Curso en línea",
            description:
              "Un curso gratuito que cubre los fundamentos de cómo iniciar una startup, impartido por expertos de Silicon Valley.",
            link: "https://www.startupschool.org/",
          },
        ],
      },
    ],
  }

  const handleSectionComplete = (sectionId) => {
    // Here you would typically update the progress in your backend
    // For now, we'll just update the local state
    setProgress((prev) => Math.min(100, prev + 20))
  }

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setActiveSection(sectionId)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 pt-16 pb-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Module Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800 mb-4">
            Bienvenido al Primer Módulo de LinkUp
          </h1>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">{module.title}</h2>
          <p className="text-xl text-gray-600 mb-8">{module.description}</p>
          <Button className="rounded-full bg-blue-600 hover:bg-blue-700" onClick={() => scrollToSection("overview")}>
            Comenzar Módulo
          </Button>
        </div>

        {/* Module Overview */}
        <Card id="overview" className="mb-8">
          <CardHeader>
            <CardTitle>Visión General del Módulo</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Este módulo consta de 5 secciones principales:</p>
            <ol className="list-decimal list-inside space-y-2">
              {module.sections.map((section) => (
                <li key={section.id} className="text-gray-700">
                  {section.title}
                  <Button variant="link" className="ml-2 text-blue-600" onClick={() => scrollToSection(section.id)}>
                    Ir a la sección <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>

        {/* Progress Tracker */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Tu Progreso</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={progress} className="w-full" />
            <p className="mt-2 text-sm text-gray-600">{progress}% completado</p>
          </CardContent>
        </Card>

        {/* Module Content */}
        <div className="grid gap-8">
          {module.sections.map((section) => {
            const Icon = section.icon
            return (
              <Card key={section.id} id={section.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon className="h-6 w-6" />
                    <span>{section.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none mb-6">
                    <h3 className="text-lg font-semibold mb-2">Resumen</h3>
                    <p>{section.summary}</p>
                  </div>
                  <Accordion type="single" collapsible className="w-full mb-6">
                    <AccordionItem value="content">
                      <AccordionTrigger>Ver Contenido Completo</AccordionTrigger>
                      <AccordionContent>
                        <div className="prose max-w-none">
                          <p>{section.content}</p>
                          {section.examples && (
                            <div>
                              <h4>Ejemplos:</h4>
                              <ul>
                                {section.examples.map((example, index) => (
                                  <li key={index}>{example}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Preguntas de Reflexión</h3>
                    <ul className="list-disc list-inside space-y-2">
                      {section.reflection.map((question, index) => (
                        <li key={index} className="text-gray-700">
                          {question}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Recursos Adicionales</h3>
                    <ul className="space-y-4">
                      {section.resources.map((resource, index) => (
                        <li key={index} className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-semibold">{resource.title}</h4>
                          {resource.author && <p className="text-sm text-gray-600">Por {resource.author}</p>}
                          <p className="text-sm font-medium text-blue-600">{resource.type}</p>
                          <p className="mt-1 text-sm text-gray-700">{resource.description}</p>
                          <a
                            href={resource.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 inline-block text-blue-600 hover:underline"
                          >
                            Acceder al recurso
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button
                    className="mt-6 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-all"
                    onClick={() => handleSectionComplete(section.id)}
                  >
                    Marcar como completado
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}

