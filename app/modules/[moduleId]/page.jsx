"use client"

import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/contexts/AuthContext"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import ModuleOverview from "@/components/ModuleOverview"
import ModuleSection from "@/components/ModuleSection"

// Componente principal que maneja los params como promesa
export default function ModulePage({ params }) {
  const router = useRouter()
  const { toast } = useToast()
  const { user } = useAuth()
  const [moduleId, setModuleId] = useState(null)
  const [userProgress, setUserProgress] = useState({
    completedSections: [],
    responses: {},
    progress: 0,
  })
  const [currentSectionIndex, setCurrentSectionIndex] = useState(-1)
  const [isLoading, setIsLoading] = useState(true)
  const [module, setModule] = useState(null)
  const [error, setError] = useState(null)

  // Extraer moduleId de params al inicio
  useEffect(() => {
    async function extractParams() {
      try {
        const resolvedParams = await params
        setModuleId(resolvedParams.moduleId)
      } catch (err) {
        console.error("Error resolving params:", err)
        setError("Error loading module parameters")
      }
    }

    extractParams()
  }, [params])

  // Obtener el módulo desde el backend
  useEffect(() => {
    if (!moduleId) return

    const fetchModule = async () => {
      try {
        setIsLoading(true)
        const token = localStorage.getItem("token")

        // Usar la ruta relativa para evitar problemas de CORS
        const response = await fetch(`/api/modules/${moduleId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })

        if (!response.ok) {
          throw new Error("No se pudo cargar el módulo")
        }

        const moduleData = await response.json()
        console.log("Módulo cargado:", moduleData)
        setModule(moduleData)
      } catch (error) {
        console.error("Error al cargar el módulo:", error)
        setError(error.message)
        toast({
          title: "Error",
          description: "No se pudo cargar el módulo. Por favor intenta nuevamente.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchModule()
  }, [moduleId, toast])

  // Obtener el progreso del usuario
  useEffect(() => {
    if (!user || !moduleId || isLoading || !module) return

    const fetchProgress = async () => {
      try {
        const token = localStorage.getItem("token")
        // Usar la nueva ruta específica
        const res = await fetch(`/api/progress/module/${moduleId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })

        if (res.ok) {
          const data = await res.json()
          setUserProgress({
            completedSections: data.completedSections || [],
            responses: data.responses || {},
            progress: data.progress || 0,
          })
        } else {
          console.log("No se encontró progreso, usando valores predeterminados")
          setUserProgress({
            completedSections: [],
            responses: {},
            progress: 0,
          })
        }
      } catch (error) {
        console.error("Error fetching progress:", error)
        // Usar valores predeterminados en caso de error
        setUserProgress({
          completedSections: [],
          responses: {},
          progress: 0,
        })
      }
    }

    fetchProgress()
  }, [user, moduleId, isLoading, module])

  const handleSectionComplete = async (sectionId, responses) => {
    if (!module?.content?.sections || !moduleId) return

    try {
      const totalSections = module.content.sections.length
      const completedCount = userProgress.completedSections.length + 1
      const newProgress = (completedCount / totalSections) * 100

      const token = localStorage.getItem("token")
      // Usar la nueva ruta específica
      const res = await fetch(`/api/progress/module/${moduleId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
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

      if (currentSectionIndex < module.content.sections.length - 1) {
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
    if (module?.content?.sections && index >= -1 && index < module.content.sections.length) {
      setCurrentSectionIndex(index)
    }
  }

  if (!moduleId || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error || !module) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-red-500">No se pudo cargar el módulo</p>
        <Button onClick={() => router.push("/dashboard")}>Volver al Dashboard</Button>
      </div>
    )
  }

  // Asegurarse de que las secciones estén disponibles
  const sections = module.content?.sections || []

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 pt-16 pb-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {currentSectionIndex === -1 ? (
          <ModuleOverview
            module={module}
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
                  disabled={currentSectionIndex === sections.length - 1}
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
            {sections[currentSectionIndex] && (
              <ModuleSection
                section={sections[currentSectionIndex]}
                onComplete={handleSectionComplete}
                isCompleted={userProgress.completedSections.includes(sections[currentSectionIndex].id)}
                savedResponses={userProgress.responses[sections[currentSectionIndex].id]}
                totalSections={sections.length}
                currentSection={currentSectionIndex + 1}
              />
            )}
          </>
        )}
      </div>
    </div>
  )
}

