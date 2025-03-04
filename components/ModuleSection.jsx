import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle } from 'lucide-react'
import ReactMarkdown from "react-markdown"

export default function ModuleSection({
  section,
  onComplete,
  isCompleted = false,
  savedResponses = {},
  totalSections,
  currentSection,
}) {
  const [responses, setResponses] = useState(savedResponses || {})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleResponseChange = (questionId, value) => {
    setResponses((prev) => ({
      ...prev,
      [questionId]: value,
    }))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      await onComplete(section.id, responses)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Verificar si todas las preguntas tienen respuestas
  const hasAnsweredAll = () => {
    if (!section.exercise) return true
    
    // Extraer preguntas del ejercicio (asumiendo que están en formato markdown)
    const questions = section.exercise
      .split("\n")
      .filter((line) => line.trim().match(/^\d+\.\s+/)) // Líneas que comienzan con números
    
    // Si no hay preguntas identificables, permitir completar
    if (questions.length === 0) return true
    
    // Verificar que haya al menos una respuesta (simplificado)
    return Object.keys(responses).length > 0
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">
          {section.title}
          {isCompleted && <CheckCircle className="inline ml-2 text-green-500" />}
        </h2>
        <span className="text-sm text-gray-500">
          Sección {currentSection} de {totalSections}
        </span>
      </div>

      {/* Contenido principal */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Contenido</CardTitle>
        </CardHeader>
        <CardContent className="prose max-w-none">
          <ReactMarkdown>{section.content}</ReactMarkdown>
        </CardContent>
      </Card>

      {/* Reflexión */}
      {section.reflection && (
        <Card className="shadow-md bg-blue-50">
          <CardHeader>
            <CardTitle>Reflexión</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <ReactMarkdown>{section.reflection}</ReactMarkdown>
          </CardContent>
        </Card>
      )}

      {/* Ejercicio práctico */}
      {section.exercise && (
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Ejercicio práctico</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="prose max-w-none">
              <ReactMarkdown>{section.exercise}</ReactMarkdown>
            </div>

            <div className="space-y-4">
              <Textarea
                placeholder="Escribe tus respuestas aquí..."
                className="min-h-[200px]"
                value={responses.exercise || ""}
                onChange={(e) => handleResponseChange("exercise", e.target.value)}
                disabled={isCompleted}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Contenido adicional */}
      {section.additionalContent && (
        <Card className="shadow-md bg-gray-50">
          <CardHeader>
            <CardTitle>Contenido adicional</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <ReactMarkdown>{section.additionalContent}</ReactMarkdown>
          </CardContent>
        </Card>
      )}

      {/* Botón de completar */}
      {!isCompleted ? (
        <div className="flex justify-end">
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || !hasAnsweredAll()}
            className="px-8"
          >
            {isSubmitting ? "Guardando..." : "Completar sección"}
          </Button>
        </div>
      ) : (
        <div className="flex justify-end">
          <Button variant="outline" className="px-8" disabled>
            Sección completada
          </Button>
        </div>
      )}
    </div>
  )
}