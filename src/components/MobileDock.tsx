"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Home, Search, Heart } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

interface DockItem {
  icon: React.ComponentType<{ className?: string }>
  label: string
  href?: string
  onClick?: () => void
}

interface MobileDockProps {
  onSearchOpen?: () => void
}

export default function MobileDock({ onSearchOpen }: MobileDockProps) {
  const pathname = usePathname()
  const [hovered, setHovered] = React.useState<number | null>(null)

  const items: DockItem[] = [
    { icon: Home,   label: "ホーム",       href: "/" },
    { icon: Search, label: "検索",         onClick: onSearchOpen },
    { icon: Heart,  label: "お気に入り",   href: "/favorites" },
  ]

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 md:hidden">
      <TooltipProvider delayDuration={100}>
        <div className="relative flex items-center gap-5 px-6 py-3 rounded-3xl bg-white/70 backdrop-blur-xl shadow-lg border border-black/10">
          {items.map((item, i) => {
            const isActive = item.href ? pathname === item.href : false

            return (
              <Tooltip key={item.label}>
                <TooltipTrigger asChild>
                  <div
                    className="relative flex flex-col items-center"
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    {/* Morphic glass bubble */}
                    <AnimatePresence>
                      {hovered === i && (
                        <motion.div
                          initial={{ scale: 0.6, opacity: 0 }}
                          animate={{ scale: 1.4, opacity: 1 }}
                          exit={{ scale: 0.6, opacity: 0 }}
                          transition={{ type: "spring", stiffness: 200, damping: 20 }}
                          className="absolute inset-0 rounded-full -z-10 bg-primary/15 backdrop-blur-2xl"
                        />
                      )}
                    </AnimatePresence>

                    {item.href ? (
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center justify-center w-10 h-10 rounded-full transition-transform hover:scale-110",
                          isActive ? "text-primary" : "text-muted-foreground"
                        )}
                      >
                        <item.icon className={cn("w-5 h-5", isActive && "fill-primary/20")} />
                      </Link>
                    ) : (
                      <button
                        onClick={item.onClick}
                        className="flex items-center justify-center w-10 h-10 rounded-full text-muted-foreground transition-transform hover:scale-110 hover:text-primary"
                      >
                        <item.icon className="w-5 h-5" />
                      </button>
                    )}

                    {/* Active dot */}
                    {isActive && (
                      <motion.div
                        layoutId="mobile-dock-dot"
                        className="w-1 h-1 rounded-full bg-primary mt-0.5"
                      />
                    )}
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top" className="text-xs">
                  {item.label}
                </TooltipContent>
              </Tooltip>
            )
          })}
        </div>
      </TooltipProvider>
    </div>
  )
}
