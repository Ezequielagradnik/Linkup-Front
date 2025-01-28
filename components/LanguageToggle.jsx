"use client"

import { useLanguage } from "@/contexts/LanguageContext"
import { Button } from "@/components/ui/button"

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage()

  return (
    <Button onClick={toggleLanguage} variant="outline" size="sm" className="ml-4">
      {language === "en" ? "ES" : "EN"}
    </Button>
  )
}

