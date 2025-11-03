"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { TerminalCard } from "@/components/terminal-card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { HelpCircle, MessageCircle, Book, ExternalLink } from "lucide-react"

export default function HelpPage() {
  const faqs = [
    {
      question: "What is ZK-Ano?",
      answer:
        "ZK-Ano is a privacy-focused Web3 platform that uses zero-knowledge proofs to obfuscate your on-chain transactions. All your trading, bridging, and messaging activities are protected by advanced cryptography.",
    },
    {
      question: "How does ZK-Ano hide my transactions?",
      answer:
        "When you make a transaction, ZK-Ano generates a zero-knowledge proof that validates your transaction without revealing your identity or transaction details. The proof is submitted to the blockchain, while your actual data remains private.",
    },
    {
      question: "What is an AnoID?",
      answer:
        "AnoID is your anonymous identity on ZK-Ano. It's a hash of your public key generated using the ZKA403 algorithm. Your AnoID allows you to interact with the platform while maintaining complete privacy.",
    },
    {
      question: "Are my funds safe?",
      answer:
        "Yes. ZK-Ano uses industry-standard encryption and zero-knowledge proofs. Your private keys never leave your device, and all transactions are cryptographically secured.",
    },
    {
      question: "What is the privacy fee?",
      answer:
        "The privacy fee (currently 0.3%) covers the computational cost of generating zero-knowledge proofs for your transactions. This fee helps maintain the network and compensate node operators.",
    },
    {
      question: "Can I use ZK-Ano with my existing wallet?",
      answer:
        "Yes! ZK-Ano supports Phantom, Solflare, and MetaMask. You can connect your existing wallet or create a new private wallet directly in the app.",
    },
    {
      question: "How do I participate in governance?",
      answer:
        "Hold ZKANO tokens to gain voting power. You can vote on proposals anonymously using your AnoID. Your vote is recorded on-chain without revealing your identity.",
    },
    {
      question: "What chains does AnoBridge support?",
      answer:
        "AnoBridge currently supports Solana, Ethereum, Polygon, and BSC. We're constantly adding new chains based on community governance votes.",
    },
  ]

  return (
    <div>
      <DashboardHeader title="Help Center" />

      <div className="p-6 space-y-6">
        <div>
          <h2 className="text-2xl font-bold font-mono mb-2">Help Center</h2>
          <p className="text-muted-foreground font-mono text-sm">Find answers and get support</p>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TerminalCard className="hover:border-primary/50 transition-colors cursor-pointer">
            <Book className="w-8 h-8 text-primary mb-3" />
            <h3 className="font-mono font-semibold mb-2">Documentation</h3>
            <p className="text-sm text-muted-foreground">Complete guides and tutorials</p>
          </TerminalCard>

          <TerminalCard className="hover:border-primary/50 transition-colors cursor-pointer">
            <MessageCircle className="w-8 h-8 text-secondary mb-3" />
            <h3 className="font-mono font-semibold mb-2">Community</h3>
            <p className="text-sm text-muted-foreground">Join our Discord and Telegram</p>
          </TerminalCard>

          <TerminalCard className="hover:border-primary/50 transition-colors cursor-pointer">
            <ExternalLink className="w-8 h-8 text-primary mb-3" />
            <h3 className="font-mono font-semibold mb-2">Support Ticket</h3>
            <p className="text-sm text-muted-foreground">Get help from our team</p>
          </TerminalCard>
        </div>

        {/* FAQ */}
        <TerminalCard>
          <h3 className="text-xl font-bold font-mono mb-6 flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-primary" />
            Frequently Asked Questions
          </h3>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-border">
                <AccordionTrigger className="font-mono hover:text-primary">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground font-mono text-sm leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </TerminalCard>

        {/* How ZK-Ano Works */}
        <TerminalCard>
          <h3 className="text-xl font-bold font-mono mb-4">How ZK-Ano Hides Your Transactions</h3>
          <div className="space-y-4 font-mono text-sm">
            <div className="p-4 rounded-lg bg-muted/30 border border-border">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">
                  1
                </div>
                <p className="font-semibold">Transaction Initiation</p>
              </div>
              <p className="text-muted-foreground ml-8">
                You initiate a transaction through any ZK-Ano service (swap, bridge, transfer, etc.)
              </p>
            </div>

            <div className="p-4 rounded-lg bg-muted/30 border border-border">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">
                  2
                </div>
                <p className="font-semibold">ZK-Proof Generation</p>
              </div>
              <p className="text-muted-foreground ml-8">
                Our system generates a zero-knowledge proof that validates your transaction without revealing details
              </p>
            </div>

            <div className="p-4 rounded-lg bg-muted/30 border border-border">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">
                  3
                </div>
                <p className="font-semibold">Obfuscation Layer</p>
              </div>
              <p className="text-muted-foreground ml-8">
                Transaction is routed through our mixing protocol, breaking the link between sender and receiver
              </p>
            </div>

            <div className="p-4 rounded-lg bg-muted/30 border border-border">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center text-secondary font-bold text-xs">
                  4
                </div>
                <p className="font-semibold">On-Chain Settlement</p>
              </div>
              <p className="text-muted-foreground ml-8">
                Only the ZK-proof and hashed data are recorded on-chain. Your identity remains private.
              </p>
            </div>
          </div>
        </TerminalCard>

        {/* Contact Support */}
        <TerminalCard>
          <h3 className="text-xl font-bold font-mono mb-4">Still Need Help?</h3>
          <p className="text-muted-foreground font-mono text-sm mb-4">
            Our support team is available 24/7 to assist you with any questions or issues.
          </p>
          <div className="flex gap-3">
            <Button className="bg-primary hover:bg-primary/90 font-mono">
              <MessageCircle className="w-4 h-4 mr-2" />
              Open Support Ticket
            </Button>
            <Button variant="outline" className="border-border font-mono bg-transparent">
              Join Community
            </Button>
          </div>
        </TerminalCard>
      </div>
    </div>
  )
}
