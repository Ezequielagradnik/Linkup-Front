"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import { useToast } from "@/components/ui/use-toast"

export default function ApplyNow() {
  const [step, setStep] = useState(1)
  const totalSteps = 3
  const { language } = useLanguage()
  const router = useRouter()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    linkedinProfile: "",
    startupName: "",
    shortDescription: "",
    problemSolved: "",
    sector: "",
    stage: "",
    hasInvestment: "",
    seekingInvestment: "",
    hasCustomers: "",
    customersDetails: "",
    links: "",
    founderContact: "",
    whyJoinLinkUp: "",
    howHeardAboutLinkUp: "",
  })

  const [errors, setErrors] = useState({})

  const content = {
    en: {
      title: "Join LinkUp",
      subtitle: "Complete the application to start your startup journey",
      steps: ["Personal Information", "Startup Details", "Additional Information"],
      form: {
        firstName: "First Name",
        lastName: "Last Name",
        email: "Email",
        password: "Password",
        confirmPassword: "Confirm Password",
        linkedinProfile: "LinkedIn Profile",
        startupName: "Startup Name",
        shortDescription: "Brief one-line description",
        problemSolved: "Problem you're solving",
        sector: "Sector",
        stage: {
          label: "Current stage of your startup",
          options: [
            { value: "idea", label: "Idea" },
            { value: "mvp", label: "MVP" },
            { value: "market", label: "Product in Market" },
            { value: "scaling", label: "Scaling" },
          ],
        },
        hasInvestment: "Have you received investment?",
        seekingInvestment: "Are you currently seeking investment?",
        hasCustomers: "Do you have customers?",
        customersDetails: "How many and in which markets?",
        links: "Link to pitch deck, website, or social media (optional)",
        founderContact: "Founder name(s) and contact",
        whyJoinLinkUp: "Why do you want to join LinkUp?",
        howHeardAboutLinkUp: "How did you hear about LinkUp?",
      },
      buttons: {
        back: "Back",
        next: "Next Step",
        submit: "Submit Application",
      },
      toast: {
        success: "Application submitted successfully!",
        error: "Error submitting application. Please try again.",
      },
    },
    es: {
      title: "Únete a LinkUp",
      subtitle: "Completa la solicitud para comenzar tu viaje de startup",
      steps: ["Información Personal", "Detalles de la Startup", "Información Adicional"],
      form: {
        firstName: "Nombre",
        lastName: "Apellido",
        email: "Correo Electrónico",
        password: "Contraseña",
        confirmPassword: "Confirmar Contraseña",
        linkedinProfile: "Perfil de LinkedIn",
        startupName: "Nombre de la Startup",
        shortDescription: "Breve descripción en una línea",
        problemSolved: "Problemática que resuelven",
        sector: "Sector en el que opera",
        stage: {
          label: "Estado actual de la startup",
          options: [
            { value: "idea", label: "Idea" },
            { value: "mvp", label: "MVP" },
            { value: "market", label: "Producto en mercado" },
            { value: "scaling", label: "Escalando" },
          ],
        },
        hasInvestment: "¿Han recibido inversión?",
        seekingInvestment: "¿Buscan inversión actualmente?",
        hasCustomers: "¿Tienen clientes?",
        customersDetails: "¿Cuántos y en qué mercados?",
        links: "Enlace a pitch deck, sitio web o redes sociales (opcional)",
        founderContact: "Nombre y contacto de fundador/es",
        whyJoinLinkUp: "¿Por qué quieres unirte a LinkUp?",
        howHeardAboutLinkUp: "¿Cómo te enteraste de LinkUp?",
      },
      buttons: {
        back: "Atrás",
        next: "Siguiente Paso",
        submit: "Enviar Solicitud",
      },
      toast: {
        success: "¡Solicitud enviada con éxito!",
        error: "Error al enviar la solicitud. Por favor, intenta de nuevo.",
      },
    },
  }

  const t = content[language]

  const validateStep = (currentStep) => {
    const fieldsToValidate = {
      1: ["firstName", "lastName", "email", "password", "confirmPassword"],
      2: ["linkedinProfile", "startupName", "shortDescription", "problemSolved", "sector", "stage"],
      3: [
        "hasInvestment",
        "seekingInvestment",
        "hasCustomers",
        "customersDetails",
        "links",
        "founderContact",
        "whyJoinLinkUp",
        "howHeardAboutLinkUp",
      ],
    }

    return fieldsToValidate[currentStep].every((field) => formData[field].trim() !== "")
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: value.trim() === "" ? "This field is required" : "" }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: value === "" ? "This field is required" : "" }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("handleSubmit iniciado")
    console.log("Datos del formulario:", formData)
    try {
      console.log("Intentando hacer fetch a:", `/api/apply`)
      const response = await fetch(`/api/apply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
      console.log("Respuesta recibida:", response)
      console.log("Estado de la respuesta:", response.status)

      if (response.ok) {
        const responseData = await response.json()
        console.log("Datos de respuesta:", responseData)
        toast({
          title: t.toast.success,
          description: "We will review your application and get back to you soon.",
        })
        router.push("/application-submitted")
      } else {
        const errorData = await response.json()
        console.error("Error data:", errorData)
        throw new Error(errorData.message || "Failed to submit application")
      }
    } catch (error) {
      console.error("Error detallado:", error)
      toast({
        title: t.toast.error,
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      })
    }
  }

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
            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">{t.form.firstName}</Label>
                      <Input
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder={t.form.firstName}
                        className={`rounded-xl border-gray-200 focus:border-secondary-500 focus:ring-secondary-500 ${
                          errors.firstName ? "border-red-500" : ""
                        }`}
                        required
                      />
                      {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">{t.form.lastName}</Label>
                      <Input
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder={t.form.lastName}
                        className={`rounded-xl border-gray-200 focus:border-secondary-500 focus:ring-secondary-500 ${
                          errors.lastName ? "border-red-500" : ""
                        }`}
                        required
                      />
                      {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">{t.form.email}</Label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder={t.form.email}
                      className={`rounded-xl border-gray-200 focus:border-secondary-500 focus:ring-secondary-500 ${
                        errors.email ? "border-red-500" : ""
                      }`}
                      required
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">{t.form.password}</Label>
                    <Input
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder={t.form.password}
                      className={`rounded-xl border-gray-200 focus:border-secondary-500 focus:ring-secondary-500 ${
                        errors.password ? "border-red-500" : ""
                      }`}
                      required
                    />
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">{t.form.confirmPassword}</Label>
                    <Input
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder={t.form.confirmPassword}
                      className={`rounded-xl border-gray-200 focus:border-secondary-500 focus:ring-secondary-500 ${
                        errors.confirmPassword ? "border-red-500" : ""
                      }`}
                      required
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">{t.form.linkedinProfile}</Label>
                    <Input
                      name="linkedinProfile"
                      value={formData.linkedinProfile}
                      onChange={handleInputChange}
                      placeholder={t.form.linkedinProfile}
                      className={`rounded-xl border-gray-200 focus:border-secondary-500 focus:ring-secondary-500 ${
                        errors.linkedinProfile ? "border-red-500" : ""
                      }`}
                      required
                    />
                    {errors.linkedinProfile && <p className="text-red-500 text-sm mt-1">{errors.linkedinProfile}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">{t.form.startupName}</Label>
                    <Input
                      name="startupName"
                      value={formData.startupName}
                      onChange={handleInputChange}
                      placeholder={t.form.startupName}
                      className={`rounded-xl border-gray-200 focus:border-secondary-500 focus:ring-secondary-500 ${
                        errors.startupName ? "border-red-500" : ""
                      }`}
                      required
                    />
                    {errors.startupName && <p className="text-red-500 text-sm mt-1">{errors.startupName}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">{t.form.shortDescription}</Label>
                    <Input
                      name="shortDescription"
                      value={formData.shortDescription}
                      onChange={handleInputChange}
                      placeholder={t.form.shortDescription}
                      className={`rounded-xl border-gray-200 focus:border-secondary-500 focus:ring-secondary-500 ${
                        errors.shortDescription ? "border-red-500" : ""
                      }`}
                      required
                    />
                    {errors.shortDescription && <p className="text-red-500 text-sm mt-1">{errors.shortDescription}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">{t.form.problemSolved}</Label>
                    <Textarea
                      name="problemSolved"
                      value={formData.problemSolved}
                      onChange={handleInputChange}
                      placeholder={t.form.problemSolved}
                      className={`rounded-xl border-gray-200 focus:border-secondary-500 focus:ring-secondary-500 ${
                        errors.problemSolved ? "border-red-500" : ""
                      }`}
                      required
                    />
                    {errors.problemSolved && <p className="text-red-500 text-sm mt-1">{errors.problemSolved}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">{t.form.sector}</Label>
                    <Input
                      name="sector"
                      value={formData.sector}
                      onChange={handleInputChange}
                      placeholder={t.form.sector}
                      className={`rounded-xl border-gray-200 focus:border-secondary-500 focus:ring-secondary-500 ${
                        errors.sector ? "border-red-500" : ""
                      }`}
                      required
                    />
                    {errors.sector && <p className="text-red-500 text-sm mt-1">{errors.sector}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">{t.form.stage.label}</Label>
                    <Select name="stage" onValueChange={(value) => handleSelectChange("stage", value)} required>
                      <SelectTrigger className={`rounded-xl border-gray-200 ${errors.stage ? "border-red-500" : ""}`}>
                        <SelectValue placeholder={t.form.stage.label} />
                      </SelectTrigger>
                      <SelectContent>
                        {t.form.stage.options.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.stage && <p className="text-red-500 text-sm mt-1">{errors.stage}</p>}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">{t.form.hasInvestment}</Label>
                    <Select
                      name="hasInvestment"
                      onValueChange={(value) => handleSelectChange("hasInvestment", value)}
                      required
                    >
                      <SelectTrigger
                        className={`rounded-xl border-gray-200 ${errors.hasInvestment ? "border-red-500" : ""}`}
                      >
                        <SelectValue placeholder={t.form.hasInvestment} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">{language === "en" ? "Yes" : "Sí"}</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.hasInvestment && <p className="text-red-500 text-sm mt-1">{errors.hasInvestment}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">{t.form.seekingInvestment}</Label>
                    <Select
                      name="seekingInvestment"
                      onValueChange={(value) => handleSelectChange("seekingInvestment", value)}
                      required
                    >
                      <SelectTrigger
                        className={`rounded-xl border-gray-200 ${errors.seekingInvestment ? "border-red-500" : ""}`}
                      >
                        <SelectValue placeholder={t.form.seekingInvestment} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">{language === "en" ? "Yes" : "Sí"}</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.seekingInvestment && (
                      <p className="text-red-500 text-sm mt-1">{errors.seekingInvestment}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">{t.form.hasCustomers}</Label>
                    <Select
                      name="hasCustomers"
                      onValueChange={(value) => handleSelectChange("hasCustomers", value)}
                      required
                    >
                      <SelectTrigger
                        className={`rounded-xl border-gray-200 ${errors.hasCustomers ? "border-red-500" : ""}`}
                      >
                        <SelectValue placeholder={t.form.hasCustomers} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">{language === "en" ? "Yes" : "Sí"}</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.hasCustomers && <p className="text-red-500 text-sm mt-1">{errors.hasCustomers}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">{t.form.customersDetails}</Label>
                    <Input
                      name="customersDetails"
                      value={formData.customersDetails}
                      onChange={handleInputChange}
                      placeholder={t.form.customersDetails}
                      className={`rounded-xl border-gray-200 focus:border-secondary-500 focus:ring-secondary-500 ${
                        errors.customersDetails ? "border-red-500" : ""
                      }`}
                      required
                    />
                    {errors.customersDetails && <p className="text-red-500 text-sm mt-1">{errors.customersDetails}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">{t.form.links}</Label>
                    <Input
                      name="links"
                      value={formData.links}
                      onChange={handleInputChange}
                      placeholder={t.form.links}
                      className={`rounded-xl border-gray-200 focus:border-secondary-500 focus:ring-secondary-500 ${
                        errors.links ? "border-red-500" : ""
                      }`}
                      required
                    />
                    {errors.links && <p className="text-red-500 text-sm mt-1">{errors.links}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">{t.form.founderContact}</Label>
                    <Input
                      name="founderContact"
                      value={formData.founderContact}
                      onChange={handleInputChange}
                      placeholder={t.form.founderContact}
                      className={`rounded-xl border-gray-200 focus:border-secondary-500 focus:ring-secondary-500 ${
                        errors.founderContact ? "border-red-500" : ""
                      }`}
                      required
                    />
                    {errors.founderContact && <p className="text-red-500 text-sm mt-1">{errors.founderContact}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">{t.form.whyJoinLinkUp}</Label>
                    <Textarea
                      name="whyJoinLinkUp"
                      value={formData.whyJoinLinkUp}
                      onChange={handleInputChange}
                      placeholder={t.form.whyJoinLinkUp}
                      className={`rounded-xl border-gray-200 focus:border-secondary-500 focus:ring-secondary-500 ${
                        errors.whyJoinLinkUp ? "border-red-500" : ""
                      }`}
                      required
                    />
                    {errors.whyJoinLinkUp && <p className="text-red-500 text-sm mt-1">{errors.whyJoinLinkUp}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">{t.form.howHeardAboutLinkUp}</Label>
                    <Input
                      name="howHeardAboutLinkUp"
                      value={formData.howHeardAboutLinkUp}
                      onChange={handleInputChange}
                      placeholder={t.form.howHeardAboutLinkUp}
                      className={`rounded-xl border-gray-200 focus:border-secondary-500 focus:ring-secondary-500 ${
                        errors.howHeardAboutLinkUp ? "border-red-500" : ""
                      }`}
                      required
                    />
                    {errors.howHeardAboutLinkUp && (
                      <p className="text-red-500 text-sm mt-1">{errors.howHeardAboutLinkUp}</p>
                    )}
                  </div>
                </div>
              )}

              <div className="flex gap-4 mt-8">
                {step > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(step - 1)}
                    className="flex-1 rounded-xl border-2 border-gray-200 hover:border-secondary-500 hover:bg-secondary-50 text-lg font-medium"
                  >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    {t.buttons.back}
                  </Button>
                )}

                {step < totalSteps ? (
                  <Button
                    type="button"
                    onClick={() => {
                      if (validateStep(step)) {
                        setStep(step + 1)
                      } else {
                        toast({
                          title: language === "en" ? "Incomplete Form" : "Formulario Incompleto",
                          description:
                            language === "en"
                              ? "Please fill in all required fields before proceeding."
                              : "Por favor, complete todos los campos requeridos antes de continuar.",
                          variant: "destructive",
                        })
                      }
                    }}
                    className="flex-1 rounded-xl bg-secondary-500 text-white hover:bg-secondary-600 shadow-[0_4px_14px_0_rgb(0,118,255,0.39)] hover:shadow-[0_6px_20px_rgba(0,118,255,0.23)] text-lg font-medium"
                  >
                    {t.buttons.next}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="flex-1 rounded-xl bg-secondary-500 text-white hover:bg-secondary-600 shadow-[0_4px_14px_0_rgb(0,118,255,0.39)] hover:shadow-[0_6px_20px_rgba(0,118,255,0.23)] text-lg font-medium"
                  >
                    {t.buttons.submit}
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

