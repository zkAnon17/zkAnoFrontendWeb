"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { TerminalCard } from "@/components/terminal-card"
import { Button } from "@/components/ui/button"
import { Lock, Unlock, Upload, Download, Shield } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function VaultPage() {
  const [assets, setAssets] = useState([
    {
      id: 1,
      name: "Private Keys Backup",
      type: "Encrypted File",
      status: "Locked",
      lastAccessed: "2h ago",
      zkProof: "zk_proof_a7f2e9",
    },
    {
      id: 2,
      name: "Trading Strategy",
      type: "Document",
      status: "Locked",
      lastAccessed: "1d ago",
      zkProof: "zk_proof_b3d8c1",
    },
    {
      id: 3,
      name: "NFT Metadata",
      type: "JSON",
      status: "Decrypted",
      lastAccessed: "5m ago",
      zkProof: "zk_proof_e9f4a2",
    },
  ])
  const { toast } = useToast()

  const handleEncrypt = () => {
    toast({
      title: "Encrypting Asset",
      description: "Your asset is being encrypted with ZK-proof...",
    })
    // Simulate encryption process
    setTimeout(() => {
      toast({
        title: "Success",
        description: "Asset encrypted successfully!",
      })
    }, 2000)
  }

  const handleBackup = () => {
    toast({
      title: "Backing Up",
      description: "Backing up encrypted assets to vault node...",
    })
    setTimeout(() => {
      toast({
        title: "Success",
        description: "Assets backed up to vault node successfully!",
      })
    }, 2000)
  }

  const handleDecrypt = (assetName: string) => {
    toast({
      title: "Decrypting Asset",
      description: `Decrypting ${assetName}...`,
    })
  }

  return (
    <div>
      <DashboardHeader title="AnoVault" />

      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold font-mono mb-2">Encrypted Assets</h2>
            <p className="text-muted-foreground font-mono text-sm">Secure storage with zero-knowledge encryption</p>
          </div>
          <div className="flex gap-3">
            <Button onClick={handleEncrypt} className="bg-primary hover:bg-primary/90 font-mono">
              <Upload className="w-4 h-4 mr-2" />
              Encrypt New Asset
            </Button>
            <Button onClick={handleBackup} variant="outline" className="border-border font-mono bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              Backup to Vault Node
            </Button>
          </div>
        </div>

        {/* Security Panel */}
        <TerminalCard glowColor="secondary">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-secondary" />
            <div>
              <p className="font-mono font-semibold">Current ZK-Proof ID</p>
              <p className="text-sm text-muted-foreground font-mono">zk_session_master_a7f2e9d8c1b3</p>
            </div>
          </div>
        </TerminalCard>

        {/* Assets Table */}
        <TerminalCard>
          <div className="space-y-4">
            {assets.map((asset) => (
              <div
                key={asset.id}
                className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      asset.status === "Locked" ? "bg-primary/20" : "bg-secondary/20"
                    }`}
                  >
                    {asset.status === "Locked" ? (
                      <Lock className="w-5 h-5 text-primary" />
                    ) : (
                      <Unlock className="w-5 h-5 text-secondary" />
                    )}
                  </div>
                  <div>
                    <p className="font-mono font-semibold">{asset.name}</p>
                    <p className="text-sm text-muted-foreground font-mono">
                      {asset.type} • Last accessed {asset.lastAccessed}
                    </p>
                    <p className="text-xs text-muted-foreground font-mono mt-1">ZK-Proof: {asset.zkProof}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-mono px-3 py-1 rounded ${
                      asset.status === "Locked" ? "bg-primary/20 text-primary" : "bg-secondary/20 text-secondary"
                    }`}
                  >
                    {asset.status}
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDecrypt(asset.name)}
                    className="border-border font-mono"
                  >
                    {asset.status === "Locked" ? "Decrypt" : "Lock"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </TerminalCard>
      </div>
    </div>
  )
}
