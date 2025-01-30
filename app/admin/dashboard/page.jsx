"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/contexts/AuthContext"

export default function AdminDashboard() {
  const [applications, setApplications] = useState([])
  const router = useRouter()
  const { user } = useAuth()

  useEffect(() => {
    if (user && user.isAdmin) {
      fetchApplications()
    } else {
      router.push("/")
    }
  }, [user, router])

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        router.push("/login")
        return
      }

      const response = await fetch("/api/admin/applications", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setApplications(data)
      } else {
        throw new Error("Failed to fetch applications")
      }
    } catch (error) {
      console.error("Error fetching applications:", error)
      alert("An error occurred while fetching applications")
    }
  }

  const handleStatusChange = async (id, newStatus) => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`/api/admin/applications/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        fetchApplications()
      } else {
        throw new Error("Failed to update application status")
      }
    } catch (error) {
      console.error("Error updating application status:", error)
      alert("An error occurred while updating the application status")
    }
  }

  if (!user || !user.isAdmin) {
    return null
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Startup Name</TableHead>
            <TableHead>Stage</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.map((app) => (
            <TableRow key={app.id}>
              <TableCell>{`${app.firstName} ${app.lastName}`}</TableCell>
              <TableCell>{app.email}</TableCell>
              <TableCell>{app.startupName}</TableCell>
              <TableCell>{app.stage}</TableCell>
              <TableCell>{app.status}</TableCell>
              <TableCell>
                <Select value={app.status} onValueChange={(value) => handleStatusChange(app.id, value)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Change status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="accepted">Accepted</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

