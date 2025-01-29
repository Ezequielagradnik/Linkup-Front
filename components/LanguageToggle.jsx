"use client"

import { useLanguage } from "@/contexts/LanguageContext"
import { Button } from "@/components/ui/button"

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage()

  return (
    <Button
      onClick={toggleLanguage}
      variant="outline"
      size="sm"
      className="rounded-full border-2 border-gray-200 hover:border-secondary-500 hover:bg-secondary-50"
    >
      {language === "en" ? "ES" : "EN"}
    </Button>
  )
}

