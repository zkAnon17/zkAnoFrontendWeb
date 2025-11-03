"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { TerminalCard } from "@/components/terminal-card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { SettingsIcon, Shield, Globe, Zap } from "lucide-react"

export default function SettingsPage() {
  const [theme, setTheme] = useState("terminal")
  const [language, setLanguage] = useState("en")
  const [privacyLevel, setPrivacyLevel] = useState("strict")
  const [notifications, setNotifications] = useState(true)
  const [autoEncrypt, setAutoEncrypt] = useState(true)

  return (
    <div>
      <DashboardHeader title="Settings" />

      <div className="p-6 space-y-6">
        <div>
          <h2 className="text-2xl font-bold font-mono mb-2">App Settings</h2>
          <p className="text-muted-foreground font-mono text-sm">Customize your ZK-Ano experience</p>
        </div>

        {/* Appearance */}
        <TerminalCard>
          <h3 className="text-lg font-bold font-mono mb-4 flex items-center gap-2">
            <SettingsIcon className="w-5 h-5 text-primary" />
            Appearance
          </h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="font-mono">Theme</Label>
              <Select value={theme} onValueChange={setTheme}>
                <SelectTrigger className="font-mono bg-input border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="terminal">Terminal (Dark)</SelectItem>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="auto">Auto</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </TerminalCard>

        {/* Language */}
        <TerminalCard>
          <h3 className="text-lg font-bold font-mono mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5 text-primary" />
            Language & Region
          </h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="font-mono">Language</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="font-mono bg-input border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="de">Deutsch</SelectItem>
                  <SelectItem value="ja">日本語</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </TerminalCard>

        {/* Privacy */}
        <TerminalCard>
          <h3 className="text-lg font-bold font-mono mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-secondary" />
            Privacy Settings
          </h3>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label className="font-mono">Privacy Level</Label>
              <Select value={privacyLevel} onValueChange={setPrivacyLevel}>
                <SelectTrigger className="font-mono bg-input border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="strict">Strict (Maximum Privacy)</SelectItem>
                  <SelectItem value="balanced">Balanced</SelectItem>
                  <SelectItem value="performance">Performance (Faster)</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground font-mono">
                {privacyLevel === "strict" && "All transactions use maximum ZK-proof complexity"}
                {privacyLevel === "balanced" && "Balanced privacy and speed"}
                {privacyLevel === "performance" && "Optimized for speed with good privacy"}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="font-mono">Auto-Encrypt New Assets</Label>
                <p className="text-sm text-muted-foreground font-mono">Automatically encrypt files added to vault</p>
              </div>
              <Switch checked={autoEncrypt} onCheckedChange={setAutoEncrypt} />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="font-mono">Enable Notifications</Label>
                <p className="text-sm text-muted-foreground font-mono">Receive alerts for transactions and updates</p>
              </div>
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </div>
          </div>
        </TerminalCard>

        {/* Performance */}
        <TerminalCard>
          <h3 className="text-lg font-bold font-mono mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            Performance
          </h3>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-muted/30 border border-border">
              <div className="flex justify-between items-center mb-2">
                <span className="font-mono text-sm">ZK-Proof Generation</span>
                <span className="text-secondary font-mono text-sm">0.3s avg</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-mono text-sm">Network Latency</span>
                <span className="text-secondary font-mono text-sm">45ms</span>
              </div>
            </div>
          </div>
        </TerminalCard>
      </div>
    </div>
  )
}
