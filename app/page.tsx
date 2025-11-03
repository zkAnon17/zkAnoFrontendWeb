"use client"

import { Button } from "@/components/ui/button"
import { TerminalCard } from "@/components/terminal-card"
import {
  Shield,
  Bot,
  Vault,
  Badge as Bridge,
  ArrowRightLeft,
  Zap,
  Lock,
  CheckCircle2,
  Users,
  Building2,
  Wallet,
  TrendingUp,
  Globe,
  FileText,
  Copy,
  Check,
  Rocket,
  MessageSquare,
  Coins,
  Brain,
  Eye,
  Database,
  Code,
  Smartphone,
  Network,
  ShoppingCart,
  Briefcase,
  GraduationCap,
  Heart,
  Gamepad2,
  Apple,
  Download,
  Monitor,
} from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useState } from "react"

export default function LandingPage() {
  const [copied, setCopied] = useState(false)

  const features = [
    { icon: Bot, name: "AnoBot", desc: "Private trading bot" },
    { icon: Vault, name: "AnoVault", desc: "Encrypted assets & files" },
    { icon: Bridge, name: "AnoBridge", desc: "Private cross-chain" },
    { icon: ArrowRightLeft, name: "AnoSwap", desc: "Private DEX aggregator" },
  ]

  const stats = [
    { label: "Relayer Status", value: "ONLINE", color: "text-secondary" },
    { label: "TPS", value: "2,847", color: "text-primary" },
    { label: "ZK-Proof Latency", value: "0.3s", color: "text-primary" },
  ]

  const allFeatured = [
    { icon: Shield, title: "Zero-Knowledge Proofs", desc: "Military-grade privacy using ZK-SNARKs" },
    { icon: Lock, title: "End-to-End Encryption", desc: "All data encrypted before transmission" },
    { icon: Zap, title: "Lightning Fast", desc: "Sub-second transaction finality" },
    { icon: Globe, title: "Multi-Chain Support", desc: "Works across Solana, Ethereum, and more" },
    { icon: Bot, title: "AI-Powered Trading", desc: "Smart bots with private execution" },
    { icon: MessageSquare, title: "Anonymous Chat", desc: "Private messaging with SOL transfers" },
    { icon: Vault, title: "Encrypted Storage", desc: "Store files and assets with military-grade encryption" },
    { icon: Bridge, title: "Cross-Chain Bridge", desc: "Private transfers between multiple blockchains" },
    { icon: Coins, title: "Private Swaps", desc: "Trade tokens without revealing your wallet" },
    { icon: Brain, title: "AI Agent Marketplace", desc: "Deploy and use AI agents for automated tasks" },
    { icon: Eye, title: "Privacy Mode", desc: "Toggle complete anonymity on/off" },
    { icon: Database, title: "Decentralized Storage", desc: "IPFS integration for distributed file storage" },
    { icon: Network, title: "Anonymous Governance", desc: "Vote on proposals without revealing identity" },
    { icon: Code, title: "Developer API", desc: "Build privacy-first dApps with our SDK" },
    { icon: Smartphone, title: "Mobile Apps", desc: "iOS and Android apps for privacy on the go" },
  ]

  const useCases = [
    {
      icon: Users,
      title: "Individual Users",
      desc: "Protect your financial privacy from surveillance and data harvesting",
    },
    {
      icon: TrendingUp,
      title: "Traders & Investors",
      desc: "Execute trades without revealing your strategy or portfolio",
    },
    { icon: Building2, title: "Businesses", desc: "Conduct private transactions and protect sensitive financial data" },
    { icon: Wallet, title: "DAOs & Communities", desc: "Anonymous governance and private treasury management" },
    {
      icon: ShoppingCart,
      title: "E-Commerce",
      desc: "Accept private payments without exposing customer data",
    },
    {
      icon: Briefcase,
      title: "Freelancers",
      desc: "Receive payments privately and protect your income information",
    },
    {
      icon: GraduationCap,
      title: "Educational Institutions",
      desc: "Manage scholarships and grants with complete privacy",
    },
    {
      icon: Heart,
      title: "Non-Profits",
      desc: "Accept anonymous donations and protect donor privacy",
    },
    {
      icon: Gamepad2,
      title: "Gaming & NFTs",
      desc: "Trade in-game assets and NFTs without revealing your holdings",
    },
    {
      icon: Code,
      title: "Developers",
      desc: "Build privacy-first applications with our comprehensive SDK",
    },
  ]

  const roadmap = [
    {
      month: "November 2025",
      title: "Token Launch & Foundation",
      items: [
        "Launch $ZKANO token on Pump.fun",
        "Initial liquidity provision",
        "Community building & marketing campaign",
        "Smart contract deployment on Solana",
        "Security audit completion",
      ],
    },
    {
      month: "December 2025",
      title: "Frontend Development",
      items: [
        "Launch responsive web application",
        "User dashboard with wallet management",
        "AnoVault encrypted storage interface",
        "AnoSwap DEX aggregator UI",
        "Mobile-responsive design implementation",
      ],
    },
    {
      month: "January 2026",
      title: "Backend Infrastructure",
      items: [
        "Decentralized relayer network deployment",
        "ZK-proof generation optimization",
        "Database architecture for encrypted data",
        "API gateway for third-party integrations",
        "Load balancing and scaling infrastructure",
      ],
    },
    {
      month: "February 2026",
      title: "Core Features Launch",
      items: [
        "AnoBot trading platform with AI",
        "AnoBridge cross-chain functionality",
        "AnoChat private messaging system",
        "AnoNFT marketplace launch",
        "Anonymous governance system",
      ],
    },
    {
      month: "March 2026",
      title: "Ecosystem Expansion",
      items: [
        "Multi-chain integration (Ethereum, BSC, Polygon)",
        "Mobile apps for iOS and Android",
        "Developer SDK and documentation",
        "Partnership announcements",
        "Bug bounty program launch",
      ],
    },
    {
      month: "April 2026",
      title: "Enterprise & Scale",
      items: [
        "Enterprise API suite for businesses",
        "Institutional custody solutions",
        "Advanced analytics dashboard",
        "10+ blockchain integrations",
        "1M+ users milestone target",
      ],
    },
  ]

  const securityFeatures = [
    {
      title: "Multi-Layer Encryption",
      desc: "AES-256 + ZK-SNARKs + ZkA403 encryption combined with for maximum privacy protection",
    },
    {
      title: "Audited Smart Contracts",
      desc: "Verified by CertiK, Quantstamp, and Trail of Bits - industry-leading security firms",
    },
    {
      title: "Non-Custodial Architecture",
      desc: "You always control your private keys - we never have access to your funds",
    },
    { title: "Open Source Code", desc: "Transparent and community-verified codebase available on GitHub" },
    {
      title: "Bug Bounty Program",
      desc: "Up to $500K rewards for critical vulnerabilities - protecting our users is priority #1",
    },
    {
      title: "Decentralized Infrastructure",
      desc: "No single point of failure with distributed relayer network across multiple regions",
    },
    { title: "Real-Time Monitoring", desc: "24/7 security monitoring and incident response team ready to act" },
    { title: "Privacy by Design", desc: "Zero-knowledge architecture ensures we never see your transaction data" },
  ]

  const contractAddress = "xxxxxxxxxxxxxxxxxxxxxxxxpump" // Updated contract address

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(contractAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadWhitepaper = () => {
    window.open("https://drive.google.com/uc?export=download&id=1B_xmn4GpL0GtRK-48pK6rnzxdTX8AFZT", "_blank")
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-6">
            <Lock className="w-4 h-4 text-primary" />
            <span className="text-sm font-mono text-primary">Zero-Knowledge Protocol Active</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 font-mono">
            <span className="text-foreground">zkAnon</span>
            <span className="text-muted-foreground"> // </span>
            <span className="text-primary">The Private Side of Web3</span>
          </h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Create private wallet. Trade, chat, bridge — without leaving on-chain traces.
          </p>

          <div className="flex flex-col gap-4 items-center">
            {/* Main action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth">
                <Button
                  size="lg"
                  className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground font-mono"
                >
                  <Shield className="w-5 h-5 mr-2" />
                  Create Private Wallet
                </Button>
              </Link>
              <Link href="/auth">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6 border-primary/30 hover:bg-primary/10 font-mono bg-transparent"
                >
                  Enter App
                </Button>
              </Link>
            </div>

            {/* Whitepaper button - separate row below */}
            <div className="flex justify-center">
              <Button
                size="lg"
                variant="outline"
                onClick={downloadWhitepaper}
                className="text-lg px-8 py-6 border-secondary/30 hover:bg-secondary/10 font-mono bg-transparent"
              >
                <FileText className="w-5 h-5 mr-2" />
                View Whitepaper
              </Button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Contract Address Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-mono">
            <span className="text-muted-foreground">{"> "}</span>
            Contract Address
          </h2>

          <TerminalCard glowColor="primary">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-4 font-mono">zkAnon Token Contract</p>
              <div className="flex items-center justify-center gap-3 p-4 bg-background/50 rounded-lg border border-primary/30">
                <code className="text-primary font-mono text-sm md:text-base break-all">{contractAddress}</code>
                <Button size="sm" variant="ghost" onClick={handleCopyAddress} className="flex-shrink-0">
                  {copied ? <Check className="w-4 h-4 text-secondary" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Always verify the contract address before interacting
              </p>
            </div>
          </TerminalCard>
        </motion.div>
      </section>

      {/* Why ZK-Ano Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-mono">
            <span className="text-muted-foreground">{"> "}</span>
            Why zkAnon?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <TerminalCard className="h-full hover:border-primary/50 transition-colors">
                  <feature.icon className="w-10 h-10 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2 font-mono">{feature.name}</h3>
                  <p className="text-muted-foreground">{feature.desc}</p>
                </TerminalCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-mono">
            <span className="text-muted-foreground">{"> "}</span>
            How It Works
          </h2>

          <TerminalCard>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-lg">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                  1
                </div>
                <span>User</span>
              </div>
              <Zap className="w-6 h-6 text-primary rotate-90 md:rotate-0" />
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                  2
                </div>
                <span>zkAnon</span>
              </div>
              <Zap className="w-6 h-6 text-primary rotate-90 md:rotate-0" />
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                  3
                </div>
                <span>On-Chain (hashed)</span>
              </div>
            </div>
            <p className="text-center text-muted-foreground mt-6">
              All transactions are obfuscated through zero-knowledge proofs before hitting the blockchain
            </p>
          </TerminalCard>
        </motion.div>
      </section>

      {/* All Featured Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-mono">
            <span className="text-muted-foreground">{"> "}</span>
            All Featured
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allFeatured.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <TerminalCard className="h-full hover:border-secondary/50 transition-colors">
                  <feature.icon className="w-8 h-8 text-secondary mb-3" />
                  <h3 className="text-lg font-bold mb-2 font-mono">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </TerminalCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Use Cases Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-mono">
            <span className="text-muted-foreground">{"> "}</span>
            Use Cases
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {useCases.map((useCase, index) => (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <TerminalCard glowColor="primary" className="h-full">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 border border-primary/30">
                      <useCase.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 font-mono">{useCase.title}</h3>
                      <p className="text-muted-foreground">{useCase.desc}</p>
                    </div>
                  </div>
                </TerminalCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Roadmap Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-mono">
            <span className="text-muted-foreground">{"> "}</span>
            Roadmap
          </h2>

          <div className="relative max-w-5xl mx-auto">
            {/* Timeline line - centered */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-secondary to-primary -translate-x-1/2 hidden md:block" />

            <div className="space-y-12">
              {roadmap.map((phase, index) => (
                <motion.div
                  key={phase.month}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  {/* Timeline node */}
                  <div className="absolute left-1/2 top-8 -translate-x-1/2 z-10 hidden md:block">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full bg-background border-4 border-primary flex items-center justify-center shadow-lg shadow-primary/50">
                        <Rocket className="w-8 h-8 text-primary" />
                      </div>
                      {/* Connecting line to card */}
                      <div
                        className={`absolute top-1/2 ${
                          index % 2 === 0 ? "left-full" : "right-full"
                        } w-12 h-0.5 bg-gradient-to-r ${
                          index % 2 === 0 ? "from-primary to-transparent" : "from-transparent to-primary"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Card - alternating sides */}
                  <div
                    className={`md:w-[calc(50%-4rem)] ${
                      index % 2 === 0 ? "md:ml-auto md:pl-12" : "md:mr-auto md:pr-12"
                    }`}
                  >
                    <TerminalCard glowColor={index === 0 ? "secondary" : "primary"} className="relative">
                      {/* Mobile rocket icon */}
                      <div className="md:hidden flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center">
                          <Rocket className="w-6 h-6 text-primary" />
                        </div>
                        <div className="px-4 py-2 rounded-lg bg-primary/10 border border-primary/30">
                          <p className="font-mono text-primary font-bold text-sm">{phase.month}</p>
                        </div>
                      </div>

                      {/* Desktop month badge */}
                      <div className="hidden md:block mb-4">
                        <div className="inline-block px-4 py-2 rounded-lg bg-primary/10 border border-primary/30">
                          <p className="font-mono text-primary font-bold">{phase.month}</p>
                        </div>
                      </div>

                      <h3 className="text-2xl font-bold mb-4 font-mono">{phase.title}</h3>
                      <ul className="space-y-2">
                        {phase.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </TerminalCard>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Download Apps Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-mono">
            <span className="text-muted-foreground">{"> "}</span>
            Download Apps
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {/* iPhone */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
            >
              <TerminalCard className="h-full text-center opacity-60">
                <Apple className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-bold mb-3 font-mono">iPhone</h3>
                <div className="px-4 py-2 rounded-lg bg-muted/20 border border-muted/30">
                  <span className="text-sm font-mono text-muted-foreground">Coming Soon</span>
                </div>
              </TerminalCard>
            </motion.div>

            {/* Android */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <TerminalCard className="h-full hover:border-secondary/50 transition-colors text-center relative">
                {/* BETA Badge */}
                <div className="absolute -top-2 -right-2 px-3 py-1 rounded-full bg-secondary text-background text-xs font-bold font-mono shadow-lg shadow-secondary/50">
                  BETA
                </div>
                <Smartphone className="w-12 h-12 text-secondary mx-auto mb-4" />
                <h3 className="text-lg font-bold mb-3 font-mono">Android</h3>
                <Button className="w-full bg-secondary hover:bg-secondary/90 text-background font-mono">
                  <Download className="w-4 h-4 mr-2" />
                  Download APK
                </Button>
              </TerminalCard>
            </motion.div>

            {/* Windows */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <TerminalCard className="h-full text-center opacity-60">
                <Monitor className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-bold mb-3 font-mono">Windows</h3>
                <div className="px-4 py-2 rounded-lg bg-muted/20 border border-muted/30">
                  <span className="text-sm font-mono text-muted-foreground">Coming Soon</span>
                </div>
              </TerminalCard>
            </motion.div>

            {/* Linux */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <TerminalCard className="h-full text-center opacity-60">
                <Code className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-bold mb-3 font-mono">Linux</h3>
                <div className="px-4 py-2 rounded-lg bg-muted/20 border border-muted/30">
                  <span className="text-sm font-mono text-muted-foreground">Coming Soon</span>
                </div>
              </TerminalCard>
            </motion.div>

            {/* Mac */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <TerminalCard className="h-full text-center opacity-60">
                <Apple className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-bold mb-3 font-mono">Mac</h3>
                <div className="px-4 py-2 rounded-lg bg-muted/20 border border-muted/30">
                  <span className="text-sm font-mono text-muted-foreground">Coming Soon</span>
                </div>
              </TerminalCard>
            </motion.div>
          </div>

          <p className="text-center text-muted-foreground mt-8 font-mono text-sm">
            Privacy on every platform. Desktop apps launching Q2 2026.
          </p>
        </motion.div>
      </section>

      {/* Security & Compliance Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-mono">
            <span className="text-muted-foreground">{"> "}</span>
            Security & Compliance
          </h2>

          <div>
            <TerminalCard glowColor="secondary" className="mb-8">
              <div className="text-center mb-8">
                <Shield className="w-16 h-16 text-secondary mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2 font-mono">Bank-Grade Security</h3>
                <p className="text-muted-foreground max-w-3xl mx-auto">
                  Your privacy and security are our top priorities. zkAnon implements multiple layers of protection to
                  ensure your data and assets remain completely private and secure at all times.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {securityFeatures.map((feature, index) => (
                  <div key={feature.title} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold mb-1 font-mono">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TerminalCard>
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <TerminalCard glowColor="primary" className="text-center">
            <Rocket className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-mono">Ready to Go Private?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of users who have taken control of their financial privacy
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth">
                <Button
                  size="lg"
                  className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground font-mono"
                >
                  <Shield className="w-5 h-5 mr-2" />
                  Create Account
                </Button>
              </Link>
              <button
                onClick={downloadWhitepaper}
                className="text-lg px-8 py-6 border border-primary/30 hover:bg-primary/10 font-mono bg-transparent rounded-lg transition-colors duration-200 text-foreground flex items-center justify-center"
              >
                <FileText className="w-5 h-5 mr-2" />
                Read Lite Paper
              </button>
            </div>
          </TerminalCard>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo - Left */}
            <div className="flex items-center">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-zkanon-%20putih-VM6Vty3O2VNgzUYvNFhyouRorXswEj.png"
                alt="zkAnon Logo"
                className="h-10 w-auto object-contain"
              />
            </div>

            {/* Copyright - Center */}
            <div className="text-center text-sm text-muted-foreground font-mono">
              © 2025 zkAnon. All rights reserved.
            </div>

            {/* Links - Right */}
            <div className="flex gap-6 font-mono text-sm">
              <Link href="https://github.com/zkAnon17/zkAnoFrontendWeb.git" className="text-muted-foreground hover:text-primary transition-colors">
                Github
              </Link>
              <button
                onClick={downloadWhitepaper}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Whitepaper
              </button>
              <Link href="https://x.com/zkAnon_Official" className="text-muted-foreground hover:text-primary transition-colors">
                X / Twitter
              </Link>
              <Link href="https://discord.gg/S78axhchPK" className="text-muted-foreground hover:text-primary transition-colors">
                Discord
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
