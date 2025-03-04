import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, BookOpen } from 'lucide-react'

export default function ModuleOverview({ module, progress = 0, onStartModule, completedSections = [] }) {
  if (!module) return null

  // Adaptamos para manejar tanto la estructura antigua como la nueva del backend
  const sections = module.content?.sections || module.sections || []
  const title = module.title || "Módulo sin título"
  const description = module.description || "Sin descripción"

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>
      </div>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Tu progreso</span>
            <span>{Math.round(progress)}%</span>
          </CardTitle>
          <CardDescription>Completa todas las secciones para finalizar este módulo</CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={progress} className="h-2 mb-6" />
          <Button onClick={onStartModule} className="w-full">
            {progress > 0 ? "Continuar módulo" : "Comenzar módulo"}
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Contenido del módulo</h2>
        <div className="space-y-2">
          {sections.map((section, index) => (
            <Card key={section.id || index} className="shadow-sm">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {completedSections.includes(section.id) ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <BookOpen className="h-5 w-5 text-blue-500" />
                  )}
                  <div>
                    <p className="font-medium">{section.title}</p>
                    <p className="text-sm text-gray-500">
                      {completedSections.includes(section.id) ? "Completado" : "Pendiente"}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onStartModule(index)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  {completedSections.includes(section.id) ? "Revisar" : "Comenzar"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}