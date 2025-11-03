import type React from "react"
import { cn } from "@/lib/utils"

interface TerminalCardProps {
  children: React.ReactNode
  className?: string
  glowColor?: "primary" | "secondary"
}

export function TerminalCard({ children, className, glowColor = "primary" }: TerminalCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 py-6",
        glowColor === "primary" && "shadow-[0_0_15px_rgba(222,157,35,0.1)]",
        glowColor === "secondary" && "shadow-[0_0_15px_rgba(24,255,156,0.1)]",
        className,
      )}
    >
      {children}
    </div>
  )
}
