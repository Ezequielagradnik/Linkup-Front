"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

export default function ApplyNow() {
  const [step, setStep] = useState(1)
  const totalSteps = 3
  const { language } = useLanguage()

  const content = {
    en: {
      title: "Join LinkUp",
      subtitle: "Complete the application below to start your startup journey",
      steps: ["Personal Information", "Startup Details", "Your Goals"],
      form: {
        firstName: "First Name",
        lastName: "Last Name",
        email: "Email",
        linkedin: "LinkedIn Profile",
        companyName: "Company/Startup Name",
        stage: {
          label: "Stage of Your Startup",
          options: [
            { value: "idea", label: "Idea Stage" },
            { value: "mvp", label: "MVP" },
            { value: "market", label: "In Market" },
            { value: "scaling", label: "Scaling" },
          ],
        },
        industry: {
          label: "Industry",
          placeholder: "Select industry",
          options: [
            { value: "tech", label: "Technology" },
            { value: "health", label: "Healthcare" },
            { value: "finance", label: "Fintech" },
            { value: "edu", label: "Education" },
            { value: "other", label: "Other" },
          ],
        },
        description: "Describe Your Startup",
        goals: "What are your goals with LinkUp?",
      },
      buttons: {
        back: "Back",
        next: "Next Step",
        submit: "Submit Application",
      },
    },
    es: {
      title: "Únete a LinkUp",
      subtitle: "Completa la solicitud a continuación para comenzar tu viaje de startup",
      steps: ["Información Personal", "Detalles de la Startup", "Tus Objetivos"],
      form: {
        firstName: "Nombre",
        lastName: "Apellido",
        email: "Correo Electrónico",
        linkedin: "Perfil de LinkedIn",
        companyName: "Nombre de la Empresa/Startup",
        stage: {
          label: "Etapa de tu Startup",
          options: [
            { value: "idea", label: "Etapa de Idea" },
            { value: "mvp", label: "MVP" },
            { value: "market", label: "En el Mercado" },
            { value: "scaling", label: "Escalando" },
          ],
        },
        industry: {
          label: "Industria",
          placeholder: "Selecciona la industria",
          options: [
            { value: "tech", label: "Tecnología" },
            { value: "health", label: "Salud" },
            { value: "finance", label: "Fintech" },
            { value: "edu", label: "Educación" },
            { value: "other", label: "Otra" },
          ],
        },
        description: "Describe tu Startup",
        goals: "¿Cuáles son tus objetivos con LinkUp?",
      },
      buttons: {
        back: "Atrás",
        next: "Siguiente Paso",
        submit: "Enviar Solicitud",
      },
    },
  }

  const t = content[language]

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="container max-w-4xl py-12">
        {/* Header with gradient background */}
        <div className="relative rounded-2xl bg-gradient-to-r from-secondary-500 to-secondary-600 p-8 mb-8 text-white overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/10"></div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 relative z-10">{t.title}</h1>
          <p className="text-secondary-100 relative z-10">{t.subtitle}</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-xs mx-auto">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center">
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
                    transition-all duration-300
                    ${
                      step >= i
                        ? "bg-secondary-500 text-white shadow-[0_4px_14px_0_rgb(0,118,255,0.39)]"
                        : "bg-gray-100 text-gray-400"
                    }
                  `}
                >
                  {step > i ? <CheckCircle2 className="w-5 h-5" /> : i}
                </div>
                {i < totalSteps && (
                  <div
                    className={`w-16 h-1 mx-2 rounded transition-all duration-300 ${
                      step > i ? "bg-secondary-500" : "bg-gray-100"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <Card className="border-none shadow-lg rounded-2xl overflow-hidden">
          <CardContent className="p-8">
            {step === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">{t.form.firstName}</Label>
                    <Input
                      placeholder={t.form.firstName}
                      className="rounded-xl border-gray-200 focus:border-secondary-500 focus:ring-secondary-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">{t.form.lastName}</Label>
                    <Input
                      placeholder={t.form.lastName}
                      className="rounded-xl border-gray-200 focus:border-secondary-500 focus:ring-secondary-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">{t.form.email}</Label>
                  <Input
                    type="email"
                    placeholder={t.form.email}
                    className="rounded-xl border-gray-200 focus:border-secondary-500 focus:ring-secondary-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">{t.form.linkedin}</Label>
                  <Input
                    type="url"
                    placeholder={t.form.linkedin}
                    className="rounded-xl border-gray-200 focus:border-secondary-500 focus:ring-secondary-500"
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">{t.form.companyName}</Label>
                  <Input
                    placeholder={t.form.companyName}
                    className="rounded-xl border-gray-200 focus:border-secondary-500 focus:ring-secondary-500"
                  />
                </div>

                <div className="space-y-4">
                  <Label className="text-sm font-medium text-gray-700">{t.form.stage.label}</Label>
                  <RadioGroup className="grid grid-cols-2 gap-4">
                    {t.form.stage.options.map((option) => (
                      <div
                        key={option.value}
                        className="relative flex cursor-pointer rounded-xl border border-gray-200 p-4 hover:border-secondary-500 transition-all duration-300"
                      >
                        <RadioGroupItem value={option.value} id={option.value} className="text-secondary-500" />
                        <Label htmlFor={option.value} className="ml-2 cursor-pointer font-medium text-gray-700">
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">{t.form.industry.label}</Label>
                  <Select>
                    <SelectTrigger className="rounded-xl border-gray-200">
                      <SelectValue placeholder={t.form.industry.placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                      {t.form.industry.options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">{t.form.description}</Label>
                  <Textarea
                    placeholder={t.form.description}
                    className="min-h-[150px] rounded-xl border-gray-200 focus:border-secondary-500 focus:ring-secondary-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">{t.form.goals}</Label>
                  <Textarea
                    placeholder={t.form.goals}
                    className="min-h-[100px] rounded-xl border-gray-200 focus:border-secondary-500 focus:ring-secondary-500"
                  />
                </div>
              </div>
            )}

            <div className="flex gap-4 mt-8">
              {step > 1 && (
                <Button
                  variant="outline"
                  onClick={() => setStep(step - 1)}
                  className="flex-1 rounded-xl border-2 border-gray-200 hover:border-secondary-500 hover:bg-secondary-50 text-lg font-medium"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  {t.buttons.back}
                </Button>
              )}

              <Button
                onClick={() => (step < totalSteps ? setStep(step + 1) : null)}
                className="flex-1 rounded-xl bg-secondary-500 text-white hover:bg-secondary-600 shadow-[0_4px_14px_0_rgb(0,118,255,0.39)] hover:shadow-[0_6px_20px_rgba(0,118,255,0.23)] text-lg font-medium"
              >
                {step === totalSteps ? t.buttons.submit : t.buttons.next}
                {step < totalSteps && <ArrowRight className="w-5 h-5 ml-2" />}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

