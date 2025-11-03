"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { TerminalCard } from "@/components/terminal-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Send, DollarSign, Shield, Users, UserPlus, Search, X, ImageIcon, Smile } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

export default function ChatPage() {
  const [message, setMessage] = useState("")
  const [selectedContact, setSelectedContact] = useState("AnoID_B3D8C1F2")
  const [globalMessage, setGlobalMessage] = useState("")
  const [searchAnoId, setSearchAnoId] = useState("")
  const [showSendSOL, setShowSendSOL] = useState(false)
  const [solAmount, setSolAmount] = useState("")
  const [txHash, setTxHash] = useState("")
  const [showTxHash, setShowTxHash] = useState(false)
  const { toast } = useToast()

  const contacts = [
    { id: 1, anoId: "AnoID_B3D8C1F2", lastMessage: "Thanks for the transfer!", time: "2m ago", unread: 2 },
    { id: 2, anoId: "AnoID_E9F4A2D7", lastMessage: "See you tomorrow", time: "1h ago", unread: 0 },
    { id: 3, anoId: "AnoID_A7F2E9C8", lastMessage: "Got it!", time: "3h ago", unread: 0 },
  ]

  const personalMessages = [
    { id: 1, sender: "them", text: "Hey, can you send me 0.5 SOL?", time: "14:30" },
    { id: 2, sender: "me", text: "Sure, sending now", time: "14:31" },
    { id: 3, sender: "me", text: "[Private Transfer: 0.5 SOL]", time: "14:31", isTransfer: true },
    { id: 4, sender: "them", text: "Thanks for the transfer!", time: "14:32" },
  ]

  const globalMessages = [
    { id: 1, anoId: "AnoID_X9K2L4", text: "Welcome to ZK-Ano global chat!", time: "10:15", color: "text-primary" },
    { id: 2, anoId: "AnoID_P7M3N8", text: "Anyone trading today?", time: "10:18", color: "text-secondary" },
    {
      id: 3,
      anoId: "AnoID_Q2W5E9",
      text: "Just bridged some assets, works great!",
      time: "10:22",
      color: "text-blue-400",
    },
    { id: 4, anoId: "AnoID_R8T6Y1", text: "How do I use AnoVault?", time: "10:25", color: "text-green-400" },
    {
      id: 5,
      anoId: "AnoID_U4I9O3",
      text: "Check the Help section, very useful",
      time: "10:27",
      color: "text-purple-400",
    },
    { id: 6, anoId: "AnoID_A5S7D2", text: "Privacy is the future!", time: "10:30", color: "text-yellow-400" },
  ]

  const handleAddContact = () => {
    if (searchAnoId.trim()) {
      toast({
        title: "Contact Added",
        description: `${searchAnoId} has been added to your contacts`,
      })
      setSearchAnoId("")
    }
  }

  const handleSendSOL = () => {
    if (solAmount && Number.parseFloat(solAmount) > 0) {
      toast({
        title: "Sending SOL",
        description: `Sending ${solAmount} SOL to ${selectedContact}...`,
      })
      setTimeout(() => {
        const generatedTxHash = `zkano_${Math.random().toString(36).substring(2, 15)}_${Date.now().toString(36)}`
        setTxHash(generatedTxHash)
        setShowTxHash(true)
        toast({
          title: "Transfer Complete",
          description: (
            <div className="space-y-2">
              <p>{solAmount} SOL sent successfully!</p>
              <div className="text-xs space-y-1">
                <p className="font-semibold">Transaction Hash:</p>
                <p className="break-all bg-muted/50 p-2 rounded">{generatedTxHash}</p>
                <a
                  href={`/anoscan?tx=${generatedTxHash}`}
                  className="text-primary hover:underline inline-flex items-center gap-1"
                >
                  View on AnoScan →
                </a>
              </div>
            </div>
          ),
          duration: 10000,
        })
        setSolAmount("")
        setShowSendSOL(false)
      }, 2000)
    } else {
      toast({
        title: "Error",
        description: "Please enter a valid amount",
        variant: "destructive",
      })
    }
  }

  const handleAddImage = () => {
    toast({
      title: "Add Image",
      description: "Image upload feature coming soon!",
    })
  }

  const handleAddEmoticon = () => {
    toast({
      title: "Add Emoticon",
      description: "Emoticon picker coming soon!",
    })
  }

  return (
    <div>
      <DashboardHeader title="AnoChat" />

      <div className="p-6">
        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-6">
            <TabsTrigger value="personal" className="font-mono">
              <UserPlus className="w-4 h-4 mr-2" />
              Personal Chat
            </TabsTrigger>
            <TabsTrigger value="global" className="font-mono">
              <Users className="w-4 h-4 mr-2" />
              Global Chat
            </TabsTrigger>
          </TabsList>

          {/* Personal Chat Tab */}
          <TabsContent value="personal">
            <TerminalCard className="h-[calc(100vh-16rem)]">
              <div className="flex items-center gap-2 mb-4 pb-4 border-b border-border">
                <Shield className="w-5 h-5 text-secondary" />
                <p className="text-sm font-mono text-muted-foreground">
                  Private DMs - Messages + transfers will NOT appear on public explorer
                </p>
              </div>

              {showTxHash && (
                <div className="mb-4 p-4 rounded-lg bg-secondary/20 border border-secondary">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-mono font-semibold text-secondary">Transaction Successful!</p>
                    <Button size="icon" variant="ghost" onClick={() => setShowTxHash(false)} className="h-6 w-6">
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-xs font-mono text-muted-foreground mb-2">Transaction Hash:</p>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 text-xs font-mono bg-background/50 p-2 rounded border border-border">
                      {txHash}
                    </code>
                    <Link href={`/anoscan?tx=${txHash}`}>
                      <Button size="sm" className="bg-primary hover:bg-primary/90 font-mono text-xs">
                        View in AnoScan
                      </Button>
                    </Link>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-12 gap-6 h-[calc(100%-4rem)]">
                {/* Contacts List */}
                <div className="col-span-4 border-r border-border pr-4 overflow-y-auto custom-scrollbar">
                  <div className="mb-4">
                    <h3 className="text-lg font-bold font-mono mb-3">Add Contact</h3>
                    <div className="flex gap-2">
                      <Input
                        value={searchAnoId}
                        onChange={(e) => setSearchAnoId(e.target.value)}
                        placeholder="Enter AnoID..."
                        className="font-mono text-sm bg-input border-border"
                      />
                      <Button onClick={handleAddContact} size="icon" className="bg-primary hover:bg-primary/90">
                        <Search className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground font-mono mt-2">
                      You can only chat with users whose AnoID you know
                    </p>
                  </div>

                  <h3 className="text-lg font-bold font-mono mb-4">Contacts</h3>
                  <div className="space-y-2">
                    {contacts.map((contact) => (
                      <button
                        key={contact.id}
                        onClick={() => setSelectedContact(contact.anoId)}
                        className={`w-full text-left p-3 rounded-lg transition-colors ${
                          selectedContact === contact.anoId
                            ? "bg-primary/20 border border-primary"
                            : "bg-muted/30 border border-border hover:bg-muted/50"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-mono font-semibold text-sm">{contact.anoId}</p>
                          {contact.unread > 0 && (
                            <span className="w-5 h-5 rounded-full bg-secondary text-secondary-foreground text-xs flex items-center justify-center">
                              {contact.unread}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground font-mono truncate">{contact.lastMessage}</p>
                        <p className="text-xs text-muted-foreground font-mono mt-1">{contact.time}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Messages */}
                <div className="col-span-8 flex flex-col">
                  <div className="flex-1 overflow-y-auto space-y-4 mb-4 custom-scrollbar">
                    {personalMessages.map((msg) => (
                      <div key={msg.id} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`max-w-[70%] p-3 rounded-lg ${
                            msg.isTransfer
                              ? "bg-secondary/20 border border-secondary"
                              : msg.sender === "me"
                                ? "bg-primary/20 border border-primary"
                                : "bg-muted/30 border border-border"
                          }`}
                        >
                          <p className="font-mono text-sm">{msg.text}</p>
                          <p className="text-xs text-muted-foreground font-mono mt-1">{msg.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={handleAddImage}
                      size="icon"
                      variant="outline"
                      className="border-border bg-transparent"
                    >
                      <ImageIcon className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={handleAddEmoticon}
                      size="icon"
                      variant="outline"
                      className="border-border bg-transparent"
                    >
                      <Smile className="w-4 h-4" />
                    </Button>
                    <Input
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type a message..."
                      className="font-mono bg-input border-border"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          setMessage("")
                        }
                      }}
                    />
                    <Dialog open={showSendSOL} onOpenChange={setShowSendSOL}>
                      <DialogTrigger asChild>
                        <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                          <DollarSign className="w-4 h-4 mr-2" />
                          Send SOL
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-card border-border">
                        <DialogHeader>
                          <DialogTitle className="font-mono">Send SOL Privately</DialogTitle>
                          <DialogDescription className="font-mono">
                            Send SOL to {selectedContact} without revealing your identity
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="amount" className="font-mono">
                              Amount (SOL)
                            </Label>
                            <Input
                              id="amount"
                              type="number"
                              step="0.01"
                              value={solAmount}
                              onChange={(e) => setSolAmount(e.target.value)}
                              placeholder="0.00"
                              className="font-mono bg-input border-border"
                            />
                          </div>
                          <div className="flex gap-2">
                            <Button
                              onClick={handleSendSOL}
                              className="flex-1 bg-secondary hover:bg-secondary/90 font-mono"
                            >
                              Send {solAmount || "0"} SOL
                            </Button>
                            <Button
                              onClick={() => setShowSendSOL(false)}
                              variant="outline"
                              className="flex-1 border-border font-mono"
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button className="bg-primary hover:bg-primary/90">
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </TerminalCard>
          </TabsContent>

          <TabsContent value="global">
            <TerminalCard className="h-[calc(100vh-16rem)]">
              <div className="flex items-center gap-2 mb-4 pb-4 border-b border-border">
                <Users className="w-5 h-5 text-primary" />
                <p className="text-sm font-mono text-muted-foreground">
                  Public Global Chat - All ZK-Ano users can participate
                </p>
              </div>

              <div className="flex flex-col h-[calc(100%-4rem)]">
                {/* Global Messages */}
                <div className="flex-1 overflow-y-auto space-y-3 mb-4 custom-scrollbar">
                  {globalMessages.map((msg) => (
                    <div key={msg.id} className="p-3 rounded-lg bg-muted/30 border border-border">
                      <div className="flex items-center justify-between mb-2">
                        <p className={`font-mono font-semibold text-sm ${msg.color}`}>{msg.anoId}</p>
                        <p className="text-xs text-muted-foreground font-mono">{msg.time}</p>
                      </div>
                      <p className="font-mono text-sm">{msg.text}</p>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={handleAddImage}
                    size="icon"
                    variant="outline"
                    className="border-border bg-transparent"
                  >
                    <ImageIcon className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={handleAddEmoticon}
                    size="icon"
                    variant="outline"
                    className="border-border bg-transparent"
                  >
                    <Smile className="w-4 h-4" />
                  </Button>
                  <Input
                    value={globalMessage}
                    onChange={(e) => setGlobalMessage(e.target.value)}
                    placeholder="Send a message to all ZK-Ano users..."
                    className="font-mono bg-input border-border"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        setGlobalMessage("")
                      }
                    }}
                  />
                  <Button className="bg-primary hover:bg-primary/90">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </TerminalCard>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
