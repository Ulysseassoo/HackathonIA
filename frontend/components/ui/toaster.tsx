"use client"

import { useEffect, useState } from "react"

interface Toast {
  id: string
  message: string
  type: "success" | "error" | "info"
}

export function Toaster() {
  const [toasts, setToasts] = useState<Toast[]>([])

  useEffect(() => {
    // Global toast function
    window.showToast = (message: string, type: "success" | "error" | "info" = "info") => {
      const id = Math.random().toString(36).substr(2, 9)
      setToasts(prev => [...prev, { id, message, type }])
      
      // Auto remove after 3 seconds
      setTimeout(() => {
        setToasts(prev => prev.filter(toast => toast.id !== id))
      }, 3000)
    }
  }, [])

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`px-4 py-2 rounded-md shadow-lg text-white ${
            toast.type === "success" ? "bg-green-500" :
            toast.type === "error" ? "bg-red-500" : "bg-blue-500"
          }`}
        >
          {toast.message}
        </div>
      ))}
    </div>
  )
}

declare global {
  interface Window {
    showToast: (message: string, type?: "success" | "error" | "info") => void
  }
} 