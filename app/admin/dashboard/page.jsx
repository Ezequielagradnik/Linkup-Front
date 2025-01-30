"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Table, TableBody, TableCell, TableHead, TableRow, TableHeader } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

export default function AdminDashboard() {
  const [applications, setApplications] = useState([])
  const [selectedApplication, setSelectedApplication] = useState(null)
  const router = useRouter()
  const { user } = useAuth()

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem("token")
        const response = await fetch("/api/admin/applications", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        if (response.ok) {
          const data = await response.json()
          setApplications(data)
        }
      } catch (error) {
        console.error("Error fetching applications:", error)
      }
    }

    if (user && user.isAdmin) {
      fetchApplications()
    } else {
      router.push("/")
    }
  }, [user, router])

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
        setApplications(applications.map((app) => (app.id === id ? { ...app, status: newStatus } : app)))
      }
    } catch (error) {
      console.error("Error updating application status:", error)
    }
  }

  if (!user || !user.isAdmin) {
    return null
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Admin Dashboard</h1>
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="py-4 font-semibold text-gray-900">Personal Info</TableHead>
              <TableHead className="py-4 font-semibold text-gray-900">Startup Info</TableHead>
              <TableHead className="py-4 font-semibold text-gray-900">Investment & Customers</TableHead>
              <TableHead className="py-4 font-semibold text-gray-900">Additional Info</TableHead>
              <TableHead className="py-4 font-semibold text-gray-900">Status</TableHead>
              <TableHead className="py-4 font-semibold text-gray-900">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.map((app) => (
              <TableRow key={app.id} className="hover:bg-gray-50">
                <TableCell className="align-top p-4 space-y-2">
                  <p>
                    <strong className="text-gray-700">Name:</strong> {`${app.firstName} ${app.lastName}`}
                  </p>
                  <p>
                    <strong className="text-gray-700">Email:</strong> {app.email}
                  </p>
                  <p>
                    <strong className="text-gray-700">LinkedIn:</strong>{" "}
                    <a
                      href={app.linkedinProfile}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      {app.linkedinProfile}
                    </a>
                  </p>
                </TableCell>
                <TableCell className="align-top p-4 space-y-2">
                  <p>
                    <strong className="text-gray-700">Name:</strong> {app.startupName}
                  </p>
                  <p>
                    <strong className="text-gray-700">Description:</strong> {app.shortDescription}
                  </p>
                  <p>
                    <strong className="text-gray-700">Problem Solved:</strong> {app.problemSolved}
                  </p>
                  <p>
                    <strong className="text-gray-700">Sector:</strong> {app.sector}
                  </p>
                  <p>
                    <strong className="text-gray-700">Stage:</strong> {app.stage}
                  </p>
                </TableCell>
                <TableCell className="align-top p-4 space-y-2">
                  <p>
                    <strong className="text-gray-700">Has Investment:</strong> {app.hasInvestment ? "Yes" : "No"}
                  </p>
                  <p>
                    <strong className="text-gray-700">Seeking Investment:</strong>{" "}
                    {app.seekingInvestment ? "Yes" : "No"}
                  </p>
                  <p>
                    <strong className="text-gray-700">Has Customers:</strong> {app.hasCustomers ? "Yes" : "No"}
                  </p>
                  <p>
                    <strong className="text-gray-700">Customers Details:</strong> {app.customersDetails}
                  </p>
                </TableCell>
                <TableCell className="align-top p-4 space-y-2">
                  <p>
                    <strong className="text-gray-700">Links:</strong> {app.links}
                  </p>
                  <p>
                    <strong className="text-gray-700">Founder Contact:</strong> {app.founderContact}
                  </p>
                  <p>
                    <strong className="text-gray-700">Why Join LinkUp:</strong> {app.whyJoinLinkUp}
                  </p>
                  <p>
                    <strong className="text-gray-700">How Heard About LinkUp:</strong> {app.howHeardAboutLinkUp}
                  </p>
                </TableCell>
                <TableCell className="align-top p-4">
                  <Badge
                    variant={
                      app.status === "accepted" ? "success" : app.status === "rejected" ? "destructive" : "default"
                    }
                    className="px-3 py-1 text-sm"
                  >
                    {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className="align-top p-4">
                  <div className="flex flex-col space-y-3">
                    <Select value={app.status} onValueChange={(value) => handleStatusChange(app.id, value)}>
                      <SelectTrigger className="w-[130px]">
                        <SelectValue placeholder="Change status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="accepted">Accepted</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" onClick={() => setSelectedApplication(app)}>
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Application Details</DialogTitle>
                          <DialogDescription>Full information for {app.startupName}</DialogDescription>
                        </DialogHeader>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h3 className="font-semibold">Personal Information</h3>
                            <p>Name: {`${app.firstName} ${app.lastName}`}</p>
                            <p>Email: {app.email}</p>
                            <p>LinkedIn: {app.linkedinProfile}</p>
                          </div>
                          <div>
                            <h3 className="font-semibold">Startup Information</h3>
                            <p>Name: {app.startupName}</p>
                            <p>Description: {app.shortDescription}</p>
                            <p>Problem Solved: {app.problemSolved}</p>
                            <p>Sector: {app.sector}</p>
                            <p>Stage: {app.stage}</p>
                          </div>
                          <div>
                            <h3 className="font-semibold">Investment & Customers</h3>
                            <p>Has Investment: {app.hasInvestment ? "Yes" : "No"}</p>
                            <p>Seeking Investment: {app.seekingInvestment ? "Yes" : "No"}</p>
                            <p>Has Customers: {app.hasCustomers ? "Yes" : "No"}</p>
                            <p>Customers Details: {app.customersDetails}</p>
                          </div>
                          <div>
                            <h3 className="font-semibold">Additional Information</h3>
                            <p>Links: {app.links}</p>
                            <p>Founder Contact: {app.founderContact}</p>
                            <p>Why Join LinkUp: {app.whyJoinLinkUp}</p>
                            <p>How Heard About LinkUp: {app.howHeardAboutLinkUp}</p>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

