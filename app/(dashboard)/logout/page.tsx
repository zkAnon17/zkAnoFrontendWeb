"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { TerminalCard } from "@/components/terminal-card"
import { LogOut, Shield } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function LogoutPage() {
  const router = useRouter()

  useEffect(() => {
    // Clear session
    localStorage.removeItem("zkano_session")
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <TerminalCard className="max-w-md text-center">
        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
          <LogOut className="w-8 h-8 text-primary" />
        </div>

        <h1 className="text-2xl font-bold font-mono mb-3">You have been logged out</h1>

        <p className="text-muted-foreground font-mono text-sm mb-6">
          Your private keys stay on your device. Your session has been cleared securely.
        </p>

        <div className="flex items-center gap-2 justify-center mb-6 p-3 rounded-lg bg-secondary/10 border border-secondary/30">
          <Shield className="w-5 h-5 text-secondary" />
          <span className="text-sm font-mono text-secondary">All data encrypted and secure</span>
        </div>

        <div className="space-y-3">
          <Link href="/" className="block">
            <Button className="w-full bg-primary hover:bg-primary/90 font-mono">Back to Landing</Button>
          </Link>
          <Link href="/auth" className="block">
            <Button variant="outline" className="w-full border-border font-mono bg-transparent">
              Login Again
            </Button>
          </Link>
        </div>
      </TerminalCard>
    </div>
  )
}
