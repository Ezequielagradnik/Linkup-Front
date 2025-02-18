"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import ModuleOverview from "@/components/modules/ModuleOverview"
import ModuleSection from "@/components/modules/ModuleSection"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/contexts/AuthContext"
import { moduleData } from "@/data/module1" // Importamos el contenido estático

export default function ModulePage({ params }) {
  const router = useRouter()
  const { toast } = useToast()
  const { user } = useAuth()
  const [userProgress, setUserProgress] = useState({
    completedSections: [],
    responses: {},
    progress: 0,
  })
  const [currentSectionIndex, setCurrentSectionIndex] = useState(-1)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await fetch(`/api/progress/${user.id}/${params.moduleId}`)
        if (res.ok) {
          const data = await res.json()
          setUserProgress({
            completedSections: data.completedSections || [],
            responses: data.responses || {},
            progress: data.progress || 0,
          })
        }
      } catch (error) {
        console.error("Error fetching progress:", error)
        toast({
          title: "Error",
          description: "No se pudo cargar tu progreso. Por favor intenta nuevamente.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    if (user) {
      fetchProgress()
    }
  }, [user, params.moduleId, toast])

  const handleSectionComplete = async (sectionId, responses) => {
    try {
      // Calculamos el nuevo progreso
      const totalSections = moduleData.sections.length
      const completedCount = userProgress.completedSections.length + 1
      const newProgress = (completedCount / totalSections) * 100

      const res = await fetch(`/api/progress/${user.id}/${params.moduleId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sectionId,
          responses,
          progress: newProgress,
          completedSections: [...userProgress.completedSections, sectionId],
        }),
      })

      if (!res.ok) throw new Error("Failed to update progress")

      const updatedProgress = await res.json()
      setUserProgress((prev) => ({
        ...prev,
        completedSections: [...prev.completedSections, sectionId],
        responses: {
          ...prev.responses,
          [sectionId]: responses,
        },
        progress: newProgress,
      }))

      toast({
        title: "Sección completada",
        description: "Tus respuestas han sido guardadas correctamente.",
      })

      // Move to next section if available
      if (currentSectionIndex < moduleData.sections.length - 1) {
        setCurrentSectionIndex((prev) => prev + 1)
      }
    } catch (error) {
      console.error("Error saving progress:", error)
      toast({
        title: "Error",
        description: "No se pudieron guardar tus respuestas. Por favor intenta nuevamente.",
        variant: "destructive",
      })
    }
  }

  const navigateToSection = (index) => {
    if (index >= -1 && index < moduleData.sections.length) {
      setCurrentSectionIndex(index)
    }
  }

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 pt-16 pb-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {currentSectionIndex === -1 ? (
          <ModuleOverview
            module={moduleData}
            progress={userProgress.progress}
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
                  disabled={currentSectionIndex === moduleData.sections.length - 1}
                  className="flex items-center gap-2"
                >
                  Siguiente
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
              <Progress value={userProgress.progress} className="w-full" />
              <p className="mt-2 text-sm text-gray-600 text-center">{Math.round(userProgress.progress)}% completado</p>
            </div>

            {/* Current Section */}
            <ModuleSection
              section={moduleData.sections[currentSectionIndex]}
              onComplete={handleSectionComplete}
              isCompleted={userProgress.completedSections.includes(moduleData.sections[currentSectionIndex].id)}
              savedResponses={userProgress.responses[moduleData.sections[currentSectionIndex].id]}
              totalSections={moduleData.sections.length}
              currentSection={currentSectionIndex + 1}
            />
          </>
        )}
      </div>
    </div>
  )
}

