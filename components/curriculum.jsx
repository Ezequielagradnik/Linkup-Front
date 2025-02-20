// components/curriculum.tsx
"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Clock, ChevronDown, ChevronUp, BookOpen, Target, Rocket, Users, PieChart, Presentation, Phone } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"
const modules = [
  {
    number: 1,
    title: "Introducción al Mundo de las Startups",
    icon: BookOpen,
    duration: "15-20 horas",
    weeklyHours: "5-7 horas por semana",
    recommendedWeeks: "2-3 semanas",
    topics: [
      "¿Qué es realmente una Startup y qué la diferencia de un negocio tradicional?",
      "¿Qué significa realmente emprender y qué sacrificios implica?",
      "¿Siempre hace falta validar una idea antes de ejecutarla?",
      "Networking: La Clave Oculta del Éxito en Startups",
      "¿Qué hacer antes de empezar para no perder tiempo y dinero?",
    ],
  },
  {
    number: 2,
    title: "Descubriendo una Idea Ganadora",
    icon: Target,
    duration: "16-19 horas",
    weeklyHours: "5-7 horas por semana",
    recommendedWeeks: "3-4 semanas",
    topics: [
      "¿Cómo encontrar ideas para una startup?",
      "¿Cómo evaluar si una idea tiene potencial real?",
      "Diseño y Validación del Modelo de Negocio",
    ],
  },
  {
    number: 3,
    title: "Construcción del MVP y Validación",
    icon: Rocket,
    duration: "20-26 horas",
    weeklyHours: "5-7 horas por semana",
    recommendedWeeks: "3-5 semanas",
    topics: [
      "¿Qué es un MVP y por qué es esencial?",
      "Estrategias para construir un MVP sin gastar mucho",
      "¿Por qué nunca debes hacer un MVP gratis?",
      "¿Cómo saber cuándo mejorar tu MVP o pivotar?",
      "Cómo conseguir usuarios iniciales sin gastar en marketing",
    ],
  },
  {
    number: 4,
    title: "Estrategias de Growth Hacking y Construcción de Equipo",
    icon: TrendingUp,
    duration: "22-30 horas",
    weeklyHours: "5-7 horas por semana",
    recommendedWeeks: "4-5 semanas",
    topics: [
      "Estrategias de Growth Hacking para conseguir los primeros clientes",
      "Cómo vender antes de construir (Preventas y validación de mercado)",
      "Cómo construir confianza en los primeros clientes",
      "Construcción del Equipo y Cultura Startup",
    ],
  },
  {
    number: 5,
    title: "Formación de Equipo y Relaciones Estratégicas",
    icon: Users,
    duration: "24-26 horas",
    weeklyHours: "5-7 horas por semana",
    recommendedWeeks: "4-6 semanas",
    topics: [
      "¿Cuándo y cómo armar un equipo?",
      "Cómo encontrar co-founders y socios estratégicos",
      "Cultura Startup vs. Cultura Corporativa",
      "Cómo llevar calls efectivas con inversionistas, clientes y socios",
    ],
  },
  {
    number: 6,
    title: "Creación de un Pitch Deck Profesional",
    icon: Presentation,
    duration: "25-27 horas",
    weeklyHours: "5-7 horas por semana",
    recommendedWeeks: "4-6 semanas",
    topics: [
      "Creación de un Pitch Deck Profesional",
      "Cómo hablar con inversionistas y responder preguntas clave",
      "Simulaciones y feedback real sobre el pitch",
      "Estrategia Financiera y Unit Economics",
    ],
  },
  {
    number: 7,
    title: "Llamadas con Inversionistas y Presentación de Pitch Deck",
    icon: Phone,
    duration: "28-30 horas",
    weeklyHours: "5-7 horas por semana",
    recommendedWeeks: "4-6 semanas",
    topics: [
      "Cómo estructurar llamadas con inversionistas",
      "Estrategias para cerrar acuerdos y negociar mejor",
      "Pitch en llamadas: captar la atención en segundos",
      "Cómo presentar un pitch deck y levantar inversión",
    ],
  },
]

export function Curriculum({ language }) {
  const [expandedModule, setExpandedModule] = useState(null)

  const t = {
    en: {
      title: "Course Curriculum",
      subtitle: "A comprehensive journey from idea to investment",
      duration: "Duration",
      weekly: "Weekly Dedication",
      recommended: "Recommended Timeline",
      expandModule: "View Module Details",
      collapseModule: "Hide Module Details",
    },
    es: {
      title: "Plan de Estudios",
      subtitle: "Un viaje completo desde la idea hasta la inversión",
      duration: "Duración",
      weekly: "Dedicación Semanal",
      recommended: "Tiempo Recomendado",
      expandModule: "Ver Detalles del Módulo",
      collapseModule: "Ocultar Detalles",
    },
  }[language]

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.title}</h2>
          <p className="text-xl text-gray-600">{t.subtitle}</p>
        </div>

        <div className="space-y-6">
          {modules.map((module) => (
            <Card
              key={module.number}
              className="overflow-hidden border border-gray-200 hover:border-blue-200 transition-all duration-300"
            >
              <CardContent className="p-0">
                <button
                  onClick={() => setExpandedModule(expandedModule === module.number ? null : module.number)}
                  className="w-full text-left"
                >
                  <div className="p-6 flex items-center justify-between gap-4 bg-white hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <module.icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-blue-600 mb-1">Módulo {module.number}</div>
                        <h3 className="text-lg font-semibold text-gray-900">{module.title}</h3>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="hidden md:flex items-center gap-2 text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">{module.duration}</span>
                      </div>
                      {expandedModule === module.number ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                </button>

                <AnimatePresence>
                  {expandedModule === module.number && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-gray-100"
                    >
                      <div className="p-6 bg-gray-50">
                        <div className="grid md:grid-cols-3 gap-4 mb-6">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <div>
                              <div className="text-sm font-medium text-gray-900">{t.duration}</div>
                              <div className="text-sm text-gray-600">{module.duration}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <PieChart className="w-4 h-4 text-gray-400" />
                            <div>
                              <div className="text-sm font-medium text-gray-900">{t.weekly}</div>
                              <div className="text-sm text-gray-600">{module.weeklyHours}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Target className="w-4 h-4 text-gray-400" />
                            <div>
                              <div className="text-sm font-medium text-gray-900">{t.recommended}</div>
                              <div className="text-sm text-gray-600">{module.recommendedWeeks}</div>
                            </div>
                          </div>
                        </div>

                        <ul className="space-y-3">
                          {module.topics.map((topic, index) => (
                            <motion.li
                              key={index}
                              initial={{ x: -20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-start gap-3"
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2" />
                              <span className="text-gray-600">{topic}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}