"use client"

import { useEffect, useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { TerminalCard } from "@/components/terminal-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Upload, Key, Wallet, Lock, Eye, EyeOff, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export default function ProfilePage() {
  const [session, setSession] = useState<any>(null)
  const [username, setUsername] = useState("")
  const [showPrivateKey, setShowPrivateKey] = useState(false)
  const [pinDialogOpen, setPinDialogOpen] = useState(false)
  const [pinInput, setPinInput] = useState("")
  const [pinError, setPinError] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const sessionData = localStorage.getItem("zkano_session")
    if (sessionData) {
      const data = JSON.parse(sessionData)

      // Generate or retrieve Solana keypair
      let solanaKeypair = localStorage.getItem("solana_keypair")
      if (!solanaKeypair) {
        // Generate new keypair (simulated - in production use @solana/web3.js)
        const publicKey = `${Array.from(
          { length: 44 },
          () => "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz123456789"[Math.floor(Math.random() * 58)],
        ).join("")}`
        const privateKey = `${Array.from(
          { length: 88 },
          () => "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz123456789"[Math.floor(Math.random() * 58)],
        ).join("")}`

        solanaKeypair = JSON.stringify({ publicKey, privateKey })
        localStorage.setItem("solana_keypair", solanaKeypair)
      }

      const keypair = JSON.parse(solanaKeypair)
      setSession({ ...data, ...keypair })
      setUsername(data.username || "")
    }
  }, [])

  const handleViewPrivateKey = () => {
    setPinDialogOpen(true)
    setPinInput("")
    setPinError(false)
  }

  const handlePinSubmit = () => {
    // Fixed PIN: 1234 (cannot be changed as per requirements)
    if (pinInput === "1234") {
      setShowPrivateKey(true)
      setPinDialogOpen(false)
      toast({
        title: "Access Granted",
        description: "Private key is now visible",
      })
    } else {
      setPinError(true)
      setPinInput("")
    }
  }

  const handleRegenerateSession = () => {
    toast({
      title: "Regenerating ZK Session",
      description: "Your session is being regenerated...",
    })
  }

  const handleUploadAvatar = () => {
    toast({
      title: "Upload Avatar",
      description: "Avatar upload functionality coming soon",
    })
  }

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
    })
  }

  if (!session) return null

  const connectedWallets = [{ type: session.walletType || "Generated", address: session.address, primary: true }]

  return (
    <div>
      <DashboardHeader title="Profile" />

      <div className="p-6 space-y-6">
        <div>
          <h2 className="text-2xl font-bold font-mono mb-2">User Profile</h2>
          <p className="text-muted-foreground font-mono text-sm">Manage your anonymous identity</p>
        </div>

        {/* Profile Info */}
        <TerminalCard>
          <div className="flex items-start gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center">
                <User className="w-12 h-12 text-primary" />
              </div>
              <Button
                size="icon"
                onClick={handleUploadAvatar}
                className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary hover:bg-primary/90"
              >
                <Upload className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex-1 space-y-4">
              <div className="space-y-2">
                <Label className="font-mono">Username</Label>
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Anonymous"
                  className="font-mono bg-input border-border"
                />
              </div>
              <div className="space-y-2">
                <Label className="font-mono">AnoID</Label>
                <div className="flex gap-2">
                  <Input value={session.zkId} readOnly className="font-mono bg-muted border-border" />
                  <Button
                    variant="outline"
                    className="border-border font-mono bg-transparent"
                    onClick={() => copyToClipboard(session.zkId, "AnoID")}
                  >
                    Copy
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </TerminalCard>

        <TerminalCard>
          <h3 className="text-lg font-bold font-mono mb-4 flex items-center gap-2">
            <Key className="w-5 h-5 text-primary" />
            Solana Wallet Keys
          </h3>
          <div className="space-y-4">
            {/* Public Key */}
            <div>
              <Label className="font-mono text-sm text-muted-foreground">Public Key (Pubkey)</Label>
              <div className="flex gap-2 mt-2">
                <Input value={session.publicKey} readOnly className="font-mono text-xs bg-muted/30 border-border" />
                <Button
                  variant="outline"
                  className="border-border font-mono bg-transparent"
                  onClick={() => copyToClipboard(session.publicKey, "Public Key")}
                >
                  Copy
                </Button>
              </div>
              <p className="text-xs text-muted-foreground font-mono mt-2">
                This is your public Solana address. Safe to share with others.
              </p>
            </div>

            {/* Private Key */}
            <div>
              <Label className="font-mono text-sm text-muted-foreground flex items-center gap-2">
                <Lock className="w-4 h-4 text-secondary" />
                Private Key (Protected)
              </Label>
              <div className="flex gap-2 mt-2">
                <Input
                  value={showPrivateKey ? session.privateKey : "••••••••••••••••••••••••••••••••••••••••••••"}
                  readOnly
                  type={showPrivateKey ? "text" : "password"}
                  className="font-mono text-xs bg-muted/30 border-border"
                />
                <Button
                  variant="outline"
                  className="border-secondary/30 hover:bg-secondary/10 font-mono bg-transparent"
                  onClick={handleViewPrivateKey}
                >
                  {showPrivateKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
                {showPrivateKey && (
                  <Button
                    variant="outline"
                    className="border-border font-mono bg-transparent"
                    onClick={() => copyToClipboard(session.privateKey, "Private Key")}
                  >
                    Copy
                  </Button>
                )}
              </div>
              <div className="flex items-start gap-2 mt-2 p-3 rounded-lg bg-secondary/10 border border-secondary/30">
                <AlertCircle className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                <div className="text-xs text-muted-foreground font-mono space-y-1">
                  <p className="font-semibold text-secondary">Security Notice:</p>
                  <p>• Never share your private key with anyone</p>
                  <p>• PIN protected access (PIN: 1234 - cannot be changed)</p>
                  <p>• Store this key securely offline</p>
                  <p>• Anyone with this key has full access to your wallet</p>
                </div>
              </div>
            </div>
          </div>
        </TerminalCard>

        {/* Wallet Hash */}
        <TerminalCard>
          <h3 className="text-lg font-bold font-mono mb-4 flex items-center gap-2">
            <Key className="w-5 h-5 text-primary" />
            ZK Wallet Information
          </h3>
          <div className="space-y-3">
            <div>
              <Label className="font-mono text-sm text-muted-foreground">Wallet Address (Hashed)</Label>
              <p className="font-mono text-sm mt-1 p-3 rounded-lg bg-muted/30 border border-border break-all">
                {session.address}
              </p>
            </div>
            <Button
              onClick={handleRegenerateSession}
              variant="outline"
              className="w-full border-primary/30 hover:bg-primary/10 font-mono bg-transparent"
            >
              <Key className="w-4 h-4 mr-2" />
              Regenerate ZK Session
            </Button>
          </div>
        </TerminalCard>

        {/* Connected Wallets */}
        <TerminalCard>
          <h3 className="text-lg font-bold font-mono mb-4 flex items-center gap-2">
            <Wallet className="w-5 h-5 text-primary" />
            Connected Wallets
          </h3>
          <div className="space-y-3">
            {connectedWallets.map((wallet, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border"
              >
                <div>
                  <p className="font-mono font-semibold">{wallet.type}</p>
                  <p className="text-sm text-muted-foreground font-mono">{wallet.address}</p>
                </div>
                {wallet.primary && (
                  <span className="text-xs font-mono px-2 py-1 rounded bg-primary/20 text-primary">Primary</span>
                )}
              </div>
            ))}
          </div>
        </TerminalCard>

        {/* Stats */}
        <TerminalCard>
          <h3 className="text-lg font-bold font-mono mb-4">Account Stats</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold font-mono text-primary">247</p>
              <p className="text-sm text-muted-foreground font-mono">Transactions</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold font-mono text-secondary">98%</p>
              <p className="text-sm text-muted-foreground font-mono">Privacy Score</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold font-mono text-primary">12</p>
              <p className="text-sm text-muted-foreground font-mono">Active Proofs</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold font-mono text-secondary">45d</p>
              <p className="text-sm text-muted-foreground font-mono">Member Since</p>
            </div>
          </div>
        </TerminalCard>
      </div>

      <Dialog open={pinDialogOpen} onOpenChange={setPinDialogOpen}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle className="font-mono flex items-center gap-2">
              <Lock className="w-5 h-5 text-secondary" />
              Enter PIN to View Private Key
            </DialogTitle>
            <DialogDescription className="font-mono">
              Enter your 4-digit PIN to unlock and view your private key. This PIN cannot be changed for security
              reasons.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="font-mono">PIN Code</Label>
              <Input
                type="password"
                maxLength={4}
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value.replace(/\D/g, ""))
                  setPinError(false)
                }}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && pinInput.length === 4) {
                    handlePinSubmit()
                  }
                }}
                placeholder="Enter 4-digit PIN"
                className={`font-mono text-center text-2xl tracking-widest ${
                  pinError ? "border-red-500" : "border-border"
                }`}
              />
              {pinError && <p className="text-xs text-red-500 font-mono mt-2">Incorrect PIN. Please try again.</p>}
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handlePinSubmit}
                disabled={pinInput.length !== 4}
                className="flex-1 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-mono"
              >
                Unlock
              </Button>
              <Button
                onClick={() => setPinDialogOpen(false)}
                variant="outline"
                className="flex-1 border-border font-mono bg-transparent"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
