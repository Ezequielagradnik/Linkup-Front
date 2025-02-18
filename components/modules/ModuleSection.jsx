"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ModuleSection({ section, onComplete, isCompleted, savedResponses = {} }) {
  const [responses, setResponses] = useState(savedResponses)
  const [activeTab, setActiveTab] = useState("content")

  const handleResponseChange = (questionIndex, value) => {
    setResponses((prev) => ({
      ...prev,
      [questionIndex]: value,
    }))
  }

  const handleSubmit = () => {
    onComplete(section.id, responses)
  }

  const isValid = section.reflection.every((_, index) => responses[index]?.trim().length >= 50)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <section.icon className="h-6 w-6" />
          <span>{section.title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="content">Contenido</TabsTrigger>
            <TabsTrigger value="reflection">Reflexión</TabsTrigger>
            <TabsTrigger value="resources">Recursos</TabsTrigger>
          </TabsList>

          <TabsContent value="content">
            <ScrollArea className="h-[60vh] rounded-md border p-4">
              <div className="prose max-w-none">
                <h3 className="text-lg font-semibold mb-4">Resumen</h3>
                <p className="mb-6">{section.summary}</p>

                <h3 className="text-lg font-semibold mb-4">Contenido Completo</h3>
                <div className="whitespace-pre-wrap">{section.content}</div>

                {section.examples && (
                  <>
                    <h3 className="text-lg font-semibold mt-6 mb-4">Ejemplos</h3>
                    <ul className="list-disc pl-6">
                      {section.examples.map((example, index) => (
                        <li key={index} className="mb-2">
                          {example}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="reflection">
            <div className="space-y-6">
              <p className="text-sm text-muted-foreground">
                Responde a las siguientes preguntas de reflexión. Cada respuesta debe tener al menos 50 caracteres.
              </p>
              {section.reflection.map((question, index) => (
                <div key={index} className="space-y-2">
                  <p className="font-medium">{question}</p>
                  <Textarea
                    placeholder="Escribe tu respuesta aquí..."
                    value={responses[index] || ""}
                    onChange={(e) => handleResponseChange(index, e.target.value)}
                    rows={4}
                    className="w-full"
                  />
                  <p className="text-sm text-muted-foreground">{responses[index]?.length || 0}/50 caracteres mínimos</p>
                </div>
              ))}
              {!isCompleted && (
                <Button
                  className="w-full rounded-full bg-blue-600 hover:bg-blue-700"
                  onClick={handleSubmit}
                  disabled={!isValid}
                >
                  Completar Sección
                </Button>
              )}
            </div>
          </TabsContent>

          <TabsContent value="resources">
            <ScrollArea className="h-[60vh] rounded-md border p-4">
              <div className="space-y-6">
                {section.resources.map((resource, index) => (
                  <div key={index} className="p-4 rounded-lg border">
                    <h4 className="font-semibold text-lg mb-1">{resource.title}</h4>
                    {resource.author && <p className="text-sm text-muted-foreground">Por {resource.author}</p>}
                    <p className="text-sm font-medium text-blue-600 mt-1">{resource.type}</p>
                    <p className="mt-2 text-sm">{resource.description}</p>
                    <Button variant="link" className="mt-2 p-0 h-auto font-semibold" asChild>
                      <a href={resource.link} target="_blank" rel="noopener noreferrer">
                        Acceder al recurso
                      </a>
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

