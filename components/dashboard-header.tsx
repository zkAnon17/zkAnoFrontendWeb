"use client"

import { useEffect, useState } from "react"
import { Bell, Wallet, Shield, Search, PanelLeftClose, PanelLeft, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useZKano } from "@/hooks/use-zkano"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface DashboardHeaderProps {
  title: string
}

export function DashboardHeader({ title }: DashboardHeaderProps) {
  const [session, setSession] = useState<any>(null)
  const [privacyMode, setPrivacyMode] = useState(true)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [solBalance, setSolBalance] = useState<number | null>(null)
  const { getSolBalance } = useZKano()
  const [address, setAddress] = useState<string | null>(null)

  useEffect(() => {
    const sessionData = localStorage.getItem("zkano_session")
    if (sessionData) {
      const parsed = JSON.parse(sessionData)
      setSession(parsed)
      setAddress(parsed?.address || null)
    }

    // Read sidebar collapsed state
    const stored = localStorage.getItem("sidebar_collapsed")
    if (stored) {
      setIsCollapsed(JSON.parse(stored))
    }
  }, [])

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const addr = address || JSON.parse(localStorage.getItem("zkano_session") || "null")?.address
        if (!addr) return
        const bal = await getSolBalance(addr)
        setSolBalance((prev) => (prev === bal ? prev : bal))
        // keep session in localStorage in sync for other views, but avoid setSession loop
        const s = JSON.parse(localStorage.getItem("zkano_session") || "null") || {}
        const next = { ...s, address: s.address || addr, solBalance: bal }
        localStorage.setItem("zkano_session", JSON.stringify(next))
      } catch {}
    }
    fetchBalance()
    // Refresh every 30s
    const t = setInterval(fetchBalance, 30000)
    return () => clearInterval(t)
  }, [address, getSolBalance])

  const toggleSidebar = () => {
    const newState = !isCollapsed
    setIsCollapsed(newState)
    localStorage.setItem("sidebar_collapsed", JSON.stringify(newState))
    // Dispatch custom event for same-window updates
    window.dispatchEvent(new Event("sidebar-toggle"))
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <Button
            onClick={toggleSidebar}
            variant="ghost"
            size="icon"
            className="w-9 h-9 rounded-lg hover:bg-muted/50 transition-colors"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <PanelLeft className="w-5 h-5 text-muted-foreground" />
            ) : (
              <PanelLeftClose className="w-5 h-5 text-muted-foreground" />
            )}
          </Button>
          <h1 className="text-2xl font-bold font-mono">{title}</h1>
        </div>

        <div className="flex items-center gap-4">
          {/* Privacy Mode Toggle */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPrivacyMode(!privacyMode)}
            className="font-mono border-border"
          >
            <Shield className="w-4 h-4 mr-2" />
            Private Mode: {privacyMode ? "ON" : "OFF"}
          </Button>

          <Link href="/anoscan">
            <Button
              variant="outline"
              size="sm"
              className="font-mono border-primary/50 text-primary hover:bg-primary/10 bg-transparent shimmer-button relative"
            >
              <Search className="w-4 h-4 mr-2" />
              AnoScan
            </Button>
          </Link>

          {/* Download APK Button */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="font-mono border-green-500/50 text-green-500 hover:bg-green-500/10 bg-transparent"
              >
                <Download className="w-4 h-4 mr-2" />
                Download APK
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 font-mono">
              <DropdownMenuLabel>Mobile App Downloads</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <a
                  href="https://drive.google.com/uc?export=download&id=1GmZFYmBdUJr52BoSXtGFcZBo31YLvFHL"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center cursor-pointer"
                >
                  <Download className="w-4 h-4 mr-2" />
                  <div className="flex flex-col">
                    <span>Android APK</span>
                    <span className="text-xs text-muted-foreground">Latest v1.0.0</span>
                  </div>
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex items-center opacity-50">
                  <Download className="w-4 h-4 mr-2" />
                  <div className="flex flex-col">
                    <span>iOS App</span>
                    <span className="text-xs text-muted-foreground">Coming Soon</span>
                  </div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <a
                  href="https://github.com/zkAnon17/zkano-mobile/releases"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center cursor-pointer"
                >
                  <span className="text-xs">View all releases →</span>
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Wallet Balance */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="font-mono border-border bg-transparent">
                <Wallet className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">{solBalance == null ? "--" : `${solBalance.toFixed(4)} SOL`}</span>
                <span className="mx-2">|</span>
                <span className="hidden sm:inline">1,250 ZKANO</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 font-mono">
              <DropdownMenuLabel>Wallet Balance</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <div className="flex justify-between w-full">
                  <span>SOL</span>
                  <span className="text-primary">{solBalance == null ? "--" : solBalance.toFixed(6)}</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex justify-between w-full">
                  <span>ZKANO</span>
                  <span className="text-primary">1,250</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="relative border-border bg-transparent">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-secondary rounded-full text-[10px] flex items-center justify-center text-secondary-foreground">
                  3
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 font-mono">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <div className="space-y-1">
                  <p className="text-sm">New private transaction completed</p>
                  <p className="text-xs text-muted-foreground">2 minutes ago</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="space-y-1">
                  <p className="text-sm">AnoBot trade executed successfully</p>
                  <p className="text-xs text-muted-foreground">15 minutes ago</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="space-y-1">
                  <p className="text-sm">ZK-Proof verification complete</p>
                  <p className="text-xs text-muted-foreground">1 hour ago</p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Profile */}
          {session && (
            <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-muted/30 border border-border">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-primary font-bold text-sm font-mono">{(session.zk_id || session.zkId || "ZK").slice(0,2)}</span>
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-mono font-semibold">{session.username || "Anonymous"}</p>
                <p className="text-xs text-muted-foreground font-mono">{(session.zk_id || session.zkId || "").slice(0, 12)}...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ")
}
