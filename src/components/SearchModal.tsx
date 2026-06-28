"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Search, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { recipes } from "@/data/recipes"

interface SearchModalProps {
  open: boolean
  onClose: () => void
}

export default function SearchModal({ open, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100)
      setQuery("")
    }
  }, [open])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [onClose])

  const results = query.trim().length < 1
    ? []
    : recipes
        .filter((r) => {
          const q = query.toLowerCase()
          return (
            r.title.toLowerCase().includes(q) ||
            r.originalTitle?.toLowerCase().includes(q) ||
            r.cuisineSlug?.toLowerCase().includes(q) ||
            r.description?.toLowerCase().includes(q)
          )
        })
        .slice(0, 8)

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />

          {/* Modal — top寄せ固定でキーボード表示時も画面内に収まる */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.97 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed top-4 left-4 right-4 sm:top-[10vh] sm:left-1/2 sm:-translate-x-1/2 sm:w-full sm:max-w-lg z-[101]"
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-warm-border flex flex-col" style={{ maxHeight: 'calc(100dvh - 2rem)' }}>
              {/* Input */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-warm-border flex-shrink-0">
                <Search className="w-4 h-4 text-muted flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="レシピ名・料理名で検索..."
                  className="flex-1 text-sm outline-none text-primary placeholder:text-muted bg-transparent"
                />
                <button onClick={onClose} className="text-muted hover:text-primary transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Results */}
              {results.length > 0 && (
                <ul className="overflow-y-auto divide-y divide-warm-border">
                  {results.map((r) => (
                    <li key={r.id}>
                      <button
                        onClick={() => { router.push(`/recipes/${r.slug}`); onClose() }}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-cream transition-colors text-left"
                      >
                        {r.image && (
                          <div
                            className="w-10 h-10 rounded-lg bg-cover bg-center flex-shrink-0"
                            style={{ backgroundImage: `url('${r.image}')` }}
                          />
                        )}
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-primary truncate">{r.title}</p>
                          <p className="text-xs text-muted truncate">{r.originalTitle}</p>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              {query.trim().length > 0 && results.length === 0 && (
                <p className="px-4 py-6 text-sm text-muted text-center">
                  「{query}」に一致するレシピが見つかりませんでした
                </p>
              )}

              {query.trim().length === 0 && (
                <p className="px-4 py-5 text-xs text-muted text-center tracking-wide">
                  レシピ名や料理名を入力してください
                </p>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
