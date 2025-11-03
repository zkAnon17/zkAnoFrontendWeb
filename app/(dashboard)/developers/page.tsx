"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { TerminalCard } from "@/components/terminal-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Code, Copy, Server, Key } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function DevelopersPage() {
  const { toast } = useToast()

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    toast({
      title: "Copied to clipboard",
      description: "Code snippet copied successfully",
    })
  }

  const examples = [
    {
      title: "useZKano() Hook",
      code: `import { useZKano } from '@zkano/sdk'

const { createZKWallet, hashPublicKey } = useZKano()

// Create a new ZK wallet
const wallet = await createZKWallet()
const zkId = hashPublicKey(wallet.publicKey)`,
    },
    {
      title: "Send Private Transaction",
      code: `import { sendPrivateTxn } from '@zkano/sdk'

const result = await sendPrivateTxn({
  to: 'recipient_address',
  amount: 1.5,
  token: 'SOL',
  privacyLevel: 'strict'
})`,
    },
    {
      title: "Verify ZK Proof",
      code: `import { verifyZKProof } from '@zkano/sdk'

const isValid = await verifyZKProof({
  proofId: 'zk_proof_a7f2e9',
  publicInputs: [...]
})`,
    },
  ]

  return (
    <div>
      <DashboardHeader title="Developers" />

      <div className="p-6 space-y-6">
        <div>
          <h2 className="text-2xl font-bold font-mono mb-2">Developer & API</h2>
          <p className="text-muted-foreground font-mono text-sm">Integrate ZK-Ano into your applications</p>
        </div>

        {/* API Key */}
        <TerminalCard>
          <h3 className="text-lg font-bold font-mono mb-4 flex items-center gap-2">
            <Key className="w-5 h-5 text-primary" />
            API Key
          </h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="font-mono">Your API Key</Label>
              <div className="flex gap-2">
                <Input value="zkano_api_key_a7f2e9d8c1b3f4a5" readOnly className="font-mono bg-muted border-border" />
                <Button
                  variant="outline"
                  className="border-border font-mono bg-transparent"
                  onClick={() => copyCode("zkano_api_key_a7f2e9d8c1b3f4a5")}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground font-mono">
                Keep your API key secure. Never share it publicly.
              </p>
            </div>
          </div>
        </TerminalCard>

        {/* SDK Examples */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold font-mono">SDK Examples</h3>
          {examples.map((example, index) => (
            <TerminalCard key={index}>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-mono font-semibold flex items-center gap-2">
                  <Code className="w-4 h-4 text-primary" />
                  {example.title}
                </h4>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-border font-mono bg-transparent"
                  onClick={() => copyCode(example.code)}
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
              </div>
              <pre className="bg-black/50 rounded-lg p-4 overflow-x-auto">
                <code className="text-sm font-mono text-secondary">{example.code}</code>
              </pre>
            </TerminalCard>
          ))}
        </div>

        {/* Node Registration */}
        <TerminalCard>
          <h3 className="text-lg font-bold font-mono mb-4 flex items-center gap-2">
            <Server className="w-5 h-5 text-primary" />
            Register as Node Operator
          </h3>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground font-mono">
              Run a ZK-Ano node and earn rewards for processing private transactions
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="font-mono">Node Name</Label>
                <Input placeholder="My ZK Node" className="font-mono bg-input border-border" />
              </div>
              <div className="space-y-2">
                <Label className="font-mono">Server IP</Label>
                <Input placeholder="192.168.1.1" className="font-mono bg-input border-border" />
              </div>
            </div>
            <Button className="w-full bg-primary hover:bg-primary/90 font-mono">
              <Server className="w-4 h-4 mr-2" />
              Register Node
            </Button>
          </div>
        </TerminalCard>

        {/* Documentation Links */}
        <TerminalCard>
          <h3 className="text-lg font-bold font-mono mb-4">Documentation</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Button variant="outline" className="justify-start border-border font-mono bg-transparent">
              Getting Started Guide
            </Button>
            <Button variant="outline" className="justify-start border-border font-mono bg-transparent">
              API Reference
            </Button>
            <Button variant="outline" className="justify-start border-border font-mono bg-transparent">
              SDK Documentation
            </Button>
            <Button variant="outline" className="justify-start border-border font-mono bg-transparent">
              Node Setup Guide
            </Button>
          </div>
        </TerminalCard>
      </div>
    </div>
  )
}
