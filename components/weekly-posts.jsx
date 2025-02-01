"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function WeeklyPosts({ language }) {
  const [posts, setPosts] = useState([])

  const content = {
    en: {
      title: "Weekly Posts",
      description: "Latest insights and strategies for startup success",
      readMore: "Read more in our blog",
      joinCommunity: "Join our community",
    },
    es: {
      title: "Posts Semanales",
      description: "Últimos insights y estrategias para el éxito de startups",
      readMore: "Leer más en nuestro blog",
      joinCommunity: "Únete a nuestra comunidad",
    },
  }

  const t = content[language]

  useEffect(() => {
    // Aquí puedes cargar los posts desde donde los estés manejando ahora
    // Por ejemplo, podrías tenerlos en un archivo JSON o en el estado de la aplicación
    setPosts([
      {
        id: 1,
        title: "How to Validate Your Startup Idea",
        content: "Learn the essential steps to validate your startup idea before investing time and resources...",
        createdAt: new Date().toISOString(),
      },
      {
        id: 2,
        title: "Securing Your First Investment",
        content: "Discover the key strategies for attracting and securing your first startup investment...",
        createdAt: new Date().toISOString(),
      },
    ])
  }, [])

  return (
    <section className="py-24 bg-gray-50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-primary mb-4">{t.title}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t.description}</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {posts.map((post) => (
            <Card key={post.id} className="bg-white hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</span>
                  <TrendingUp className="h-5 w-5 text-secondary-500" />
                </div>
                <CardTitle className="text-xl font-bold text-primary-900 mb-2">{post.title}</CardTitle>
                <p className="text-gray-600">{post.content.substring(0, 150)}...</p>
              </CardHeader>
              <CardContent>
                <Link href="/blog-podcast" className="text-secondary-600 hover:text-secondary-700 font-medium">
                  Read more →
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="flex justify-center gap-4 mt-12">
          <Button asChild variant="outline" className="rounded-full">
            <Link href="/blog-podcast">{t.readMore}</Link>
          </Button>
          <Button asChild className="bg-blue-600 text-white hover:bg-blue-700 rounded-full">
            <Link href="/register">{t.joinCommunity}</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

