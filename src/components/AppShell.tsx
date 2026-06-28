"use client"

import { useState } from "react"
import Header from "@/components/Header"
import MobileDock from "@/components/MobileDock"
import SearchModal from "@/components/SearchModal"

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <>
      <Header onSearchOpen={() => setSearchOpen(true)} />
      <main>{children}</main>
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
      <MobileDock onSearchOpen={() => setSearchOpen(true)} />
    </>
  )
}
