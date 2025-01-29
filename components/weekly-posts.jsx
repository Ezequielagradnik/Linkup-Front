"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Share2, MessageCircle, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useAuth } from "@/contexts/AuthContext"

export function WeeklyPosts({ language }) {
  const [posts, setPosts] = useState([])
  const [comments, setComments] = useState({})
  const [newComments, setNewComments] = useState({})
  const { user } = useAuth()

  const content = {
    en: {
      title: "Weekly Posts",
      description: "Latest insights and strategies for startup success",
      readMore: "Read more in our blog",
      joinCommunity: "Join our community",
      commentPlaceholder: "Write a comment...",
      postComment: "Post",
      loginToComment: "Login to comment",
    },
    es: {
      title: "Posts Semanales",
      description: "Últimos insights y estrategias para el éxito de startups",
      readMore: "Leer más en nuestro blog",
      joinCommunity: "Únete a nuestra comunidad",
      commentPlaceholder: "Escribe un comentario...",
      postComment: "Publicar",
      loginToComment: "Inicia sesión para comentar",
    },
  }

  const t = content[language]

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/blogs")
      if (!response.ok) throw new Error("Failed to fetch posts")
      const data = await response.json()
      setPosts(data)
      data.forEach((post) => fetchComments(post.id))
    } catch (error) {
      console.error("Error fetching posts:", error)
      // Set some default posts if the API fails
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
    }
  }

  const fetchComments = async (blogId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/comments/blog/${blogId}`)
      if (!response.ok) throw new Error("Failed to fetch comments")
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
                <div className="space-y-4">
                  <div className="flex items-center justify-between mt-6">
                    <div className="flex items-center gap-4">
                      <Button variant="ghost" size="sm" className="flex items-center gap-2 rounded-full">
                        <MessageCircle className="h-4 w-4" />
                        <span>Comment</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="flex items-center gap-2 rounded-full">
                        <Share2 className="h-4 w-4" />
                        <span>Share</span>
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
                          className="rounded-full"
                        />
                        <Button onClick={() => handleCommentSubmit(post.id)} className="rounded-full">
                          {t.postComment}
                        </Button>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">{t.loginToComment}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    {comments[post.id]?.map((comment) => (
                      <div key={comment.id} className="bg-gray-50 p-2 rounded-full">
                        <p className="text-sm font-semibold">{comment.User?.username}</p>
                        <p className="text-sm">{comment.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
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

