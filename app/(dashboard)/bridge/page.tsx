"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { TerminalCard } from "@/components/terminal-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight, Shield, CheckCircle2, Loader2 } from "lucide-react"

export default function BridgePage() {
  const [fromChain, setFromChain] = useState("solana")
  const [toChain, setToChain] = useState("ethereum")
  const [amount, setAmount] = useState("")
  const [step, setStep] = useState(0)

  const history = [
    {
      id: 1,
      from: "Solana",
      to: "Ethereum",
      amount: "2.5 SOL",
      hash: "hash_zka403_a7f2e9",
      status: "Complete",
      time: "2h ago",
    },
    {
      id: 2,
      from: "Ethereum",
      to: "Polygon",
      amount: "0.8 ETH",
      hash: "hash_zka403_b3d8c1",
      status: "Complete",
      time: "1d ago",
    },
    {
      id: 3,
      from: "Polygon",
      to: "Solana",
      amount: "150 USDC",
      hash: "hash_zka403_e9f4a2",
      status: "Complete",
      time: "3d ago",
    },
  ]

  const steps = [
    { label: "Build zk-proof", status: step > 0 ? "complete" : step === 0 ? "active" : "pending" },
    { label: "Send masked txn", status: step > 1 ? "complete" : step === 1 ? "active" : "pending" },
    { label: "Confirm on destination", status: step > 2 ? "complete" : step === 2 ? "active" : "pending" },
  ]

  return (
    <div>
      <DashboardHeader title="AnoBridge" />

      <div className="p-6 space-y-6">
        <div>
          <h2 className="text-2xl font-bold font-mono mb-2">Private Cross-Chain Bridge</h2>
          <p className="text-muted-foreground font-mono text-sm">
            Transfer assets across chains without revealing your identity
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bridge Form - Left Side */}
          <TerminalCard>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="font-mono">From Chain</Label>
                  <Select value={fromChain} onValueChange={setFromChain}>
                    <SelectTrigger className="font-mono bg-input border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="solana">Solana</SelectItem>
                      <SelectItem value="ethereum">Ethereum</SelectItem>
                      <SelectItem value="polygon">Polygon</SelectItem>
                      <SelectItem value="bsc">BSC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="font-mono">To Chain</Label>
                  <Select value={toChain} onValueChange={setToChain}>
                    <SelectTrigger className="font-mono bg-input border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ethereum">Ethereum</SelectItem>
                      <SelectItem value="solana">Solana</SelectItem>
                      <SelectItem value="polygon">Polygon</SelectItem>
                      <SelectItem value="bsc">BSC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="font-mono">Asset</Label>
                <Select defaultValue="sol">
                  <SelectTrigger className="font-mono bg-input border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sol">SOL</SelectItem>
                    <SelectItem value="eth">ETH</SelectItem>
                    <SelectItem value="usdc">USDC</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="font-mono">Amount</Label>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="font-mono bg-input border-border text-lg"
                />
              </div>

              <Button className="w-full bg-primary hover:bg-primary/90 font-mono" size="lg" onClick={() => setStep(1)}>
                <Shield className="w-5 h-5 mr-2" />
                Execute Private Bridge
              </Button>
            </div>
          </TerminalCard>

          {/* Bridge Progress - Right Side */}
          <TerminalCard>
            <h3 className="text-lg font-bold font-mono mb-4">Bridge Progress</h3>
            {step === 0 ? (
              <div className="flex items-center justify-center h-64 text-muted-foreground font-mono text-sm">
                Waiting for bridge transaction...
              </div>
            ) : (
              <div className="space-y-4">
                {steps.map((s, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        s.status === "complete"
                          ? "bg-secondary/20"
                          : s.status === "active"
                            ? "bg-primary/20"
                            : "bg-muted/30"
                      }`}
                    >
                      {s.status === "complete" ? (
                        <CheckCircle2 className="w-5 h-5 text-secondary" />
                      ) : s.status === "active" ? (
                        <Loader2 className="w-5 h-5 text-primary animate-spin" />
                      ) : (
                        <span className="text-muted-foreground font-mono">{index + 1}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-mono font-semibold">{s.label}</p>
                      <p className="text-sm text-muted-foreground font-mono">
                        {s.status === "complete" ? "Completed" : s.status === "active" ? "In progress..." : "Waiting"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TerminalCard>
        </div>

        {/* History */}
        <TerminalCard>
          <h3 className="text-lg font-bold font-mono mb-4">Bridge History</h3>
          <div className="space-y-3">
            {history.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border"
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 font-mono text-sm">
                    <span>{item.from}</span>
                    <ArrowRight className="w-4 h-4 text-primary" />
                    <span>{item.to}</span>
                  </div>
                  <div>
                    <p className="font-mono font-semibold">{item.amount}</p>
                    <p className="text-xs text-muted-foreground font-mono">{item.hash}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono px-2 py-1 rounded bg-secondary/20 text-secondary">
                    {item.status}
                  </span>
                  <p className="text-xs text-muted-foreground font-mono mt-1">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </TerminalCard>
      </div>
    </div>
  )
}
