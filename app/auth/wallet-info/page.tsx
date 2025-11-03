"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { TerminalCard } from "@/components/terminal-card"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Shield, Copy, Eye, EyeOff, CheckCircle2, AlertTriangle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function WalletInfoPage() {
  const [walletData, setWalletData] = useState<any>(null)
  const [showPrivateKey, setShowPrivateKey] = useState(false)
  const [showSeedPhrase, setShowSeedPhrase] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Get wallet data from localStorage
    const data = localStorage.getItem("zkano_new_wallet")
    if (!data) {
      // If no wallet data, redirect to auth
      router.push("/auth")
      return
    }
    setWalletData(JSON.parse(data))
  }, [router])

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    setCopied(label)
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
    })
    setTimeout(() => setCopied(null), 2000)
  }

  const handleContinue = () => {
    // Clear the temporary wallet data
    localStorage.removeItem("zkano_new_wallet")
    router.push("/dashboard")
  }

  if (!walletData) {
    return null
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-3xl"
      >
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <CheckCircle2 className="w-12 h-12 text-secondary" />
          </div>
          <h1 className="text-4xl font-bold font-mono mb-2">
            <span className="text-primary">Wallet Created</span>
          </h1>
          <p className="text-muted-foreground">Save your wallet information securely</p>
        </div>

        <TerminalCard>
          <div className="space-y-6">
            {/* Warning */}
            <div className="flex items-start gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/30">
              <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-mono font-semibold text-destructive">Important Security Notice</p>
                <p className="text-xs font-mono text-muted-foreground">
                  Save your private key and seed phrase in a secure location. You will need them to recover your wallet.
                  Never share them with anyone.
                </p>
              </div>
            </div>

            {/* AnoID */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                <label className="text-sm font-mono font-semibold">Your AnoID</label>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 p-3 rounded-lg bg-muted/30 border border-border font-mono text-sm break-all">
                  {walletData.zkId}
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyToClipboard(walletData.zkId, "AnoID")}
                  className="flex-shrink-0"
                >
                  {copied === "AnoID" ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            {/* Proof ID */}
            <div className="space-y-2">
              <label className="text-sm font-mono font-semibold">Proof ID</label>
              <div className="flex items-center gap-2">
                <div className="flex-1 p-3 rounded-lg bg-muted/30 border border-border font-mono text-sm break-all">
                  {walletData.proofId}
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyToClipboard(walletData.proofId, "Proof ID")}
                  className="flex-shrink-0"
                >
                  {copied === "Proof ID" ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            {/* Public Address */}
            <div className="space-y-2">
              <label className="text-sm font-mono font-semibold">Public Address</label>
              <div className="flex items-center gap-2">
                <div className="flex-1 p-3 rounded-lg bg-muted/30 border border-border font-mono text-sm break-all">
                  {walletData.address}
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyToClipboard(walletData.address, "Address")}
                  className="flex-shrink-0"
                >
                  {copied === "Address" ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            {/* Private Key */}
            <div className="space-y-2">
              <label className="text-sm font-mono font-semibold text-destructive">Private Key</label>
              <div className="flex items-center gap-2">
                <div className="flex-1 p-3 rounded-lg bg-destructive/5 border border-destructive/30 font-mono text-sm break-all">
                  {showPrivateKey ? walletData.privateKey : "•".repeat(64)}
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowPrivateKey(!showPrivateKey)}
                  className="flex-shrink-0"
                >
                  {showPrivateKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyToClipboard(walletData.privateKey, "Private Key")}
                  className="flex-shrink-0"
                  disabled={!showPrivateKey}
                >
                  {copied === "Private Key" ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            {/* Recovery Seed Phrase */}
            <div className="space-y-2">
              <label className="text-sm font-mono font-semibold text-destructive">Recovery Seed Phrase</label>
              <div className="space-y-2">
                <div className="p-3 rounded-lg bg-destructive/5 border border-destructive/30">
                  {showSeedPhrase ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 font-mono text-sm">
                      {walletData.seedPhrase.split(" ").map((word: string, i: number) => (
                        <div key={i} className="flex items-center gap-1.5 p-1.5 rounded bg-background/50">
                          <span className="text-muted-foreground text-xs min-w-[20px]">{i + 1}.</span>
                          <span className="text-xs">{word}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center font-mono text-sm py-4">{"•".repeat(80)}</div>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setShowSeedPhrase(!showSeedPhrase)}
                    className="flex-1"
                  >
                    {showSeedPhrase ? (
                      <>
                        <EyeOff className="w-4 h-4 mr-2" /> Hide Seed Phrase
                      </>
                    ) : (
                      <>
                        <Eye className="w-4 h-4 mr-2" /> Show Seed Phrase
                      </>
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(walletData.seedPhrase, "Seed Phrase")}
                    disabled={!showSeedPhrase}
                  >
                    {copied === "Seed Phrase" ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
              <p className="text-xs font-mono text-muted-foreground">
                Write down these 12 words in order. You'll need them to recover your wallet.
              </p>
            </div>

            {/* Continue Button */}
            <div className="pt-4">
              <Button onClick={handleContinue} className="w-full bg-primary hover:bg-primary/90 font-mono" size="lg">
                I've Saved My Wallet Info - Continue to Dashboard
              </Button>
            </div>
          </div>
        </TerminalCard>
      </motion.div>
    </div>
  )
}
