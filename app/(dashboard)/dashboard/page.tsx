"use client"

import { useEffect, useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { TerminalCard } from "@/components/terminal-card"
import { Activity, TrendingUp, Shield, Zap } from "lucide-react"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const [session, setSession] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const sessionData = localStorage.getItem("zkano_session")
    if (!sessionData) {
      router.push("/auth")
      return
    }
    setSession(JSON.parse(sessionData))
  }, [router])

  if (!session) return null

  const recentTxns = [
    { hash: "hash_zka403_a7f2e9", type: "Swap", status: "Complete", time: "2m ago" },
    { hash: "hash_zka403_b3d8c1", type: "Transfer", status: "Complete", time: "15m ago" },
    { hash: "hash_zka403_e9f4a2", type: "Bridge", status: "Pending", time: "1h ago" },
  ]

  const activeModules = [
    { name: "AnoBot", status: "Active", color: "text-secondary" },
    { name: "AnoTools", status: "Scanning", color: "text-primary" },
    { name: "AnoChat", status: "Online", color: "text-secondary" },
  ]

  return (
    <div>
      <DashboardHeader title="Dashboard" />

      <div className="p-6 space-y-6">
        {/* Welcome Section */}
        <div className="space-y-2">
          <h2 className="text-3xl font-bold font-mono">
            Welcome back, <span className="text-primary">{session.zkId}</span>
          </h2>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-secondary" />
            <span className="text-secondary font-mono font-semibold">Private Mode: ON</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TerminalCard>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-mono mb-1">Total Transactions</p>
                <p className="text-3xl font-bold font-mono text-primary">247</p>
              </div>
              <Activity className="w-10 h-10 text-primary/30" />
            </div>
          </TerminalCard>

          <TerminalCard>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-mono mb-1">Privacy Score</p>
                <p className="text-3xl font-bold font-mono text-secondary">98%</p>
              </div>
              <Shield className="w-10 h-10 text-secondary/30" />
            </div>
          </TerminalCard>

          <TerminalCard>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-mono mb-1">Active Proofs</p>
                <p className="text-3xl font-bold font-mono text-primary">12</p>
              </div>
              <Zap className="w-10 h-10 text-primary/30" />
            </div>
          </TerminalCard>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Secret Transactions */}
          <TerminalCard>
            <h3 className="text-xl font-bold font-mono mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              Secret Transactions
            </h3>
            <div className="space-y-3">
              {recentTxns.map((txn) => (
                <div
                  key={txn.hash}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border"
                >
                  <div>
                    <p className="font-mono text-sm font-semibold">{txn.hash}</p>
                    <p className="text-xs text-muted-foreground font-mono">
                      {txn.type} • {txn.time}
                    </p>
                  </div>
                  <span
                    className={`text-xs font-mono px-2 py-1 rounded ${
                      txn.status === "Complete" ? "bg-secondary/20 text-secondary" : "bg-primary/20 text-primary"
                    }`}
                  >
                    {txn.status}
                  </span>
                </div>
              ))}
            </div>
          </TerminalCard>

          {/* Active Modules */}
          <TerminalCard>
            <h3 className="text-xl font-bold font-mono mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Active Modules
            </h3>
            <div className="space-y-3">
              {activeModules.map((module) => (
                <div
                  key={module.name}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-2 h-2 rounded-full ${module.color === "text-secondary" ? "bg-secondary" : "bg-primary"} animate-pulse`}
                    />
                    <span className="font-mono font-semibold">{module.name}</span>
                  </div>
                  <span className={`text-sm font-mono ${module.color}`}>{module.status}</span>
                </div>
              ))}
            </div>
          </TerminalCard>
        </div>

        {/* Data Flow Diagram */}
        <TerminalCard>
          <h3 className="text-xl font-bold font-mono mb-4">ZK Node Status</h3>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 font-mono">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-secondary animate-pulse" />
              <span className="text-secondary font-semibold">ONLINE</span>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="text-muted-foreground">User</span>
              <Zap className="w-5 h-5 text-primary" />
              <span className="text-muted-foreground">ZK-Ano</span>
              <Zap className="w-5 h-5 text-primary" />
              <span className="text-muted-foreground">On-Chain (hashed)</span>
            </div>
          </div>
        </TerminalCard>
      </div>
    </div>
  )
}
