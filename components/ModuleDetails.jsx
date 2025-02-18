import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/contexts/LanguageContext"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function ModuleDetails({ modules, currentModule }) {
  const router = useRouter()
  const { language } = useLanguage()

  const handleModuleClick = (moduleId) => {
    // Actualizado para usar la nueva estructura de rutas
    router.push(`/modules/${moduleId}`)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center mb-8">
        {language === "en" ? "Program Modules" : "Módulos del Programa"}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {modules.map((module) => (
          <Card
            key={module.id}
            className={`transform transition-all duration-300 hover:scale-105 cursor-pointer ${
              module.completed ? "border-green-500" : ""
            }`}
            onClick={() => handleModuleClick(module.id)}
          >
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold">
                {language === "en" ? "Module" : "Módulo"} {module.id}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">{module.title}</p>
              <div className="flex items-center justify-between">
                <Button variant="ghost" className="text-blue-600 hover:text-blue-700 p-0 flex items-center gap-2">
                  {language === "en" ? "Start Module" : "Comenzar Módulo"}
                  <ArrowRight className="h-4 w-4" />
                </Button>
                {module.completed && (
                  <span className="text-green-500 text-sm">✓ {language === "en" ? "Completed" : "Completado"}</span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

