"use client"

import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { Partnership } from "@/components/partnership"
import { WeeklyPosts } from "@/components/weekly-posts"
import { Pricing } from "@/components/pricing"
import { useLanguage } from "@/contexts/LanguageContext"

export default function Home() {
  const { language } = useLanguage()

  return (
    <div className="bg-gradient-to-b from-primary to-white">
      <Hero language={language} />
      <Features language={language} />
      <Partnership />
      <WeeklyPosts language={language} />
      <Pricing language={language} />
    </div>
  )
}

