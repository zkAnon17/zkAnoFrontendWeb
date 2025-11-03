"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { TerminalCard } from "@/components/terminal-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sparkles, Send, Save, Shield } from "lucide-react"

export default function AIAgentPage() {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "assistant",
      content:
        "Hello! I'm your private AI assistant. All conversations are encrypted and protected by zero-knowledge proofs. How can I help you today?",
    },
  ])

  const handleSend = () => {
    if (!message.trim()) return

    setMessages([
      ...messages,
      { id: messages.length + 1, role: "user", content: message },
      {
        id: messages.length + 2,
        role: "assistant",
        content: "I understand your request. Let me analyze that privately...",
      },
    ])
    setMessage("")
  }

  return (
    <div>
      <DashboardHeader title="AnoAI Agent" />

      <div className="p-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Info Sidebar */}
          <div className="col-span-3 space-y-4">
            <TerminalCard>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-secondary" />
                  <div>
                    <p className="font-mono font-semibold text-sm">Model</p>
                    <p className="text-xs text-muted-foreground font-mono">Local / ZK Protected</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground font-mono mb-2">Privacy Status</p>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                    <span className="text-secondary font-mono text-sm">Fully Encrypted</span>
                  </div>
                </div>
              </div>
            </TerminalCard>

            <TerminalCard>
              <h3 className="font-mono font-semibold mb-3">Quick Actions</h3>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start font-mono border-border bg-transparent"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Analyze Market
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start font-mono border-border bg-transparent"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Strategy
                </Button>
              </div>
            </TerminalCard>
          </div>

          {/* Chat Area */}
          <div className="col-span-9">
            <TerminalCard className="h-[calc(100vh-12rem)] flex flex-col">
              <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] p-4 rounded-lg ${
                        msg.role === "user" ? "bg-primary/20 border border-primary" : "bg-muted/30 border border-border"
                      }`}
                    >
                      {msg.role === "assistant" && (
                        <div className="flex items-center gap-2 mb-2">
                          <Sparkles className="w-4 h-4 text-primary" />
                          <span className="text-xs font-mono text-primary">AI Agent</span>
                        </div>
                      )}
                      <p className="font-mono text-sm leading-relaxed">{msg.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask me anything..."
                  className="font-mono bg-input border-border"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") handleSend()
                  }}
                />
                <Button onClick={handleSend} className="bg-primary hover:bg-primary/90">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </TerminalCard>
          </div>
        </div>
      </div>
    </div>
  )
}
