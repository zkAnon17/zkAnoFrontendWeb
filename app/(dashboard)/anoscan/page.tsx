"use client"

import { useState, useEffect } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { TerminalCard } from "@/components/terminal-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Activity,
  Box,
  ArrowRightLeft,
  Clock,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Database,
  Zap,
  Shield,
  ExternalLink,
  Copy,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { motion, AnimatePresence } from "framer-motion"

export default function AnoScanPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const { toast } = useToast()

  const [networkStats, setNetworkStats] = useState({
    tps: 2847,
    blockHeight: 234567890,
    totalTransactions: 187.5,
    activeValidators: 1842,
    avgBlockTime: 0.4,
    totalStaked: 389.2,
  })

  const [animatedStats, setAnimatedStats] = useState({
    tps: 0,
    blockHeight: 0,
    totalTransactions: 0,
    activeValidators: 0,
    avgBlockTime: 0,
    totalStaked: 0,
  })

  const [prevStats, setPrevStats] = useState(networkStats)

  useEffect(() => {
    const duration = 1000 // 1 second for updates
    const steps = 30
    const interval = duration / steps

    let currentStep = 0
    const timer = setInterval(() => {
      currentStep++
      const progress = currentStep / steps

      setAnimatedStats({
        tps: Math.floor(prevStats.tps + (networkStats.tps - prevStats.tps) * progress),
        blockHeight: Math.floor(prevStats.blockHeight + (networkStats.blockHeight - prevStats.blockHeight) * progress),
        totalTransactions: Number.parseFloat(
          (
            prevStats.totalTransactions +
            (networkStats.totalTransactions - prevStats.totalTransactions) * progress
          ).toFixed(1),
        ),
        activeValidators: Math.floor(
          prevStats.activeValidators + (networkStats.activeValidators - prevStats.activeValidators) * progress,
        ),
        avgBlockTime: Number.parseFloat(
          (prevStats.avgBlockTime + (networkStats.avgBlockTime - prevStats.avgBlockTime) * progress).toFixed(1),
        ),
        totalStaked: Number.parseFloat(
          (prevStats.totalStaked + (networkStats.totalStaked - prevStats.totalStaked) * progress).toFixed(1),
        ),
      })

      if (currentStep >= steps) {
        clearInterval(timer)
        setPrevStats(networkStats)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [networkStats, prevStats])

  const initialTransactions = [
    {
      id: "tx-1",
      signature: "zk_5FHneW...x8K9mP",
      type: "Transfer",
      status: "Success",
      from: "AnoID_X9K2L4",
      to: "AnoID_P7M3N8",
      amount: "***.**",
      token: "SOL",
      time: "2s ago",
      fee: "0.000005",
      slot: "234567890",
      isNew: false,
    },
    {
      id: "tx-2",
      signature: "zk_3DKpqR...m2N5tQ",
      type: "Swap",
      status: "Success",
      from: "AnoID_Q2W5E9",
      to: "AnoSwap Protocol",
      amount: "***.**",
      token: "USDC",
      time: "5s ago",
      fee: "0.000008",
      slot: "234567888",
      isNew: false,
    },
    {
      id: "tx-3",
      signature: "zk_7YHgfD...p9L3kM",
      type: "NFT Mint",
      status: "Success",
      from: "AnoID_R8T6Y1",
      to: "AnoNFT Contract",
      amount: "1",
      token: "NFT",
      time: "12s ago",
      fee: "0.00001",
      slot: "234567885",
      isNew: false,
    },
    {
      id: "tx-4",
      signature: "zk_9MnBvC...q4W7xZ",
      type: "Bridge",
      status: "Pending",
      from: "AnoID_U4I9O3",
      to: "AnoBridge",
      amount: "***.**",
      token: "ETH",
      time: "18s ago",
      fee: "0.000012",
      slot: "234567882",
      isNew: false,
    },
    {
      id: "tx-5",
      signature: "zk_2LkJhG...r6T8yP",
      type: "Transfer",
      status: "Success",
      from: "AnoID_A5S7D2",
      to: "AnoID_F3G9H4",
      amount: "***.**",
      token: "SOL",
      time: "25s ago",
      fee: "0.000005",
      slot: "234567880",
      isNew: false,
    },
  ]

  const [recentTransactions, setRecentTransactions] = useState(initialTransactions)

  useEffect(() => {
    const newTxTemplates = [
      {
        type: "Transfer",
        status: "Success",
        from: "AnoID_K8L9M2",
        to: "AnoID_N3O4P5",
        token: "SOL",
        fee: "0.000005",
      },
      {
        type: "Swap",
        status: "Success",
        from: "AnoID_Q6R7S8",
        to: "AnoSwap Protocol",
        token: "USDC",
        fee: "0.000008",
      },
      {
        type: "NFT Transfer",
        status: "Success",
        from: "AnoID_T9U1V2",
        to: "AnoID_W3X4Y5",
        token: "NFT",
        fee: "0.00001",
      },
    ]

    const interval = setInterval(() => {
      const template = newTxTemplates[Math.floor(Math.random() * newTxTemplates.length)]
      const newTx = {
        id: `tx-${Date.now()}`,
        signature: `zk_${Math.random().toString(36).substring(2, 8)}...${Math.random().toString(36).substring(2, 6)}`,
        type: template.type,
        status: template.status,
        from: template.from,
        to: template.to,
        amount: "***.**",
        token: template.token,
        time: "Just now",
        fee: template.fee,
        slot: String(234567890 + Math.floor(Math.random() * 100)),
        isNew: true,
      }

      setNetworkStats((prev) => ({
        tps: prev.tps + Math.floor(Math.random() * 5) + 1, // +1 to +5
        blockHeight: prev.blockHeight + Math.floor(Math.random() * 3) + 1, // +1 to +3
        totalTransactions: Number.parseFloat((prev.totalTransactions + 0.0001).toFixed(4)), // +0.0001B per transaction
        activeValidators: Math.random() > 0.95 ? prev.activeValidators + 1 : prev.activeValidators, // Occasionally +1
        avgBlockTime: Number.parseFloat((0.3 + Math.random() * 0.2).toFixed(1)), // 0.3s to 0.5s
        totalStaked: Number.parseFloat((prev.totalStaked + Math.random() * 0.5 + 0.1).toFixed(1)), // +0.1 to +0.6M SOL
      }))

      setRecentTransactions((prev) => {
        const updated = [newTx, ...prev.slice(0, 4)]
        // Remove isNew flag after animation
        setTimeout(() => {
          setRecentTransactions((current) => current.map((tx) => (tx.id === newTx.id ? { ...tx, isNew: false } : tx)))
        }, 1000)
        return updated
      })
    }, 8000) // New transaction every 8 seconds

    return () => clearInterval(interval)
  }, [])

  // Recent Blocks
  const recentBlocks = [
    { slot: "234567890", proposer: "Validator_42", txns: 3247, time: "2s ago", hash: "zk_Bh9x...K3mP" },
    { slot: "234567889", proposer: "Validator_18", txns: 3189, time: "2s ago", hash: "zk_Cm8w...L2nQ" },
    { slot: "234567888", proposer: "Validator_91", txns: 3312, time: "3s ago", hash: "zk_Dn7v...M1oR" },
    { slot: "234567887", proposer: "Validator_55", txns: 3098, time: "3s ago", hash: "zk_Eo6u...N0pS" },
    { slot: "234567886", proposer: "Validator_73", txns: 3256, time: "4s ago", hash: "zk_Fp5t...O9qT" },
  ]

  // Top Tokens
  const topTokens = [
    { name: "Solana", symbol: "SOL", price: "$142.35", change: "+5.2%", volume: "$2.4B", holders: "***" },
    { name: "USD Coin", symbol: "USDC", price: "$1.00", change: "+0.01%", volume: "$1.8B", holders: "***" },
    { name: "Wrapped ETH", symbol: "WETH", price: "$3,245.67", change: "+3.8%", volume: "$892M", holders: "***" },
    { name: "Bonk", symbol: "BONK", price: "$0.000024", change: "+12.4%", volume: "$456M", holders: "***" },
  ]

  // Programs/Contracts
  const topPrograms = [
    { name: "AnoSwap DEX", address: "AnoSwap_Prog...x7K9", txns: "1.2M", volume: "$45M" },
    { name: "AnoVault", address: "AnoVault_Prog...m3N5", txns: "847K", volume: "$32M" },
    { name: "AnoNFT Marketplace", address: "AnoNFT_Prog...p2L4", txns: "623K", volume: "$18M" },
    { name: "AnoBridge", address: "AnoBridge_Prog...q9W8", txns: "445K", volume: "$67M" },
  ]

  const handleSearch = () => {
    if (searchQuery.trim()) {
      toast({
        title: "Searching ZK-Encrypted Data",
        description: `Looking up: ${searchQuery}`,
      })
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied!",
      description: "Copied to clipboard",
    })
  }

  const formatNumber = (num: number) => {
    return num.toLocaleString()
  }

  return (
    <div>
      <DashboardHeader title="AnoScan" />

      <div className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold font-mono mb-2">ZK-Encrypted Blockchain Explorer</h2>
          <p className="text-muted-foreground font-mono text-sm flex items-center gap-2">
            <Shield className="w-4 h-4 text-secondary" />
            All on-chain data is encrypted by ZK-Ano. Transaction amounts and addresses are obfuscated.
          </p>
        </div>

        {/* Search Bar */}
        <TerminalCard>
          <div className="flex gap-2">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Transaction Signature, Block, Address, or AnoID..."
              className="font-mono bg-input border-border"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSearch()
                }
              }}
            />
            <Button onClick={handleSearch} className="bg-primary hover:bg-primary/90">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>
        </TerminalCard>

        {/* Network Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0 }}
          >
            <TerminalCard>
              <div className="text-center">
                <Zap className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-xs text-muted-foreground font-mono mb-1">TPS</p>
                <p className="text-lg font-bold font-mono text-primary">{formatNumber(animatedStats.tps)}</p>
              </div>
            </TerminalCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <TerminalCard>
              <div className="text-center">
                <Box className="w-6 h-6 text-secondary mx-auto mb-2" />
                <p className="text-xs text-muted-foreground font-mono mb-1">Block Height</p>
                <p className="text-lg font-bold font-mono text-secondary">{formatNumber(animatedStats.blockHeight)}</p>
              </div>
            </TerminalCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <TerminalCard>
              <div className="text-center">
                <Activity className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-xs text-muted-foreground font-mono mb-1">Total Txns</p>
                <p className="text-lg font-bold font-mono text-primary">{animatedStats.totalTransactions}B</p>
              </div>
            </TerminalCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <TerminalCard>
              <div className="text-center">
                <Database className="w-6 h-6 text-secondary mx-auto mb-2" />
                <p className="text-xs text-muted-foreground font-mono mb-1">Validators</p>
                <p className="text-lg font-bold font-mono text-secondary">
                  {formatNumber(animatedStats.activeValidators)}
                </p>
              </div>
            </TerminalCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <TerminalCard>
              <div className="text-center">
                <Clock className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-xs text-muted-foreground font-mono mb-1">Block Time</p>
                <p className="text-lg font-bold font-mono text-primary">{animatedStats.avgBlockTime}s</p>
              </div>
            </TerminalCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <TerminalCard>
              <div className="text-center">
                <TrendingUp className="w-6 h-6 text-secondary mx-auto mb-2" />
                <p className="text-xs text-muted-foreground font-mono mb-1">Total Staked</p>
                <p className="text-lg font-bold font-mono text-secondary">{animatedStats.totalStaked}M SOL</p>
              </div>
            </TerminalCard>
          </motion.div>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="transactions" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="transactions" className="font-mono">
              <Activity className="w-4 h-4 mr-2" />
              Transactions
            </TabsTrigger>
            <TabsTrigger value="blocks" className="font-mono">
              <Box className="w-4 h-4 mr-2" />
              Blocks
            </TabsTrigger>
            <TabsTrigger value="tokens" className="font-mono">
              <ArrowRightLeft className="w-4 h-4 mr-2" />
              Tokens
            </TabsTrigger>
            <TabsTrigger value="programs" className="font-mono">
              <Database className="w-4 h-4 mr-2" />
              Programs
            </TabsTrigger>
          </TabsList>

          {/* Transactions Tab */}
          <TabsContent value="transactions">
            <TerminalCard>
              <h3 className="text-lg font-bold font-mono mb-4">Recent Transactions</h3>
              <div className="space-y-3">
                <AnimatePresence initial={false}>
                  {recentTransactions.map((tx) => (
                    <motion.div
                      key={tx.id}
                      initial={{ opacity: 0, y: -20, scale: 0.95 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        backgroundColor: tx.isNew ? "rgba(222, 157, 35, 0.1)" : "rgba(0, 0, 0, 0)",
                      }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.3 }}
                      className="p-4 rounded-lg bg-muted/30 border border-border hover:border-primary/30 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                              tx.status === "Success"
                                ? "bg-secondary/20"
                                : tx.status === "Pending"
                                  ? "bg-yellow-500/20"
                                  : "bg-red-500/20"
                            }`}
                          >
                            {tx.status === "Success" ? (
                              <CheckCircle2 className="w-4 h-4 text-secondary" />
                            ) : tx.status === "Pending" ? (
                              <Clock className="w-4 h-4 text-yellow-500" />
                            ) : (
                              <XCircle className="w-4 h-4 text-red-500" />
                            )}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-mono font-semibold text-sm">{tx.signature}</p>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-6 w-6"
                                onClick={() => copyToClipboard(tx.signature)}
                              >
                                <Copy className="w-3 h-3" />
                              </Button>
                              {tx.isNew && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ type: "spring", stiffness: 500, damping: 15 }}
                                >
                                  <Badge className="bg-primary text-primary-foreground font-mono text-xs">NEW</Badge>
                                </motion.div>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="font-mono text-xs">
                                {tx.type}
                              </Badge>
                              <span className="text-xs text-muted-foreground font-mono">{tx.time}</span>
                            </div>
                          </div>
                        </div>
                        <Badge
                          variant={tx.status === "Success" ? "default" : "secondary"}
                          className={`font-mono ${
                            tx.status === "Success"
                              ? "bg-secondary/20 text-secondary"
                              : tx.status === "Pending"
                                ? "bg-yellow-500/20 text-yellow-500"
                                : "bg-red-500/20 text-red-500"
                          }`}
                        >
                          {tx.status}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm font-mono">
                        <div>
                          <p className="text-muted-foreground text-xs mb-1">From</p>
                          <p className="text-primary">{tx.from}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs mb-1">To</p>
                          <p className="text-secondary">{tx.to}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs mb-1">Amount</p>
                          <p>
                            {tx.amount} {tx.token}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs mb-1">Fee</p>
                          <p>{tx.fee} SOL</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs mb-1">Slot</p>
                          <p>{tx.slot}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <Button variant="outline" className="w-full mt-4 border-border font-mono bg-transparent">
                Load More Transactions
              </Button>
            </TerminalCard>
          </TabsContent>

          {/* Blocks Tab */}
          <TabsContent value="blocks">
            <TerminalCard>
              <h3 className="text-lg font-bold font-mono mb-4">Recent Blocks</h3>
              <div className="space-y-3">
                {recentBlocks.map((block, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg bg-muted/30 border border-border hover:border-primary/30 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                          <Box className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-mono font-semibold">Slot {block.slot}</p>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-6 w-6"
                              onClick={() => copyToClipboard(block.slot)}
                            >
                              <Copy className="w-3 h-3" />
                            </Button>
                          </div>
                          <p className="text-xs text-muted-foreground font-mono">Hash: {block.hash}</p>
                        </div>
                      </div>
                      <div className="flex gap-6 text-sm font-mono">
                        <div>
                          <p className="text-muted-foreground text-xs mb-1">Proposer</p>
                          <p className="text-secondary">{block.proposer}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs mb-1">Transactions</p>
                          <p className="text-primary">{block.txns}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs mb-1">Time</p>
                          <p>{block.time}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Button variant="outline" className="w-full mt-4 border-border font-mono bg-transparent">
                Load More Blocks
              </Button>
            </TerminalCard>
          </TabsContent>

          {/* Tokens Tab */}
          <TabsContent value="tokens">
            <TerminalCard>
              <h3 className="text-lg font-bold font-mono mb-4">Top Tokens by Volume</h3>
              <div className="space-y-3">
                {topTokens.map((token, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg bg-muted/30 border border-border hover:border-primary/30 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                          <span className="font-mono font-bold text-primary">{token.symbol[0]}</span>
                        </div>
                        <div>
                          <p className="font-mono font-semibold">{token.name}</p>
                          <p className="text-xs text-muted-foreground font-mono">{token.symbol}</p>
                        </div>
                      </div>
                      <div className="flex gap-6 text-sm font-mono">
                        <div>
                          <p className="text-muted-foreground text-xs mb-1">Price</p>
                          <p className="text-primary">{token.price}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs mb-1">24h Change</p>
                          <p className={token.change.startsWith("+") ? "text-secondary" : "text-red-500"}>
                            {token.change}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs mb-1">24h Volume</p>
                          <p>{token.volume}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs mb-1">Holders</p>
                          <p className="text-muted-foreground">{token.holders}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TerminalCard>
          </TabsContent>

          {/* Programs Tab */}
          <TabsContent value="programs">
            <TerminalCard>
              <h3 className="text-lg font-bold font-mono mb-4">Top Programs by Activity</h3>
              <div className="space-y-3">
                {topPrograms.map((program, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg bg-muted/30 border border-border hover:border-primary/30 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center">
                          <Database className="w-5 h-5 text-secondary" />
                        </div>
                        <div>
                          <p className="font-mono font-semibold">{program.name}</p>
                          <div className="flex items-center gap-2">
                            <p className="text-xs text-muted-foreground font-mono">{program.address}</p>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-5 w-5"
                              onClick={() => copyToClipboard(program.address)}
                            >
                              <Copy className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-6 text-sm font-mono">
                        <div>
                          <p className="text-muted-foreground text-xs mb-1">Transactions</p>
                          <p className="text-primary">{program.txns}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs mb-1">24h Volume</p>
                          <p className="text-secondary">{program.volume}</p>
                        </div>
                        <Button size="sm" variant="outline" className="border-border font-mono bg-transparent">
                          <ExternalLink className="w-3 h-3 mr-2" />
                          View
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TerminalCard>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
