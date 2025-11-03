"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { TerminalCard } from "@/components/terminal-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowDownUp, Shield, Info, Settings, ArrowRight } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function SwapPage() {
  const [tokenA, setTokenA] = useState("sol")
  const [tokenB, setTokenB] = useState("usdc")
  const [amountA, setAmountA] = useState("")
  const [slippage, setSlippage] = useState("0.5")
  const [showConfirm, setShowConfirm] = useState(false)
  const { toast } = useToast()

  const handleExecuteSwap = () => {
    if (!amountA || Number.parseFloat(amountA) <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid amount to swap",
        variant: "destructive",
      })
      return
    }
    setShowConfirm(true)
  }

  const confirmSwap = () => {
    toast({
      title: "Processing Swap",
      description: `Encrypting swap transaction...`,
    })

    setTimeout(() => {
      const txHash = `zkano_swap_${Math.random().toString(36).substring(2, 15)}`
      toast({
        title: "Swap Successful",
        description: (
          <div className="space-y-2">
            <p>
              Swapped {amountA} {tokenA.toUpperCase()} for {(Number.parseFloat(amountA) * 180).toFixed(2)}{" "}
              {tokenB.toUpperCase()}
            </p>
            <div className="text-xs space-y-1">
              <p className="font-semibold">Transaction Hash:</p>
              <p className="break-all bg-muted/50 p-2 rounded">{txHash}</p>
              <a href={`/anoscan?tx=${txHash}`} className="text-primary hover:underline inline-flex items-center gap-1">
                View on AnoScan →
              </a>
            </div>
          </div>
        ),
        duration: 10000,
      })
      setAmountA("")
      setShowConfirm(false)
    }, 2500)
  }

  const recentSwaps = [
    { id: 1, from: "2.5 SOL", to: "450 USDC", hash: "hash_zka403_a7f2e9", time: "5m ago" },
    { id: 2, from: "1.8 ETH", to: "3200 USDC", hash: "hash_zka403_b3d8c1", time: "1h ago" },
    { id: 3, from: "500 USDC", to: "2.7 SOL", hash: "hash_zka403_e9f4a2", time: "3h ago" },
  ]

  return (
    <div>
      <DashboardHeader title="AnoSwap" />

      <div className="p-6 space-y-6">
        <div>
          <h2 className="text-2xl font-bold font-mono mb-2">Private DEX Aggregator</h2>
          <p className="text-muted-foreground font-mono text-sm">Swap tokens privately with obfuscated routing</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {/* From Card */}
          <TerminalCard>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold font-mono">From</h3>
                <Shield className="w-5 h-5 text-primary" />
              </div>

              <div className="space-y-2">
                <Label className="font-mono text-sm">Token</Label>
                <Select value={tokenA} onValueChange={setTokenA}>
                  <SelectTrigger className="w-full font-mono bg-input border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sol">SOL</SelectItem>
                    <SelectItem value="eth">ETH</SelectItem>
                    <SelectItem value="usdc">USDC</SelectItem>
                    <SelectItem value="usdt">USDT</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="font-mono text-sm">Amount</Label>
                <Input
                  type="number"
                  value={amountA}
                  onChange={(e) => setAmountA(e.target.value)}
                  placeholder="0.00"
                  className="font-mono bg-input border-border text-lg"
                />
                <p className="text-xs text-muted-foreground font-mono">Balance: 2.45 SOL</p>
              </div>

              <div className="p-3 rounded-lg bg-muted/30 border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <Info className="w-4 h-4 text-primary" />
                  <p className="text-xs font-mono font-semibold">Settings</p>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full h-8 font-mono text-xs border-border bg-transparent"
                    >
                      <Settings className="w-3 h-3 mr-1" />
                      Slippage: {slippage}%
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-card border-border">
                    <DialogHeader>
                      <DialogTitle className="font-mono">Slippage Settings</DialogTitle>
                      <DialogDescription className="font-mono">Set your maximum slippage tolerance</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="flex gap-2">
                        {["0.1", "0.5", "1.0", "2.0"].map((value) => (
                          <Button
                            key={value}
                            onClick={() => setSlippage(value)}
                            variant={slippage === value ? "default" : "outline"}
                            className="flex-1 font-mono"
                          >
                            {value}%
                          </Button>
                        ))}
                      </div>
                      <div className="space-y-2">
                        <Label className="font-mono">Custom Slippage (%)</Label>
                        <Input
                          type="number"
                          step="0.1"
                          value={slippage}
                          onChange={(e) => setSlippage(e.target.value)}
                          className="font-mono bg-input border-border"
                        />
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </TerminalCard>

          {/* To Card */}
          <TerminalCard>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold font-mono">To</h3>
                <ArrowRight className="w-5 h-5 text-primary" />
              </div>

              <div className="space-y-2">
                <Label className="font-mono text-sm">Token</Label>
                <Select value={tokenB} onValueChange={setTokenB}>
                  <SelectTrigger className="w-full font-mono bg-input border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usdc">USDC</SelectItem>
                    <SelectItem value="usdt">USDT</SelectItem>
                    <SelectItem value="sol">SOL</SelectItem>
                    <SelectItem value="eth">ETH</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="font-mono text-sm">You Receive</Label>
                <Input
                  type="number"
                  value={amountA ? (Number.parseFloat(amountA) * 180).toFixed(2) : ""}
                  readOnly
                  placeholder="0.00"
                  className="font-mono bg-input border-border text-lg"
                />
              </div>

              <div className="p-3 rounded-lg bg-muted/30 border border-border space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  <Info className="w-4 h-4 text-primary" />
                  <p className="text-xs font-mono font-semibold">Route Info</p>
                </div>
                <div className="space-y-1 text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Rate</span>
                    <span>1 SOL = 180 USDC</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Privacy Fee</span>
                    <span className="text-primary">0.3%</span>
                  </div>
                  <p className="text-muted-foreground pt-1">Obfuscated route (zk-mixing)</p>
                </div>
              </div>

              <Button onClick={handleExecuteSwap} className="w-full bg-primary hover:bg-primary/90 font-mono" size="lg">
                <Shield className="w-5 h-5 mr-2" />
                Execute Private Swap
              </Button>
            </div>
          </TerminalCard>

          {showConfirm && (
            <TerminalCard className="border-primary/50">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold font-mono">Confirm Swap</h3>
                  <Shield className="w-5 h-5 text-secondary" />
                </div>

                <div className="p-4 rounded-lg bg-muted/30 border border-border space-y-3">
                  <div className="flex justify-between font-mono text-sm">
                    <span className="text-muted-foreground">From</span>
                    <span className="font-semibold">
                      {amountA} {tokenA.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex justify-center">
                    <ArrowDownUp className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex justify-between font-mono text-sm">
                    <span className="text-muted-foreground">To</span>
                    <span className="font-semibold">
                      {amountA ? (Number.parseFloat(amountA) * 180).toFixed(2) : "0"} {tokenB.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-muted/30 border border-border space-y-2 text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Slippage Tolerance</span>
                    <span>{slippage}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Privacy Fee</span>
                    <span className="text-primary">0.3%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Route</span>
                    <span className="text-primary">ZK-Mixed</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button
                    onClick={confirmSwap}
                    className="w-full bg-secondary hover:bg-secondary/90 font-mono"
                    size="lg"
                  >
                    Confirm Swap
                  </Button>
                  <Button
                    onClick={() => setShowConfirm(false)}
                    variant="outline"
                    className="w-full border-border font-mono"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </TerminalCard>
          )}
        </div>

        {/* Recent Swaps */}
        <TerminalCard>
          <h3 className="text-lg font-bold font-mono mb-4">Recent Swaps</h3>
          <div className="space-y-3">
            {recentSwaps.map((swap) => (
              <div
                key={swap.id}
                className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border"
              >
                <div>
                  <div className="flex items-center gap-2 font-mono">
                    <span className="font-semibold">{swap.from}</span>
                    <ArrowDownUp className="w-4 h-4 text-primary" />
                    <span className="font-semibold">{swap.to}</span>
                  </div>
                  <p className="text-xs text-muted-foreground font-mono mt-1">TxHash (masked): {swap.hash}</p>
                </div>
                <p className="text-sm text-muted-foreground font-mono">{swap.time}</p>
              </div>
            ))}
          </div>
        </TerminalCard>
      </div>
    </div>
  )
}
