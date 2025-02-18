import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowRight, CheckCircle2 } from "lucide-react"

export default function ModuleOverview({ module, progress, onStartModule, completedSections }) {
  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800 mb-4">
          Bienvenido al Módulo
        </h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">{module.title}</h2>
        <p className="text-xl text-gray-600 mb-8">{module.description}</p>
        <Button size="lg" className="rounded-full bg-blue-600 hover:bg-blue-700" onClick={onStartModule}>
          Comenzar Módulo
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tu Progreso</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={progress} className="w-full" />
          <p className="mt-2 text-sm text-gray-600">{Math.round(progress)}% completado</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contenido del Módulo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {module.sections.map((section, index) => (
              <div
                key={section.id}
                className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-muted">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-medium">{section.title}</h3>
                    <p className="text-sm text-muted-foreground">{section.summary}</p>
                  </div>
                </div>
                {completedSections.includes(section.id) ? (
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                ) : (
                  <ArrowRight className="w-5 h-5 text-muted-foreground" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

