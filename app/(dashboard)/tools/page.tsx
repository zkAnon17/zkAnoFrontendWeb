"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { TerminalCard } from "@/components/terminal-card"
import { Button } from "@/components/ui/button"
import { Scan, TrendingUp, TrendingDown, Activity, Zap } from "lucide-react"

export default function ToolsPage() {
  const tools = [
    {
      icon: Scan,
      name: "AI Market Scan",
      description: "Analyze market trends with AI-powered insights",
      status: "Ready",
      color: "primary",
    },
    {
      icon: Activity,
      name: "Volume Spike Detector",
      description: "Real-time detection of unusual trading volume",
      status: "Scanning",
      color: "secondary",
    },
    {
      icon: TrendingUp,
      name: "Bullish Signal",
      description: "Identify bullish patterns and opportunities",
      status: "Ready",
      color: "secondary",
    },
    {
      icon: TrendingDown,
      name: "Bearish Signal",
      description: "Detect bearish trends and risk indicators",
      status: "Ready",
      color: "primary",
    },
  ]

  return (
    <div>
      <DashboardHeader title="AnoTools" />

      <div className="p-6 space-y-6">
        <div>
          <h2 className="text-2xl font-bold font-mono mb-2">AI Market Analyzer & Signals</h2>
          <p className="text-muted-foreground font-mono text-sm">
            Private market analysis tools powered by zero-knowledge AI
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tools.map((tool) => (
            <TerminalCard key={tool.name} className="hover:border-primary/50 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    tool.color === "primary" ? "bg-primary/20" : "bg-secondary/20"
                  }`}
                >
                  <tool.icon className={`w-6 h-6 ${tool.color === "primary" ? "text-primary" : "text-secondary"}`} />
                </div>
                <span
                  className={`text-xs font-mono px-2 py-1 rounded ${
                    tool.status === "Scanning" ? "bg-secondary/20 text-secondary" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {tool.status}
                </span>
              </div>
              <h3 className="text-xl font-bold font-mono mb-2">{tool.name}</h3>
              <p className="text-muted-foreground text-sm mb-4">{tool.description}</p>
              <Button className="w-full bg-primary hover:bg-primary/90 font-mono">
                <Zap className="w-4 h-4 mr-2" />
                Run in Private Mode
              </Button>
            </TerminalCard>
          ))}
        </div>

        {/* Recent Signals */}
        <TerminalCard>
          <h3 className="text-lg font-bold font-mono mb-4">Recent Signals</h3>
          <div className="space-y-3">
            {[
              { token: "SOL", signal: "Bullish", confidence: "92%", time: "5m ago" },
              { token: "ETH", signal: "Volume Spike", confidence: "87%", time: "12m ago" },
              { token: "BTC", signal: "Bearish", confidence: "78%", time: "25m ago" },
            ].map((signal, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      signal.signal === "Bullish"
                        ? "bg-secondary"
                        : signal.signal === "Volume Spike"
                          ? "bg-primary"
                          : "bg-destructive"
                    } animate-pulse`}
                  />
                  <div>
                    <p className="font-mono font-semibold">{signal.token}</p>
                    <p className="text-sm text-muted-foreground font-mono">
                      {signal.signal} • {signal.time}
                    </p>
                  </div>
                </div>
                <span className="text-sm font-mono text-primary">{signal.confidence}</span>
              </div>
            ))}
          </div>
        </TerminalCard>
      </div>
    </div>
  )
}
