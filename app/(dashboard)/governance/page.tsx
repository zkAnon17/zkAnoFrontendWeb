"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { TerminalCard } from "@/components/terminal-card"
import { Button } from "@/components/ui/button"
import { Plus, ThumbsUp, ThumbsDown, Shield, X, BadgeCheck, Info, History } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function GovernancePage() {
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [showPaymentDialog, setShowPaymentDialog] = useState(false)
  const [showVoteDialog, setShowVoteDialog] = useState(false)
  const [showDetailDialog, setShowDetailDialog] = useState(false)
  const [showHistoryDialog, setShowHistoryDialog] = useState(false)
  const [selectedProposal, setSelectedProposal] = useState<any>(null)
  const [voteType, setVoteType] = useState<"for" | "against">("for")
  const [voteAmount, setVoteAmount] = useState("")
  const [proposalTitle, setProposalTitle] = useState("")
  const [proposalDescription, setProposalDescription] = useState("")
  const { toast } = useToast()

  const proposals = [
    {
      id: 1,
      title: "Reduce Privacy Fee to 0.2%",
      description:
        "This comprehensive proposal aims to reduce the current privacy fee structure from 0.3% to 0.2% across all ZK-Ano transactions and operations. The rationale behind this reduction is multifaceted and addresses several key concerns raised by our community members over the past quarter. First and foremost, we have observed that the current fee structure, while necessary for maintaining network security and operational costs, has become a barrier to entry for smaller transactions and new users who are exploring the benefits of zero-knowledge privacy solutions. By reducing the fee to 0.2%, we estimate that transaction costs will decrease by approximately 33%, making ZK-Ano more accessible to a broader user base while still maintaining sufficient revenue to support network operations, development, and security audits. Our financial analysis indicates that the reduced fee structure will be offset by an expected 40-50% increase in transaction volume, as lower fees typically correlate with higher adoption rates in the DeFi ecosystem. Additionally, this change aligns ZK-Ano with competitive privacy solutions in the market, ensuring we remain an attractive option for users seeking anonymous transactions. The implementation of this fee reduction will be gradual, rolled out over a 30-day period to allow for proper testing and monitoring of network performance. We have conducted extensive simulations and stress tests to ensure that the reduced fee structure will not compromise the security or reliability of the ZK-Ano network. Furthermore, this proposal includes provisions for automatic fee adjustments based on network congestion and operational costs, ensuring long-term sustainability. The governance committee has reviewed this proposal and recommends approval, noting that it represents a balanced approach to growth and sustainability.",
      status: "Active",
      votesFor: 12450,
      votesAgainst: 3200,
      totalVotes: 15650,
      endsIn: "2 days",
      startDate: "2025-01-15",
      endDate: "2025-01-22",
      isOfficial: true,
    },
    {
      id: 2,
      title: "Add Support for Arbitrum Chain",
      description: "Integrate Arbitrum network into AnoBridge for cross-chain transfers",
      status: "Active",
      votesFor: 8900,
      votesAgainst: 5100,
      totalVotes: 14000,
      endsIn: "5 days",
      startDate: "2025-01-12",
      endDate: "2025-01-25",
      isOfficial: false,
    },
    {
      id: 3,
      title: "Increase Node Rewards by 15%",
      description: "Proposal to increase node operator rewards to improve network security",
      status: "Passed",
      votesFor: 18200,
      votesAgainst: 2800,
      totalVotes: 21000,
      endsIn: "Ended",
      startDate: "2025-01-01",
      endDate: "2025-01-10",
      isOfficial: true,
    },
    {
      id: 4,
      title: "Implement Multi-Sig Wallets",
      description: "Add support for multi-signature wallets for enhanced security",
      status: "Active",
      votesFor: 9500,
      votesAgainst: 4200,
      totalVotes: 13700,
      endsIn: "3 days",
      startDate: "2025-01-14",
      endDate: "2025-01-23",
      isOfficial: false,
    },
  ]

  const votingHistory = [
    {
      id: 1,
      proposalTitle: "Reduce Privacy Fee to 0.2%",
      voteChoice: "For",
      amount: 150.5,
      date: "2025-01-16",
      proposalStatus: "Active",
    },
    {
      id: 2,
      proposalTitle: "Increase Node Rewards by 15%",
      voteChoice: "For",
      amount: 200.0,
      date: "2025-01-08",
      proposalStatus: "Passed",
    },
    {
      id: 3,
      proposalTitle: "Add Support for Polygon Chain",
      voteChoice: "Against",
      amount: 75.25,
      date: "2025-01-05",
      proposalStatus: "Rejected",
    },
    {
      id: 4,
      proposalTitle: "Implement Multi-Sig Wallets",
      voteChoice: "For",
      amount: 125.0,
      date: "2025-01-15",
      proposalStatus: "Active",
    },
  ]

  const handleCreateProposal = () => {
    if (proposalTitle.trim() && proposalDescription.trim()) {
      setShowPaymentDialog(true)
    } else {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
    }
  }

  const handleConfirmPayment = () => {
    toast({
      title: "Processing Payment",
      description: "Deducting 24.353 $ZKANO from your wallet...",
    })

    setTimeout(() => {
      toast({
        title: "Proposal Created",
        description: "Your proposal has been submitted for voting",
      })
      setProposalTitle("")
      setProposalDescription("")
      setShowCreateForm(false)
      setShowPaymentDialog(false)
    }, 1500)
  }

  const handleVote = (proposal: any, type: "for" | "against") => {
    setSelectedProposal(proposal)
    setVoteType(type)
    setVoteAmount("")
    setShowVoteDialog(true)
  }

  const handleShowDetail = (proposal: any) => {
    setSelectedProposal(proposal)
    setShowDetailDialog(true)
  }

  const handleConfirmVote = () => {
    const amount = Number.parseFloat(voteAmount)
    if (!amount || amount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount of $ZKANO",
        variant: "destructive",
      })
      return
    }

    if (amount > 1250) {
      toast({
        title: "Insufficient Balance",
        description: "You don't have enough $ZKANO",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Processing Vote",
      description: `Submitting your anonymous vote with ${amount} $ZKANO...`,
    })

    setTimeout(() => {
      toast({
        title: "Vote Recorded",
        description: `Your ${voteType === "for" ? "YES" : "NO"} vote with ${amount} $ZKANO has been recorded anonymously!`,
      })
      setShowVoteDialog(false)
      setVoteAmount("")
    }, 1500)
  }

  return (
    <div>
      <DashboardHeader title="Governance" />

      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold font-mono mb-2">DAO Governance</h2>
            <p className="text-muted-foreground font-mono text-sm">Vote anonymously using your AnoID</p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => setShowHistoryDialog(true)}
              variant="outline"
              className="border-border hover:bg-muted font-mono"
            >
              <History className="w-4 h-4 mr-2" />
              History
            </Button>
            <Button onClick={() => setShowCreateForm(true)} className="bg-primary hover:bg-primary/90 font-mono">
              <Plus className="w-4 h-4 mr-2" />
              Create Proposal
            </Button>
          </div>
        </div>

        {showCreateForm && (
          <TerminalCard glowColor="primary">
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold font-mono">Create New Proposal</h3>
                <Button size="icon" variant="ghost" onClick={() => setShowCreateForm(false)} className="hover:bg-muted">
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div>
                <label className="text-sm font-mono font-semibold mb-2 block">Proposal Title</label>
                <Input
                  value={proposalTitle}
                  onChange={(e) => setProposalTitle(e.target.value)}
                  placeholder="Enter proposal title..."
                  className="font-mono bg-input border-border"
                />
              </div>
              <div>
                <label className="text-sm font-mono font-semibold mb-2 block">Description</label>
                <Textarea
                  value={proposalDescription}
                  onChange={(e) => setProposalDescription(e.target.value)}
                  placeholder="Describe your proposal in detail..."
                  className="font-mono bg-input border-border min-h-[120px]"
                />
              </div>
              <div className="flex gap-3">
                <Button onClick={handleCreateProposal} className="flex-1 bg-secondary hover:bg-secondary/90 font-mono">
                  Submit Proposal
                </Button>
                <Button
                  onClick={() => setShowCreateForm(false)}
                  variant="outline"
                  className="flex-1 border-border font-mono"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </TerminalCard>
        )}

        <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
          <DialogContent className="bg-card border-border font-mono">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold font-mono">Confirm Proposal Submission</DialogTitle>
              <DialogDescription className="font-mono">
                Creating a proposal requires a fee to prevent spam
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="bg-muted/30 border border-border rounded-lg p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Proposal Fee:</span>
                  <span className="text-lg font-bold text-primary">24.353 $ZKANO</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Your Balance:</span>
                  <span className="text-secondary">1,250.00 $ZKANO</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                This fee will be refunded if your proposal passes with more than 60% approval.
              </p>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowPaymentDialog(false)} className="font-mono">
                Cancel
              </Button>
              <Button onClick={handleConfirmPayment} className="bg-primary hover:bg-primary/90 font-mono">
                Confirm & Pay
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={showVoteDialog} onOpenChange={setShowVoteDialog}>
          <DialogContent className="bg-card border-border font-mono">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold font-mono">
                Vote {voteType === "for" ? "For" : "Against"}
              </DialogTitle>
              <DialogDescription className="font-mono">{selectedProposal?.title}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="bg-muted/30 border border-border rounded-lg p-4 space-y-3">
                <div>
                  <label className="text-sm font-mono font-semibold mb-2 block">Amount of $ZKANO to Vote With</label>
                  <Input
                    type="number"
                    value={voteAmount}
                    onChange={(e) => setVoteAmount(e.target.value)}
                    placeholder="Enter amount..."
                    className="font-mono bg-input border-border"
                    min="0"
                    step="0.001"
                  />
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Your Balance:</span>
                  <span className="text-secondary">1,250.00 $ZKANO</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Your vote will be recorded anonymously. The amount of $ZKANO determines your voting power.
              </p>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowVoteDialog(false)} className="font-mono">
                Cancel
              </Button>
              <Button
                onClick={handleConfirmVote}
                className={
                  voteType === "for"
                    ? "bg-secondary hover:bg-secondary/90 font-mono"
                    : "bg-destructive hover:bg-destructive/90 font-mono"
                }
              >
                Confirm Vote
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
          <DialogContent className="bg-card border-border font-mono max-w-2xl max-h-[90vh] flex flex-col">
            <DialogHeader>
              {selectedProposal?.isOfficial && (
                <div className="flex items-center gap-2 mb-2 w-fit px-3 py-1.5 rounded-lg bg-secondary/20 border border-secondary/30">
                  <BadgeCheck className="w-4 h-4 text-secondary" />
                  <span className="text-sm font-mono font-bold text-secondary">Official ZKANO Proposal</span>
                </div>
              )}
              <DialogTitle className="text-2xl font-bold font-mono">{selectedProposal?.title}</DialogTitle>
              <span
                className={`text-xs font-mono px-2 py-1 rounded inline-block w-fit ${
                  selectedProposal?.status === "Active"
                    ? "bg-primary/20 text-primary"
                    : selectedProposal?.status === "Passed"
                      ? "bg-secondary/20 text-secondary"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                {selectedProposal?.status}
              </span>
            </DialogHeader>
            <div className="space-y-4 py-4 overflow-y-auto custom-scrollbar">
              <div>
                <h4 className="text-sm font-bold font-mono mb-2 text-muted-foreground">Description</h4>
                <div className="max-h-[200px] overflow-y-auto custom-scrollbar pr-2">
                  <p className="text-sm font-mono leading-relaxed">{selectedProposal?.description}</p>
                </div>
              </div>

              <div className="bg-muted/30 border border-border rounded-lg p-4 space-y-3">
                <h4 className="text-sm font-bold font-mono mb-2">Voting Results</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-mono">
                    <span className="text-secondary">Votes For:</span>
                    <span className="font-bold">{selectedProposal?.votesFor.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm font-mono">
                    <span className="text-destructive">Votes Against:</span>
                    <span className="font-bold">{selectedProposal?.votesAgainst.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm font-mono">
                    <span className="text-muted-foreground">Total Votes:</span>
                    <span className="font-bold">{selectedProposal?.totalVotes.toLocaleString()}</span>
                  </div>
                  <Progress
                    value={(selectedProposal?.votesFor / selectedProposal?.totalVotes) * 100}
                    className="h-2 mt-2"
                  />
                  <p className="text-xs text-muted-foreground text-center">
                    {((selectedProposal?.votesFor / selectedProposal?.totalVotes) * 100).toFixed(1)}% approval
                  </p>
                </div>
              </div>

              <div className="bg-muted/30 border border-border rounded-lg p-4 space-y-2">
                <h4 className="text-sm font-bold font-mono mb-2">Timeline</h4>
                <div className="flex justify-between text-sm font-mono">
                  <span className="text-muted-foreground">Start Date:</span>
                  <span className="font-bold">{selectedProposal?.startDate}</span>
                </div>
                <div className="flex justify-between text-sm font-mono">
                  <span className="text-muted-foreground">End Date:</span>
                  <span className="font-bold">{selectedProposal?.endDate}</span>
                </div>
                <div className="flex justify-between text-sm font-mono">
                  <span className="text-muted-foreground">Status:</span>
                  <span className="font-bold text-primary">{selectedProposal?.endsIn}</span>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => setShowDetailDialog(false)} className="bg-primary hover:bg-primary/90 font-mono">
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <TerminalCard glowColor="secondary">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-secondary" />
              <div>
                <p className="font-mono font-semibold">Your Voting Power</p>
                <p className="text-sm text-muted-foreground font-mono">Based on ZKANO holdings</p>
              </div>
            </div>
            <p className="text-3xl font-bold font-mono text-secondary">1,250</p>
          </div>
        </TerminalCard>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {proposals.map((proposal) => (
            <TerminalCard key={proposal.id}>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`text-xs font-mono px-2 py-1 rounded ${
                        proposal.status === "Active"
                          ? "bg-primary/20 text-primary"
                          : proposal.status === "Passed"
                            ? "bg-secondary/20 text-secondary"
                            : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {proposal.status}
                    </span>
                    {proposal.isOfficial && (
                      <span className="flex items-center gap-1 text-xs font-mono px-2 py-1 rounded bg-secondary/20 text-secondary">
                        <BadgeCheck className="w-3 h-3" />
                        Official
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold font-mono mb-2 line-clamp-2">{proposal.title}</h3>
                  <p className="text-muted-foreground text-xs line-clamp-3">{proposal.description}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-secondary">For: {proposal.votesFor.toLocaleString()}</span>
                    <span className="text-destructive">Against: {proposal.votesAgainst.toLocaleString()}</span>
                  </div>
                  <Progress value={(proposal.votesFor / proposal.totalVotes) * 100} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground font-mono">
                    <span>{proposal.totalVotes.toLocaleString()} votes</span>
                    <span>{proposal.endsIn}</span>
                  </div>
                </div>

                {proposal.status === "Active" && (
                  <div className="flex flex-col gap-2">
                    <Button
                      onClick={() => handleVote(proposal, "for")}
                      className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-mono text-xs"
                      size="sm"
                    >
                      <ThumbsUp className="w-3 h-3 mr-1" />
                      Vote For
                    </Button>
                    <Button
                      onClick={() => handleVote(proposal, "against")}
                      variant="outline"
                      className="w-full border-destructive text-destructive hover:bg-destructive/10 font-mono text-xs bg-transparent"
                      size="sm"
                    >
                      <ThumbsDown className="w-3 h-3 mr-1" />
                      Vote Against
                    </Button>
                    <Button
                      onClick={() => handleShowDetail(proposal)}
                      variant="outline"
                      className="w-full border-border hover:bg-muted font-mono text-xs"
                      size="sm"
                    >
                      <Info className="w-3 h-3 mr-1" />
                      Detail
                    </Button>
                  </div>
                )}
                {proposal.status !== "Active" && (
                  <Button
                    onClick={() => handleShowDetail(proposal)}
                    variant="outline"
                    className="w-full border-border hover:bg-muted font-mono text-xs"
                    size="sm"
                  >
                    <Info className="w-3 h-3 mr-1" />
                    Detail
                  </Button>
                )}
              </div>
            </TerminalCard>
          ))}
        </div>

        <Dialog open={showHistoryDialog} onOpenChange={setShowHistoryDialog}>
          <DialogContent className="bg-card border-border font-mono max-w-3xl max-h-[90vh] flex flex-col">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold font-mono flex items-center gap-2">
                <History className="w-6 h-6 text-primary" />
                Your Voting History
              </DialogTitle>
              <DialogDescription className="font-mono">
                View all your past votes and their current status
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-3 py-4 overflow-y-auto custom-scrollbar">
              {votingHistory.map((vote) => (
                <div key={vote.id} className="bg-muted/30 border border-border rounded-lg p-4 space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="font-bold font-mono text-sm mb-1">{vote.proposalTitle}</h4>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={`text-xs font-mono px-2 py-1 rounded ${
                            vote.proposalStatus === "Active"
                              ? "bg-primary/20 text-primary"
                              : vote.proposalStatus === "Passed"
                                ? "bg-secondary/20 text-secondary"
                                : "bg-destructive/20 text-destructive"
                          }`}
                        >
                          {vote.proposalStatus}
                        </span>
                        <span className="text-xs text-muted-foreground font-mono">{vote.date}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className={`text-sm font-bold font-mono mb-1 ${
                          vote.voteChoice === "For" ? "text-secondary" : "text-destructive"
                        }`}
                      >
                        {vote.voteChoice === "For" ? "✓ Voted For" : "✗ Voted Against"}
                      </div>
                      <div className="text-xs text-muted-foreground font-mono">{vote.amount} $ZKANO</div>
                    </div>
                  </div>
                </div>
              ))}
              {votingHistory.length === 0 && (
                <div className="text-center py-8 text-muted-foreground font-mono">
                  <History className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No voting history yet</p>
                  <p className="text-xs mt-1">Start voting on proposals to see your history here</p>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button onClick={() => setShowHistoryDialog(false)} className="bg-primary hover:bg-primary/90 font-mono">
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
