"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"
import Link from "next/link"

export default function ModuleDetails({ modules, currentModule }) {
  const [expandedModule, setExpandedModule] = useState(currentModule)

  const toggleModule = (moduleOrder) => {
    setExpandedModule(expandedModule === moduleOrder ? null : moduleOrder)
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Módulos del Programa</CardTitle>
      </CardHeader>
      <CardContent>
        {modules.map((module) => (
          <div key={module.order} className="mb-6">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleModule(module.order)}
            >
              <h3 className="font-semibold text-lg mb-2">{`${module.order}. ${module.title}`}</h3>
              {expandedModule === module.order ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </div>
            {expandedModule === module.order && (
              <div className="mt-2">
                <ul className="list-disc list-inside ml-4">
                  {module.topics.map((topic, topicIndex) => (
                    <li key={topicIndex} className="text-sm text-gray-600 mb-1">
                      {topic}
                    </li>
                  ))}
                </ul>
                <Button className="mt-4" asChild>
                  <Link href={`/modules/${module.order}`}>Ir al Módulo</Link>
                </Button>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

