"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { TerminalCard } from "@/components/terminal-card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Eye, EyeOff, ShoppingCart, Lock, Search } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function NFTPage() {
  const [filter, setFilter] = useState("all")
  const [selectedNFT, setSelectedNFT] = useState<any>(null)
  const [showBuyDialog, setShowBuyDialog] = useState(false)
  const [searchContract, setSearchContract] = useState("")
  const { toast } = useToast()

  const nfts = [
    {
      id: 1,
      name: "Private Ape #1234",
      collection: "Hidden Collection",
      price: "2.5 SOL",
      visibility: "Private",
      image: "/placeholder.svg?height=200&width=200",
      contractAddress: "0x1234567890abcdef",
    },
    {
      id: 2,
      name: "ZK Punk #5678",
      collection: "Whitelist Only",
      price: "1.8 SOL",
      visibility: "Whitelist",
      image: "/placeholder.svg?height=200&width=200",
      contractAddress: "0xabcdef1234567890",
    },
    {
      id: 3,
      name: "Ano Art #9012",
      collection: "Hidden Collection",
      price: "3.2 SOL",
      visibility: "Private",
      image: "/placeholder.svg?height=200&width=200",
      contractAddress: "0x90abcdef12345678",
    },
    {
      id: 4,
      name: "Secret NFT #3456",
      collection: "Private Vault",
      price: "4.5 SOL",
      visibility: "Hidden",
      image: "/placeholder.svg?height=200&width=200",
      contractAddress: "0x7890abcdef1234",
    },
    {
      id: 5,
      name: "Ghost #7890",
      collection: "Hidden Collection",
      price: "2.1 SOL",
      visibility: "Private",
      image: "/placeholder.svg?height=200&width=200",
      contractAddress: "0x567890abcdef1234",
    },
    {
      id: 6,
      name: "Stealth #2468",
      collection: "Whitelist Only",
      price: "3.8 SOL",
      visibility: "Whitelist",
      image: "/placeholder.svg?height=200&width=200",
      contractAddress: "0x34567890abcdef12",
    },
    {
      id: 7,
      name: "Shadow #1357",
      collection: "Private Vault",
      price: "5.2 SOL",
      visibility: "Hidden",
      image: "/placeholder.svg?height=200&width=200",
      contractAddress: "0x1234567890abcdef",
    },
    {
      id: 8,
      name: "Phantom #9753",
      collection: "Hidden Collection",
      price: "2.9 SOL",
      visibility: "Private",
      image: "/placeholder.svg?height=200&width=200",
      contractAddress: "0xabcdef1234567890",
    },
    {
      id: 9,
      name: "Cipher #8642",
      collection: "Whitelist Only",
      price: "4.1 SOL",
      visibility: "Whitelist",
      image: "/placeholder.svg?height=200&width=200",
      contractAddress: "0x90abcdef12345678",
    },
    {
      id: 10,
      name: "Enigma #5791",
      collection: "Private Vault",
      price: "3.5 SOL",
      visibility: "Hidden",
      image: "/placeholder.svg?height=200&width=200",
      contractAddress: "0x7890abcdef1234",
    },
    {
      id: 11,
      name: "Void #4826",
      collection: "Hidden Collection",
      price: "2.7 SOL",
      visibility: "Private",
      image: "/placeholder.svg?height=200&width=200",
      contractAddress: "0x567890abcdef1234",
    },
    {
      id: 12,
      name: "Cloak #3159",
      collection: "Whitelist Only",
      price: "3.3 SOL",
      visibility: "Whitelist",
      image: "/placeholder.svg?height=200&width=200",
      contractAddress: "0x34567890abcdef12",
    },
  ]

  const handleBuyClick = (nft: any) => {
    setSelectedNFT(nft)
    setShowBuyDialog(true)
  }

  const confirmPurchase = () => {
    if (!selectedNFT) return

    toast({
      title: "Processing Anonymous Purchase",
      description: `Encrypting transaction for ${selectedNFT.name}...`,
    })

    setShowBuyDialog(false)

    setTimeout(() => {
      toast({
        title: "Purchase Successful",
        description: `${selectedNFT.name} has been added to your private vault!`,
      })
      setSelectedNFT(null)
    }, 2000)
  }

  const filteredNFTs = nfts
    .filter((nft) => {
      if (filter === "all") return true
      if (filter === nft.visibility) return true
      return false
    })
    .filter((nft) => {
      if (!searchContract) return true
      return nft.contractAddress.toLowerCase().includes(searchContract.toLowerCase())
    })

  return (
    <div>
      <DashboardHeader title="AnoNFT" />

      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold font-mono mb-2">Private NFT Marketplace</h2>
            <p className="text-muted-foreground font-mono text-sm">Buy and sell NFTs without revealing your identity</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Input
                value={searchContract}
                onChange={(e) => setSearchContract(e.target.value)}
                placeholder="Search Contract Address..."
                className="w-80 font-mono bg-input border-border"
              />
              <Button
                onClick={() => {
                  if (searchContract.trim()) {
                    toast({
                      title: "Searching...",
                      description: `Looking for NFTs with contract: ${searchContract}`,
                    })
                  }
                }}
                className="bg-primary hover:bg-primary/90"
              >
                <Search className="w-4 h-4" />
              </Button>
            </div>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-48 font-mono bg-input border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Collections</SelectItem>
                <SelectItem value="private">Private</SelectItem>
                <SelectItem value="whitelist">Whitelist</SelectItem>
                <SelectItem value="hidden">Hidden</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredNFTs.map((nft) => (
            <TerminalCard key={nft.id} className="hover:border-primary/50 transition-colors p-3">
              <div className="aspect-square rounded-lg bg-muted/30 mb-3 overflow-hidden">
                <img src={nft.image || "/placeholder.svg"} alt={nft.name} className="w-full h-full object-cover" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-mono font-semibold text-xs truncate">{nft.name}</h3>
                  {nft.visibility === "Private" ? (
                    <EyeOff className="w-3 h-3 text-primary flex-shrink-0" />
                  ) : (
                    <Eye className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground font-mono truncate">{nft.collection}</p>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-sm font-bold font-mono text-primary">{nft.price}</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-primary/20 text-primary">
                    {nft.visibility}
                  </span>
                </div>
                <Button
                  onClick={() => handleBuyClick(nft)}
                  className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-mono text-xs h-8"
                >
                  <ShoppingCart className="w-3 h-3 mr-1" />
                  Buy Anonymously
                </Button>
              </div>
            </TerminalCard>
          ))}
        </div>
      </div>

      <Dialog open={showBuyDialog} onOpenChange={setShowBuyDialog}>
        <DialogContent className="bg-background border-border font-mono">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-primary">
              <Lock className="w-5 h-5" />
              Anonymous Purchase Confirmation
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Your transaction will be encrypted and processed through ZK-Ano protocol
            </DialogDescription>
          </DialogHeader>

          {selectedNFT && (
            <div className="space-y-4 py-4">
              <div className="aspect-square rounded-lg bg-muted/30 overflow-hidden max-w-[200px] mx-auto">
                <img
                  src={selectedNFT.image || "/placeholder.svg"}
                  alt={selectedNFT.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-2 border border-border rounded-lg p-4 bg-muted/20">
                <div className="flex justify-between">
                  <span className="text-muted-foreground text-sm">NFT Name:</span>
                  <span className="font-semibold text-sm">{selectedNFT.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground text-sm">Collection:</span>
                  <span className="font-semibold text-sm">{selectedNFT.collection}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground text-sm">Price:</span>
                  <span className="font-bold text-primary">{selectedNFT.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground text-sm">Visibility:</span>
                  <span className="text-sm px-2 py-1 rounded bg-primary/20 text-primary">{selectedNFT.visibility}</span>
                </div>
              </div>

              <div className="bg-secondary/20 border border-secondary/30 rounded-lg p-3 text-xs space-y-1">
                <p className="text-secondary flex items-center gap-2">
                  <Lock className="w-3 h-3" />
                  <span className="font-semibold">Privacy Features:</span>
                </p>
                <ul className="text-muted-foreground space-y-1 ml-5 list-disc">
                  <li>Transaction encrypted with ZK-SNARK</li>
                  <li>Wallet address obfuscated</li>
                  <li>NFT stored in private vault</li>
                  <li>No public transaction history</li>
                </ul>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBuyDialog(false)} className="font-mono">
              Cancel
            </Button>
            <Button onClick={confirmPurchase} className="bg-secondary hover:bg-secondary/90 font-mono">
              <Lock className="w-4 h-4 mr-2" />
              Confirm Purchase
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
