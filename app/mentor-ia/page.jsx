"use client"

import { useState } from "react"
import { useLanguage } from "@/contexts/LanguageContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function MentorIA() {
  const { language } = useLanguage()
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: "user" }])
      setInput("")
      // Here you would typically call an API to get the AI response
      // For now, we'll just simulate a response
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "This is a placeholder response from the AI mentor.", sender: "ai" },
        ])
      }, 1000)
    }
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            {language === "en" ? "Mentor-IA Chat" : "Chat con Mentor-IA"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[60vh] overflow-y-auto mb-4 p-4 border rounded-lg">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 p-2 rounded-lg ${
                  message.sender === "user" ? "bg-blue-100 text-right" : "bg-gray-100"
                }`}
              >
                {message.text}
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              type="text"
              placeholder={language === "en" ? "Type your message..." : "Escribe tu mensaje..."}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-grow rounded-full"
            />
            <Button
              type="submit"
              className="px-8 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-all"
            >
              {language === "en" ? "Send" : "Enviar"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

