"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Vault,
  Bot,
  Wrench,
  ImageIcon,
  MessageCircle,
  Badge as Bridge,
  Sparkles,
  BarChart3,
  ArrowRightLeft,
  Vote,
  Code,
  HelpCircle,
  Settings,
  User,
  LogOut,
  Twitter,
  Github,
  Menu,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Vault, label: "AnoVault", href: "/vault" },
  { icon: Bot, label: "AnoBot", href: "/bot" },
  { icon: Wrench, label: "AnoTools", href: "/tools" },
  { icon: ImageIcon, label: "AnoNFT", href: "/nft" },
  { icon: MessageCircle, label: "AnoChat", href: "/chat" },
  { icon: Bridge, label: "AnoBridge", href: "/bridge" },
  { icon: Sparkles, label: "AnoAI Agent", href: "/ai-agent" },
  { icon: BarChart3, label: "Anolytic", href: "/analytics" },
  { icon: ArrowRightLeft, label: "AnoSwap", href: "/swap" },
  { icon: Vote, label: "Governance", href: "/governance" },
  { icon: Code, label: "Developers", href: "/developers" },
  { icon: Settings, label: "Settings", href: "/settings" },
  { icon: User, label: "Profile", href: "/profile" },
  { icon: LogOut, label: "Logout", href: "/logout" },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("sidebar_collapsed")
    if (stored) {
      setIsCollapsed(JSON.parse(stored))
    }

    const handleStorageChange = () => {
      const stored = localStorage.getItem("sidebar_collapsed")
      if (stored) {
        setIsCollapsed(JSON.parse(stored))
      }
    }

    window.addEventListener("storage", handleStorageChange)
    window.addEventListener("sidebar-toggle", handleStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("sidebar-toggle", handleStorageChange)
    }
  }, [])

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-screen border-r border-border bg-sidebar p-4 overflow-y-auto flex flex-col transition-all duration-300 custom-scrollbar",
        isCollapsed ? "w-20" : "w-64",
      )}
    >
      <div className="mb-8">
        <Link href="/dashboard" className="flex items-center justify-center">
          {isCollapsed ? (
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-only-zkano-kHWbcrl43Av8VV1v6qxv8Epu6ULTVN.png"
              alt="zkAnon Logo"
              className="w-12 h-12 object-contain transition-all duration-300"
            />
          ) : (
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-zkanon-%20putih-VM6Vty3O2VNgzUYvNFhyouRorXswEj.png"
              alt="zkAnon Logo"
              className="w-32 h-auto object-contain transition-all duration-300"
            />
          )}
        </Link>
      </div>

      <nav className="space-y-1 flex-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors font-mono text-sm relative",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                isCollapsed && "justify-center",
              )}
              title={isCollapsed ? item.label : undefined}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      <div className="mt-4 pt-4 border-t border-border space-y-3">
        {isCollapsed ? (
          <div className="flex justify-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="w-10 h-10 rounded-lg bg-muted/30 hover:bg-primary/20">
                  <Menu className="w-5 h-5 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="right" align="end" className="w-48 bg-card border-border">
                <DropdownMenuItem asChild>
                  <Link href="/help" className="flex items-center gap-2 cursor-pointer">
                    <HelpCircle className="w-4 h-4" />
                    <span>Help</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a
                    href="https://twitter.com/zkano"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Twitter className="w-4 h-4" />
                    <span>Twitter</span>
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a
                    href="https://discord.gg/zkano"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.077.077 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                    </svg>
                    <span>Discord</span>
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a
                    href="https://github.com/zkano"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <Link
              href="/help"
              className="w-8 h-8 rounded-lg bg-muted/30 hover:bg-primary/20 flex items-center justify-center transition-colors"
              title="Help"
            >
              <HelpCircle className="w-4 h-4 text-muted-foreground hover:text-primary" />
            </Link>
            <a
              href="https://twitter.com/zkano"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg bg-muted/30 hover:bg-primary/20 flex items-center justify-center transition-colors"
              title="Twitter"
            >
              <Twitter className="w-4 h-4 text-muted-foreground hover:text-primary" />
            </a>
            <a
              href="https://discord.gg/zkano"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg bg-muted/30 hover:bg-primary/20 flex items-center justify-center transition-colors"
              title="Discord"
            >
              <svg
                className="w-4 h-4 text-muted-foreground hover:text-primary"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.077.077 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
            </a>
            <a
              href="https://github.com/zkano"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg bg-muted/30 hover:bg-primary/20 flex items-center justify-center transition-colors"
              title="GitHub"
            >
              <Github className="w-4 h-4 text-muted-foreground hover:text-primary" />
            </a>
          </div>
        )}
      </div>
    </aside>
  )
}
