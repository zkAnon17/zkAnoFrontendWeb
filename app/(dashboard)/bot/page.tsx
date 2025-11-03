"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { TerminalCard } from "@/components/terminal-card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Bot, Play, Pause, TrendingUp, Activity } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export default function BotPage() {
  const [isRunning, setIsRunning] = useState(false)

  const pnlData = [
    { time: "00:00", pnl: 0 },
    { time: "04:00", pnl: 120 },
    { time: "08:00", pnl: 280 },
    { time: "12:00", pnl: 450 },
    { time: "16:00", pnl: 380 },
    { time: "20:00", pnl: 520 },
  ]

  const logs = [
    { time: "14:32:15", action: "BUY", pair: "SOL/USDC", amount: "2.5 SOL", status: "success" },
    { time: "14:28:42", action: "SELL", pair: "SOL/USDC", amount: "1.8 SOL", status: "success" },
    { time: "14:15:03", action: "BUY", pair: "SOL/USDC", amount: "3.2 SOL", status: "success" },
  ]

  return (
    <div>
      <DashboardHeader title="AnoBot" />

      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold font-mono mb-2">Private Trading Bot</h2>
            <p className="text-muted-foreground font-mono text-sm">
              All bot txns are routed through ZkA403 → obfuscated on-chain
            </p>
          </div>
          <Button
            onClick={() => setIsRunning(!isRunning)}
            className={isRunning ? "bg-destructive hover:bg-destructive/90" : "bg-secondary hover:bg-secondary/90"}
          >
            {isRunning ? (
              <>
                <Pause className="w-4 h-4 mr-2" />
                Stop Bot
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Start Bot
              </>
            )}
          </Button>
        </div>

        {/* Bot Configuration */}
        <TerminalCard>
          <h3 className="text-lg font-bold font-mono mb-4 flex items-center gap-2">
            <Bot className="w-5 h-5 text-primary" />
            Bot Configuration
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="font-mono">Token Pair</Label>
              <Select defaultValue="sol-usdc">
                <SelectTrigger className="font-mono bg-input border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sol-usdc">SOL/USDC</SelectItem>
                  <SelectItem value="eth-usdc">ETH/USDC</SelectItem>
                  <SelectItem value="btc-usdc">BTC/USDC</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="font-mono">Strategy</Label>
              <Select defaultValue="scalping">
                <SelectTrigger className="font-mono bg-input border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="scalping">Scalping</SelectItem>
                  <SelectItem value="swing">Swing Trading</SelectItem>
                  <SelectItem value="arbitrage">Arbitrage</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="font-mono">Interval</Label>
              <Select defaultValue="5m">
                <SelectTrigger className="font-mono bg-input border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1m">1 Minute</SelectItem>
                  <SelectItem value="5m">5 Minutes</SelectItem>
                  <SelectItem value="15m">15 Minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </TerminalCard>

        {/* PnL Chart */}
        <TerminalCard>
          <h3 className="text-lg font-bold font-mono mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-secondary" />
            Profit & Loss (24h)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={pnlData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2A2A35" />
              <XAxis dataKey="time" stroke="#8B8B8B" style={{ fontFamily: "monospace" }} />
              <YAxis stroke="#8B8B8B" style={{ fontFamily: "monospace" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#14141A",
                  border: "1px solid #2A2A35",
                  fontFamily: "monospace",
                }}
              />
              <Line type="monotone" dataKey="pnl" stroke="#18FF9C" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-4 text-center">
            <p className="text-3xl font-bold font-mono text-secondary">+$520.00</p>
            <p className="text-sm text-muted-foreground font-mono">Total PnL</p>
          </div>
        </TerminalCard>

        {/* Bot Logs */}
        <TerminalCard>
          <h3 className="text-lg font-bold font-mono mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            Bot Logs
          </h3>
          <div className="bg-black/50 rounded-lg p-4 font-mono text-sm space-y-2 max-h-64 overflow-y-auto">
            {logs.map((log, index) => (
              <div key={index} className="flex items-center gap-4">
                <span className="text-muted-foreground">[{log.time}]</span>
                <span className={log.action === "BUY" ? "text-secondary" : "text-primary"}>{log.action}</span>
                <span className="text-foreground">{log.pair}</span>
                <span className="text-muted-foreground">{log.amount}</span>
                <span className="text-secondary ml-auto">✓ {log.status}</span>
              </div>
            ))}
          </div>
        </TerminalCard>
      </div>
    </div>
  )
}
