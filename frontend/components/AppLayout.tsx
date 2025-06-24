"use client"

import { usePathname } from "next/navigation"
import Header from "./Header"

interface AppLayoutProps {
  children: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname()
  const showHeader = pathname !== "/"

  return (
    <div className="min-h-screen">
      {showHeader && <Header />}
      {children}
    </div>
  )
} 