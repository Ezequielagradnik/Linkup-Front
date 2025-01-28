"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/contexts/LanguageContext"
import { useAuth } from "@/contexts/AuthContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Share2, MessageCircle, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function BlogAndPodcast() {
  const { language } = useLanguage()
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("blog")
  const [posts, setPosts] = useState([])
  const [comments, setComments] = useState({})
  const [newComments, setNewComments] = useState({})

  const content = {
    en: {
      title: "Blog & Podcast",
      description: "Discover insights and stories from successful founders and industry experts",
      blogTab: "Blog Posts",
      podcastTab: "Podcast Episodes",
      readMore: "Read more",
      listenNow: "Listen now",
      comment: "Comment",
      share: "Share",
      commentPlaceholder: "Write a comment...",
      postComment: "Post",
      loginToComment: "Login to comment",
      podcastEpisodes: [
        {
          title: "From Idea to IPO: A Founder's Journey",
          guest: "Jane Doe, CEO of TechRevolution",
          duration: "45 min",
          description: "An inspiring conversation about the challenges and triumphs of building a successful startup.",
        },
        {
          title: "Mastering Product-Market Fit",
          guest: "John Smith, Founder of FitFinder",
          duration: "38 min",
          description: "Learn how to validate your product and find your perfect market fit.",
        },
      ],
    },
    es: {
      title: "Blog y Podcast",
      description: "Descubre ideas e historias de fundadores exitosos y expertos de la industria",
      blogTab: "Entradas del Blog",
      podcastTab: "Episodios del Podcast",
      readMore: "Leer más",
      listenNow: "Escuchar ahora",
      comment: "Comentar",
      share: "Compartir",
      commentPlaceholder: "Escribe un comentario...",
      postComment: "Publicar",
      loginToComment: "Inicia sesión para comentar",
      podcastEpisodes: [
        {
          title: "De la Idea a la OPI: El Viaje de un Fundador",
          guest: "Jane Doe, CEO de TechRevolution",
          duration: "45 min",
          description: "Una conversación inspiradora sobre los desafíos y triunfos de construir una startup exitosa.",
        },
        {
          title: "Dominando el Product-Market Fit",
          guest: "John Smith, Fundador de FitFinder",
          duration: "38 min",
          description: "Aprende cómo validar tu producto y encontrar tu ajuste perfecto al mercado.",
        },
      ],
    },
  }

  const t = content[language]

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/blogs")
      const data = await response.json()
      setPosts(data)
      data.forEach((post) => fetchComments(post.id))
    } catch (error) {
      console.error("Error fetching posts:", error)
    }
  }

  const fetchComments = async (blogId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/comments/blog/${blogId}`)
      const data = await response.json()
      setComments((prev) => ({ ...prev, [blogId]: data }))
    } catch (error) {
      console.error("Error fetching comments:", error)
    }
  }

  const handleCommentSubmit = async (blogId) => {
    if (!user) return
    try {
      const response = await fetch("http://localhost:5000/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ content: newComments[blogId], blogId }),
      })
      const data = await response.json()
      setComments((prev) => ({
        ...prev,
        [blogId]: [data, ...(prev[blogId] || [])],
      }))
      setNewComments((prev) => ({ ...prev, [blogId]: "" }))
    } catch (error) {
      console.error("Error posting comment:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-primary-900 mb-4 text-center">{t.title}</h1>
        <p className="text-center text-gray-600 mb-8">{t.description}</p>

        <div className="flex justify-center mb-8">
          <Button
            onClick={() => setActiveTab("blog")}
            variant={activeTab === "blog" ? "secondary" : "outline"}
            className="mr-2"
          >
            {t.blogTab}
          </Button>
          <Button onClick={() => setActiveTab("podcast")} variant={activeTab === "podcast" ? "secondary" : "outline"}>
            {t.podcastTab}
          </Button>
        </div>

        {activeTab === "blog" && (
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
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mt-6">
                      <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" className="flex items-center gap-2">
                          <MessageCircle className="h-4 w-4" />
                          <span>{t.comment}</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="flex items-center gap-2">
                          <Share2 className="h-4 w-4" />
                          <span>{t.share}</span>
                        </Button>
                      </div>
                    </div>
                    <div className="mt-4">
                      {user ? (
                        <div className="flex gap-2">
                          <Input
                            placeholder={t.commentPlaceholder}
                            value={newComments[post.id] || ""}
                            onChange={(e) => setNewComments((prev) => ({ ...prev, [post.id]: e.target.value }))}
                          />
                          <Button onClick={() => handleCommentSubmit(post.id)}>{t.postComment}</Button>
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500">{t.loginToComment}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      {comments[post.id]?.map((comment) => (
                        <div key={comment.id} className="bg-gray-50 p-2 rounded">
                          <p className="text-sm font-semibold">{comment.User.username}</p>
                          <p className="text-sm">{comment.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === "podcast" && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.podcastEpisodes.map((episode, index) => (
              <Card key={index} className="bg-white hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <Button className="rounded-full bg-secondary-500 p-3 text-white transition-transform hover:scale-110">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6"
                      >
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                      </svg>
                    </Button>
                    <div className="flex items-center text-gray-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4 mr-1"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      <span className="text-sm">{episode.duration}</span>
                    </div>
                  </div>
                  <CardTitle className="text-xl text-primary-900 group-hover:text-secondary-600 transition-colors">
                    {episode.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{episode.description}</p>
                  <div className="flex items-center text-secondary-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4 mr-2"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    <span className="text-sm font-medium">{episode.guest}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

