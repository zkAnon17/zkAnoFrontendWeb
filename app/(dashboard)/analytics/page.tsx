"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { TerminalCard } from "@/components/terminal-card"
import { Activity, Users, TrendingUp, Database } from "lucide-react"
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export default function AnalyticsPage() {
  const txnData = [
    { month: "Jan", txns: 4200 },
    { month: "Feb", txns: 5800 },
    { month: "Mar", txns: 7200 },
    { month: "Apr", txns: 6500 },
    { month: "May", txns: 8900 },
    { month: "Jun", txns: 10200 },
  ]

  const liquidityData = [
    { day: "Mon", liquidity: 2.4 },
    { day: "Tue", liquidity: 2.8 },
    { day: "Wed", liquidity: 3.2 },
    { day: "Thu", liquidity: 2.9 },
    { day: "Fri", liquidity: 3.5 },
    { day: "Sat", liquidity: 3.8 },
    { day: "Sun", liquidity: 4.2 },
  ]

  const nodes = [
    { id: 1, name: "Node-US-East", status: "Online", uptime: "99.9%", txns: "12.4K" },
    { id: 2, name: "Node-EU-West", status: "Online", uptime: "99.8%", txns: "10.2K" },
    { id: 3, name: "Node-Asia-Pacific", status: "Online", uptime: "99.7%", txns: "8.9K" },
  ]

  return (
    <div>
      <DashboardHeader title="Anolytic" />

      <div className="p-6 space-y-6">
        <div>
          <h2 className="text-2xl font-bold font-mono mb-2">ZK-Aggregated Analytics</h2>
          <p className="text-muted-foreground font-mono text-sm">
            All analytics are zk-aggregated. No public wallets are shown.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <TerminalCard>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-mono mb-1">Total Anonymized Txns</p>
                <p className="text-2xl font-bold font-mono text-primary">247.5K</p>
              </div>
              <Activity className="w-8 h-8 text-primary/30" />
            </div>
          </TerminalCard>

          <TerminalCard>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-mono mb-1">Active Users</p>
                <p className="text-2xl font-bold font-mono text-secondary">12.8K</p>
              </div>
              <Users className="w-8 h-8 text-secondary/30" />
            </div>
          </TerminalCard>

          <TerminalCard>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-mono mb-1">Total Liquidity</p>
                <p className="text-2xl font-bold font-mono text-primary">$4.2M</p>
              </div>
              <TrendingUp className="w-8 h-8 text-primary/30" />
            </div>
          </TerminalCard>

          <TerminalCard>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-mono mb-1">Active Nodes</p>
                <p className="text-2xl font-bold font-mono text-secondary">24</p>
              </div>
              <Database className="w-8 h-8 text-secondary/30" />
            </div>
          </TerminalCard>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TerminalCard>
            <h3 className="text-lg font-bold font-mono mb-4">Anonymized Transactions</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={txnData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A2A35" />
                <XAxis dataKey="month" stroke="#8B8B8B" style={{ fontFamily: "monospace" }} />
                <YAxis stroke="#8B8B8B" style={{ fontFamily: "monospace" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#14141A",
                    border: "1px solid #2A2A35",
                    fontFamily: "monospace",
                  }}
                />
                <Bar dataKey="txns" fill="#DE9D23" />
              </BarChart>
            </ResponsiveContainer>
          </TerminalCard>

          <TerminalCard>
            <h3 className="text-lg font-bold font-mono mb-4">Liquidity (7 Days)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={liquidityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A2A35" />
                <XAxis dataKey="day" stroke="#8B8B8B" style={{ fontFamily: "monospace" }} />
                <YAxis stroke="#8B8B8B" style={{ fontFamily: "monospace" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#14141A",
                    border: "1px solid #2A2A35",
                    fontFamily: "monospace",
                  }}
                />
                <Line type="monotone" dataKey="liquidity" stroke="#18FF9C" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </TerminalCard>
        </div>

        {/* Node Telemetry */}
        <TerminalCard>
          <h3 className="text-lg font-bold font-mono mb-4">Node Telemetry</h3>
          <div className="space-y-3">
            {nodes.map((node) => (
              <div
                key={node.id}
                className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border"
              >
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                  <div>
                    <p className="font-mono font-semibold">{node.name}</p>
                    <p className="text-sm text-muted-foreground font-mono">{node.status}</p>
                  </div>
                </div>
                <div className="flex gap-8 text-sm font-mono">
                  <div>
                    <p className="text-muted-foreground">Uptime</p>
                    <p className="text-secondary">{node.uptime}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Txns</p>
                    <p className="text-primary">{node.txns}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TerminalCard>
      </div>
    </div>
  )
}
