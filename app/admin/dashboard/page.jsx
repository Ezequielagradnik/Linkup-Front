"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from "@/components/ui/table"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AdminDashboard() {
  const [applications, setApplications] = useState([])
  const [selectedApplication, setSelectedApplication] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true)
        setError(null)

        if (!user?.token) {
          throw new Error("No authentication token found")
        }

        const response = await fetch("/api/admin/applications", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || "Failed to fetch applications")
        }

        const data = await response.json()
        console.log("Fetched applications:", data)
        setApplications(data)
      } catch (error) {
        console.error("Error fetching applications:", error)
        setError(error.message)
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    // Only fetch if user is admin and we have completed auth loading
    if (!authLoading && user?.isAdmin) {
      fetchApplications()
    } else if (!authLoading && user && !user.isAdmin) {
      router.push("/")
    }
  }, [user, authLoading, router]) // Added router to dependencies

  const handleStatusChange = async (id, status) => {
    try {
      if (!user?.token) {
        throw new Error("No authentication token found")
      }

      const response = await fetch(`/api/admin/applications/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ status }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to update status")
      }

      // Update local state
      setApplications((prevApplications) => prevApplications.map((app) => (app.id === id ? { ...app, status } : app)))

      toast({
        title: "Success",
        description: "Application status updated successfully",
      })
    } catch (error) {
      console.error("Error updating status:", error)
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  // Add this helper function for status badge variants
  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case "accepted":
        return "success"
      case "rejected":
        return "destructive"
      default:
        return "default"
    }
  }

  // Show loading state while checking authentication
  if (authLoading) {
    return (
      <div className="container mx-auto py-8 px-4 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Checking authentication...</span>
      </div>
    )
  }

  // Show nothing while redirecting non-admin users
  if (!user?.isAdmin) {
    return null
  }

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading applications...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h2 className="text-lg font-semibold text-red-800">Error</h2>
          <p className="text-red-600">{error}</p>
          <Button className="mt-4" variant="outline" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Admin Dashboard</h1>
      {applications.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No applications found</p>
        </div>
      ) : (
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
                    {app.linkedinProfile && (
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
                    )}
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
                    {app.customersDetails && (
                      <p>
                        <strong className="text-gray-700">Customers Details:</strong> {app.customersDetails}
                      </p>
                    )}
                  </TableCell>
                  <TableCell className="align-top p-4 space-y-2">
                    {app.links && (
                      <p>
                        <strong className="text-gray-700">Links:</strong> {app.links}
                      </p>
                    )}
                    {app.founderContact && (
                      <p>
                        <strong className="text-gray-700">Founder Contact:</strong> {app.founderContact}
                      </p>
                    )}
                    {app.whyJoinLinkUp && (
                      <p>
                        <strong className="text-gray-700">Why Join LinkUp:</strong> {app.whyJoinLinkUp}
                      </p>
                    )}
                    {app.howHeardAboutLinkUp && (
                      <p>
                        <strong className="text-gray-700">How Heard About LinkUp:</strong> {app.howHeardAboutLinkUp}
                      </p>
                    )}
                  </TableCell>
                  <TableCell className="align-top p-4">
                    <Badge variant={getStatusBadgeVariant(app.status)} className="px-3 py-1 text-sm">
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
                  
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Application Details</DialogTitle>
                            <DialogDescription>Full information for {app.startupName}</DialogDescription>
                          </DialogHeader>
                          <div className="grid grid-cols-2 gap-4">{/* Add your dialog content here */}</div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}

