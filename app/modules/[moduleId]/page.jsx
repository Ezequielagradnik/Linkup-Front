"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import ModuleOverview from "@/components/modules/ModuleOverview"
import ModuleSection from "@/components/modules/ModuleSection"
import { useToast } from "@/components/ui/use-toast"

const sampleModule = {
  id: 1,
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
      content: `Una startup es una empresa emergente con una fuerte orientación hacia la innovación y el uso de la tecnología, creada con el objetivo de encontrar un modelo de negocio escalable, repetible y sostenible en el tiempo. A diferencia de los negocios tradicionales, las startups priorizan la velocidad de crecimiento y la capacidad de adaptarse rápidamente a las necesidades del mercado.

Las startups no siempre nacen con una estructura definida, sino que evolucionan constantemente mediante la experimentación y validación continua. Este enfoque las diferencia de los negocios tradicionales, que suelen seguir modelos más estructurados y previsibles.`,
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
          description: "Una serie de conferencias de Stanford sobre los aspectos fundamentales de iniciar una startup.",
          link: "https://www.youtube.com/playlist?list=PL5q_lef6zVkaTY_cT1k7qFNF2TidHCe-1",
        },
      ],
    },
    // Add more sections here...
  ],
}

export default function ModulePage({ params }) {
  const router = useRouter()
  const { toast } = useToast()
  const [module, setModule] = useState(null)
  const [currentSectionIndex, setCurrentSectionIndex] = useState(-1)
  const [userProgress, setUserProgress] = useState({
    completedSections: [],
    responses: {},
  })

  useEffect(() => {
    // In a real application, you would fetch this data from an API
    setModule(sampleModule)
  }, [])

  const handleSectionComplete = async (sectionId, responses) => {
    try {
      // In a real application, you would send this data to your backend
      console.log("Saving responses:", { moduleId: params.moduleId, sectionId, responses })

      setUserProgress((prev) => ({
        ...prev,
        completedSections: [...prev.completedSections, sectionId],
        responses: {
          ...prev.responses,
          [sectionId]: responses,
        },
      }))

      toast({
        title: "Sección completada",
        description: "Tus respuestas han sido guardadas correctamente.",
      })

      // Move to next section if available
      if (currentSectionIndex < module.sections.length - 1) {
        setCurrentSectionIndex((prev) => prev + 1)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudieron guardar tus respuestas. Por favor intenta nuevamente.",
        variant: "destructive",
      })
    }
  }

  const navigateToSection = (index) => {
    if (index >= -1 && index < (module?.sections?.length || 0)) {
      setCurrentSectionIndex(index)
    }
  }

  if (!module) return <div>Cargando...</div>

  const progress = (userProgress.completedSections.length / (module?.sections?.length || 1)) * 100 || 0

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 pt-16 pb-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {currentSectionIndex === -1 ? (
          <ModuleOverview
            module={module}
            progress={progress}
            onStartModule={() => setCurrentSectionIndex(0)}
            completedSections={userProgress.completedSections}
          />
        ) : (
          <>
            {/* Navigation and Progress */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <Button
                  variant="ghost"
                  onClick={() => navigateToSection(currentSectionIndex - 1)}
                  disabled={currentSectionIndex === 0}
                  className="flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Anterior
                </Button>
                <Button variant="ghost" onClick={() => setCurrentSectionIndex(-1)}>
                  Volver al índice
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => navigateToSection(currentSectionIndex + 1)}
                  disabled={currentSectionIndex === (module?.sections?.length || 0) - 1}
                  className="flex items-center gap-2"
                >
                  Siguiente
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
              <Progress value={progress} className="w-full" />
              <p className="mt-2 text-sm text-gray-600 text-center">{Math.round(progress)}% completado</p>
            </div>

            {/* Current Section */}
            {module?.sections?.[currentSectionIndex] && (
              <ModuleSection
                section={module.sections[currentSectionIndex]}
                onComplete={handleSectionComplete}
                isCompleted={userProgress.completedSections.includes(module.sections[currentSectionIndex].id)}
                savedResponses={userProgress.responses[module.sections[currentSectionIndex].id]}
              />
            )}
          </>
        )}
      </div>
    </div>
  )
}

