"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TerminalCard } from "@/components/terminal-card"
import { useZKano } from "@/hooks/use-zkano"
import { Shield, Wallet, Key, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useToast } from "@/hooks/use-toast"

export default function AuthPage() {
  const [username, setUsername] = useState("")
  const [anoId, setAnoId] = useState("")
  const [loading, setLoading] = useState(false)
  const { createZKWallet, hashWithZKA403, connectWallet } = useZKano()
  const router = useRouter()
  const { toast } = useToast()

  const handleCreateWallet = async () => {
    setLoading(true)
    try {
      // Generate wallet
      const wallet = await createZKWallet()

      // Hash public key to create ZK-ID
      const zkId = hashWithZKA403(wallet.publicKey)

      localStorage.setItem(
        "zkano_new_wallet",
        JSON.stringify({
          address: wallet.address,
          publicKey: wallet.publicKey,
          privateKey: wallet.privateKey,
          seedPhrase: wallet.seedPhrase,
          zkId,
          username: username || "Anonymous",
        }),
      )

      // Store session data
      localStorage.setItem(
        "zkano_session",
        JSON.stringify({
          address: wallet.address,
          zkId,
          username: username || "Anonymous",
        }),
      )

      toast({
        title: "Wallet Created Successfully",
        description: `Your ZK-ID: ${zkId}`,
      })

      setTimeout(() => {
        router.push("/auth/wallet-info")
      }, 1500)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create wallet",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleConnectWallet = async (walletType: "phantom" | "solflare" | "metamask") => {
    setLoading(true)
    try {
      const result = await connectWallet(walletType)

      // Create ZK-ID from connected wallet
      const zkId = hashWithZKA403(result.address)

      localStorage.setItem(
        "zkano_session",
        JSON.stringify({
          address: result.address,
          zkId,
          walletType: result.walletType,
        }),
      )

      toast({
        title: "Wallet Connected",
        description: `Connected via ${walletType}`,
      })

      setTimeout(() => {
        router.push("/dashboard")
      }, 1000)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to connect wallet",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleLoginWithAnoId = async () => {
    if (!anoId) {
      toast({
        title: "Error",
        description: "Please enter your AnoID",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      // Mock login
      localStorage.setItem(
        "zkano_session",
        JSON.stringify({
          zkId: anoId,
          address: `zkano_${anoId.slice(-8)}`,
        }),
      )

      toast({
        title: "Login Successful",
        description: "Welcome back!",
      })

      setTimeout(() => {
        router.push("/dashboard")
      }, 1000)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to login",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold font-mono mb-2">
            <span className="text-primary">zkAnon</span> <span className="text-muted-foreground">//</span> Auth
          </h1>
          <p className="text-muted-foreground">Create your private identity or connect existing wallet</p>
        </div>

        <TerminalCard>
          <Tabs defaultValue="create" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="create" className="font-mono">
                Create Wallet
              </TabsTrigger>
              <TabsTrigger value="login" className="font-mono">
                Login / Connect
              </TabsTrigger>
            </TabsList>

            <TabsContent value="create" className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground font-mono">
                  <Shield className="w-4 h-4 text-primary" />
                  <span>This will generate an anonymous ZK-ID</span>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username" className="font-mono">
                    Username (Optional)
                  </Label>
                  <Input
                    id="username"
                    placeholder="Enter username..."
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="font-mono bg-input border-border"
                  />
                </div>

                <div className="p-4 rounded-lg bg-muted/30 border border-border">
                  <p className="text-sm font-mono text-muted-foreground mb-2">What happens next:</p>
                  <ul className="text-sm space-y-1 font-mono">
                    <li className="text-secondary">✓ Generate local wallet</li>
                    <li className="text-secondary">✓ Hash public key with ZKA403</li>
                    <li className="text-secondary">✓ Create your ZK-ID (AnoID)</li>
                  </ul>
                </div>

                <Button
                  onClick={handleCreateWallet}
                  disabled={loading}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-mono"
                  size="lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Key className="w-5 h-5 mr-2" />
                      Generate ZK Wallet
                    </>
                  )}
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="login" className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-3">
                  <Label className="font-mono">Connect Wallet</Label>
                  <div className="grid grid-cols-1 gap-3">
                    <Button
                      onClick={() => handleConnectWallet("phantom")}
                      disabled={loading}
                      variant="outline"
                      className="w-full justify-start font-mono border-border hover:border-primary/50"
                    >
                      <Wallet className="w-5 h-5 mr-2" />
                      Connect Phantom
                    </Button>
                    <Button
                      onClick={() => handleConnectWallet("solflare")}
                      disabled={loading}
                      variant="outline"
                      className="w-full justify-start font-mono border-border hover:border-primary/50"
                    >
                      <Wallet className="w-5 h-5 mr-2" />
                      Connect Solflare
                    </Button>
                    <Button
                      onClick={() => handleConnectWallet("metamask")}
                      disabled={loading}
                      variant="outline"
                      className="w-full justify-start font-mono border-border hover:border-primary/50"
                    >
                      <Wallet className="w-5 h-5 mr-2" />
                      Connect MetaMask
                    </Button>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground font-mono">Or</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="anoid" className="font-mono">
                    Enter AnoID
                  </Label>
                  <Input
                    id="anoid"
                    placeholder="AnoID_XXXXXXXX"
                    value={anoId}
                    onChange={(e) => setAnoId(e.target.value)}
                    className="font-mono bg-input border-border"
                  />
                  <Button
                    onClick={handleLoginWithAnoId}
                    disabled={loading}
                    className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-mono"
                    size="lg"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Logging in...
                      </>
                    ) : (
                      <>
                        <Shield className="w-5 h-5 mr-2" />
                        Login
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </TerminalCard>
      </motion.div>
    </div>
  )
}
